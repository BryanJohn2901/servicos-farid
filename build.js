#!/usr/bin/env node
/**
 * Production build for the static Dr. Farid Bark Hamdar site.
 * Vanilla HTML/CSS/JS project (no bundler) -> generates an optimized dist/ folder:
 *   dist/index.html + dist/<page>.html  (minified, SEO-enriched)
 *   dist/css/                            (Tailwind, compiled + purged + minified)
 *   dist/js/                             (first-party scripts, minified)
 *   dist/assets/                         (referenced images, re-encoded WebP)
 *
 * Golden rule: third-party scripts (GTM, gtag, Meta Pixel) are copied byte-for-byte,
 * never reformatted or moved.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');
const { minify: minifyHtml } = require('html-minifier-terser');
const { minify: minifyJs } = require('terser');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://servicos-farid.vercel.app';

const PAGES = [
  {
    file: 'index.html',
    css: 'css/index.css',
    urlPath: '/',
    ogType: 'website'
  },
  {
    file: 'abdominoplastia-hd-raft.html',
    css: 'css/service.css',
    urlPath: '/abdominoplastia-hd-raft.html',
    ogType: 'website'
  },
  {
    file: 'cirurgia-mamaria.html',
    css: 'css/service.css',
    urlPath: '/cirurgia-mamaria.html',
    ogType: 'website'
  },
  {
    file: 'lipo-hd.html',
    css: 'css/service.css',
    urlPath: '/lipo-hd.html',
    ogType: 'website'
  },
  {
    file: 'mommy-makeover.html',
    css: 'css/service.css',
    urlPath: '/mommy-makeover.html',
    ogType: 'website'
  }
];

// Only images actually referenced by the pages above ship to dist/assets.
const IMAGE_MANIFEST = [
  { name: 'drHero.webp', quality: 82 },
  { name: 'farid-abdominoplastia.webp', quality: 88 },
  { name: 'farid-cirurgia-mamaria.webp', quality: 88 },
  { name: 'farid-contorno-corporal.webp', quality: 88 },
  { name: 'farid-mommy.webp', quality: 88 },
  { name: 'logo-farid-branca.webp', lossless: true }
];

const OG_IMAGE = 'assets/drHero.webp';

const PRECONNECTS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdnjs.cloudflare.com',
  'https://unpkg.com',
  'https://www.googletagmanager.com'
];

function log(msg) {
  console.log(`[build] ${msg}`);
}

function cleanDist() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(path.join(DIST, 'css'), { recursive: true });
  fs.mkdirSync(path.join(DIST, 'js'), { recursive: true });
  fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });
  log('dist/ limpo e recriado (css/, js/, assets/)');
}

function buildTailwind() {
  execSync(
    `npx tailwindcss -c tailwind.config.service.js -i src/service.css -o dist/css/service.css --minify`,
    { cwd: ROOT, stdio: 'inherit' }
  );
  execSync(
    `npx tailwindcss -c tailwind.config.index.js -i src/index.css -o dist/css/index.css --minify`,
    { cwd: ROOT, stdio: 'inherit' }
  );
  log('CSS Tailwind compilado, purgado e minificado -> dist/css/');
}

async function buildImages() {
  for (const img of IMAGE_MANIFEST) {
    const src = path.join(ROOT, 'img', img.name);
    const out = path.join(DIST, 'assets', img.name);
    let pipeline = sharp(src);
    pipeline = img.lossless
      ? pipeline.webp({ lossless: true })
      : pipeline.webp({ quality: img.quality, effort: 6 });
    await pipeline.toFile(out);
    const before = fs.statSync(src).size;
    const after = fs.statSync(out).size;
    log(
      `assets/${img.name}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(
        0
      )}KB`
    );
  }
}

async function buildJs() {
  // First-party init call, identical across all pages (verified before writing this
  // script). The AOS *library* itself stays on its CDN <script> tag untouched.
  const src = `AOS.init({duration:650,once:true,offset:50,easing:'ease-out-cubic',disable:'mobile'});`;
  const result = await minifyJs(src, { mangle: true, compress: true });
  fs.writeFileSync(path.join(DIST, 'js', 'main.js'), result.code);
  log('js/main.js gerado (AOS.init minificado/ofuscado)');
}

function extractTag(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : '';
}

function transformHtml(rawHtml, page) {
  let html = rawHtml;

  const title = extractTag(html, /<title>([\s\S]*?)<\/title>/);
  const description = extractTag(
    html,
    /<meta name="description" content="([^"]*)"/
  );

  // 1. Remove the Tailwind Play CDN script, its inline config and the
  //    <style type="text/tailwindcss"> block - replaced by the compiled,
  //    purged stylesheet built by Tailwind CLI.
  html = html.replace(/\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\n?/, '\n');
  html = html.replace(/\s*<script>tailwind\.config=\{[\s\S]*?\}<\/script>\n?/, '\n');
  html = html.replace(/\s*<style type="text\/tailwindcss">[\s\S]*?<\/style>\n?/, '\n');

  // 2. Swap the inline AOS.init() call for the external, minified js/main.js.
  html = html.replace(
    /<script>AOS\.init\(\{[\s\S]*?\}\);<\/script>/,
    '<script src="js/main.js"></script>'
  );

  // 3. Rewrite asset paths: img/ -> assets/
  html = html.replace(/(src|href)="img\//g, '$1="assets/');

  // 4. Preconnect hints for third-party origins, right after <meta viewport>.
  const preconnectTags = PRECONNECTS.map(
    (origin) =>
      `  <link rel="preconnect" href="${origin}"${
        origin.includes('gstatic') ? ' crossorigin' : ''
      }>`
  ).join('\n');
  html = html.replace(
    /(<meta name="viewport"[^>]*>\n)/,
    `$1${preconnectTags}\n`
  );

  // 5. Canonical + Open Graph + Twitter Card tags, plus the compiled stylesheet.
  const canonicalUrl = `${SITE_URL}${page.urlPath}`;
  const ogImageUrl = `${SITE_URL}/${OG_IMAGE}`;
  const seoBlock = `  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="${page.ogType}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImageUrl}">
  <link rel="stylesheet" href="${page.css}">
</head>`;
  html = html.replace(/<\/head>/, seoBlock);

  return { html, title, description };
}

async function minifyPage(html) {
  return minifyHtml(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true,
    minifyCSS: false,
    // Never touches inline third-party analytics: none remain inline besides
    // GTM/gtag/fbq, and minifyJS stays off so those snippets ship byte-identical.
    minifyJS: false,
    useShortDoctype: true,
    keepClosingSlash: true
  });
}

function checkAltAndHeadings(html, file) {
  const imgsWithoutAlt = html.match(/<img(?![^>]*\balt=)[^>]*>/g);
  if (imgsWithoutAlt) {
    console.warn(`[build] ⚠ ${file}: <img> sem alt: ${imgsWithoutAlt.length}`);
  }
  const h1Count = (html.match(/<h1[ >]/g) || []).length;
  if (h1Count !== 1) {
    console.warn(`[build] ⚠ ${file}: encontrado ${h1Count} <h1> (esperado 1)`);
  }
}

async function buildPages() {
  for (const page of PAGES) {
    const rawHtml = fs.readFileSync(path.join(ROOT, page.file), 'utf8');
    checkAltAndHeadings(rawHtml, page.file);
    const { html } = transformHtml(rawHtml, page);
    const finalHtml = await minifyPage(html);
    fs.writeFileSync(path.join(DIST, page.file), finalHtml);
    const before = Buffer.byteLength(rawHtml, 'utf8');
    const after = Buffer.byteLength(finalHtml, 'utf8');
    log(
      `${page.file}: ${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(
        1
      )}KB`
    );
  }
}

(async () => {
  console.log('== Build de produção: servicos-farid ==\n');
  cleanDist();
  buildTailwind();
  await buildImages();
  await buildJs();
  await buildPages();
  console.log('\n== dist/ pronta para deploy ==');
})().catch((err) => {
  console.error('[build] Falhou:', err);
  process.exit(1);
});
