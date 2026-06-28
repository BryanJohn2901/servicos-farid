const fs = require('fs');

const WA = '5541992710059';
const wa = (text) => `https://wa.me/${WA}${text ? '?text=' + encodeURIComponent(text) : ''}`;

const videos = [
  'https://www.youtube.com/embed/Od2evMyp8gY',
  'https://www.youtube.com/embed/CTCvCj0UL1Q',
  'https://www.youtube.com/embed/A8tlAzVlFf8',
];

const styles = `
        html{scroll-behavior:smooth;overflow-x:clip}
        body{font-family:'Lato',sans-serif;overflow-x:clip;color:#333}
        h1,h2,h3,h4{font-family:'Playfair Display',serif}
        .section-label{@apply text-brand-gold text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3 block}
        .section-title{@apply text-3xl md:text-4xl lg:text-[2.75rem] font-serif leading-tight}
        .section-divider{@apply w-16 h-1 bg-brand-gold mx-auto mt-5 rounded-full}
        .card-light{@apply bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1}
        .card-dark{@apply bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/40 hover:bg-white/[0.08]}
        .card-stat{@apply bg-white rounded-2xl p-6 text-center shadow-md border border-brand-gold/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-gold/30}
        .link-footer{@apply text-brand-textLight/60 hover:text-brand-gold transition-colors duration-300}
        details summary::-webkit-details-marker{display:none}
        details[open] summary~*{animation:sweep .4s ease-out}
        @keyframes sweep{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .whatsapp-float{bottom:max(1rem,env(safe-area-inset-bottom,1rem));right:max(1rem,env(safe-area-inset-right,1rem))}
        .btn-cta{@apply inline-flex items-center justify-center gap-3 rounded-lg font-bold uppercase tracking-wider shadow-lg transition-all duration-300}
        .btn-gold{@apply bg-brand-gold text-brand-dark hover:bg-[#d4b87a] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0}
        .btn-dark{@apply bg-brand-dark text-white hover:bg-[#2a3f56] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0}
        .btn-whatsapp{@apply bg-[#25D366] text-white hover:bg-[#1faa59] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0}
        .btn-outline{@apply bg-white border-2 border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark}
        .nav-wa{@apply bg-brand-gold text-brand-dark font-bold py-2.5 px-5 md:px-6 rounded-lg shadow-lg uppercase tracking-widest text-[10px] sm:text-xs flex items-center gap-2 transition-all duration-300 hover:bg-[#d4b87a] hover:shadow-xl hover:-translate-y-0.5}
        .faq-toggle{@apply w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-brand-gold/20}
        .video-card{@apply aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border-2 border-brand-gold/20 bg-black transition-all duration-300 hover:border-brand-gold/50 hover:shadow-2xl hover:-translate-y-1}
        .hero-doctor-img{height:min(90vh,900px);display:block;margin:0;padding:0;vertical-align:bottom;line-height:0}
        @media (min-width:1024px){.hero-section{min-height:calc(min(90vh,900px) + clamp(6rem,10vh,9rem))}}
`;

const aos = (effect = 'fade-up', delay = 0) =>
  `data-aos="${effect}"${delay ? ` data-aos-delay="${delay}"` : ''}`;

const ctaBtn = (text, href, options = 'gold') => {
  let variant = 'gold';
  let size = 'lg';
  if (options === 'dark' || options === 'whatsapp' || options === 'outline') variant = options;
  else if (options === 'sm-gold') { variant = 'gold'; size = 'sm'; }
  else if (options === 'sm-dark') { variant = 'dark'; size = 'sm'; }
  else if (options === 'sm-whatsapp') { variant = 'whatsapp'; size = 'sm'; }
  const sizeClass = size === 'lg' ? 'px-8 py-4 md:py-5 text-sm md:text-base w-full sm:w-auto' : 'px-6 py-3 text-sm w-full';
  const variantClass = { gold: 'btn-gold', dark: 'btn-dark', whatsapp: 'btn-whatsapp', outline: 'btn-outline' }[variant];
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="btn-cta ${variantClass} ${sizeClass}">${text}<i class="fa-solid fa-arrow-right"></i></a>`;
};

const sectionHead = (label, title, light = false, delay = 0) => `
<div class="text-center mb-12 md:mb-16 max-w-2xl mx-auto" ${aos('fade-up', delay)}>
  <span class="section-label">${label}</span>
  <h2 class="section-title ${light ? 'text-white' : 'text-brand-dark'}">${title}</h2>
  <div class="section-divider"></div>
</div>`;

const headAssets = (title, meta) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${meta}">
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16704419407"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-16704419407');</script>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NCJCZXRH');</script>
  <script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1152558886659907');fbq('track','PageView');</script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
  <script>tailwind.config={theme:{extend:{colors:{brand:{dark:'#1e293b',accent:'#2c3e50',gold:'#C0A063',light:'#f8f5f0',textDark:'#333333',textLight:'#e5e7eb'}},fontFamily:{serif:['"Playfair Display"','serif'],sans:['Lato','sans-serif']}}}}</script>
  <style type="text/tailwindcss">${styles}</style>
</head>`;

const footScripts = `<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>AOS.init({duration:650,once:true,offset:50,easing:'ease-out-cubic',disable:'mobile'});</script>`;

// Icon fields use Font Awesome classes (fa-solid fa-* or fa-brands fa-*)
const services = {
  'lipo-hd.html': {
    title: 'Lipo HD em Curitiba | Dr. Farid Bark Hamdar',
    meta: 'Lipo HD de alta definição em Curitiba com tecnologia VASER e Renuvion. Cirurgião membro titular da SBCP.',
    badge: 'Contorno Corporal de Alta Definição',
    heroImg: 'img/farid-contorno-corporal.png',
    headline: 'Lipo HD em Curitiba',
    headlineAccent: 'Gordura localizada esculpida com precisão — sem aquele ar de cirurgia.',
    subheadline: 'Planejamento cirúrgico com VASER e Renuvion para esculpir o seu contorno respeitando a sua anatomia. Com o Dr. Farid Bark Hamdar, cirurgião plástico com mais de 15 anos de experiência.',
    microcopy: 'Avaliação individualizada · Membro Titular SBCP · Curitiba',
    waText: 'Olá, gostaria de agendar uma avaliação de Lipo HD',
    propostaLead: 'Você faz tudo certo. Treina, controla a alimentação, tem disciplina. Mas existe aquela gordura localizada que simplesmente não vai embora.',
    propostaCards: [
      { icon: 'fa-scissors', title: 'Não é só tirar gordura', text: 'A Lipo HD esculpe o contorno que já existe debaixo dela. Com DM Experience, VASER e Renuvion, definição muscular e retração de pele no mesmo procedimento.' },
      { icon: 'fa-fingerprint', title: 'O diferencial é o planejamento', text: 'O que separa um resultado de outro não é a máquina — é o planejamento. O foco do Dr. Farid: naturalidade, nunca um corpo que pareça operado.' },
    ],
    dores: ['A balança não mexe naquela região, não importa o quanto você se esforce.', 'Você evita certas roupas porque sabe onde elas vão "marcar".', 'Medo do resultado artificial — abdômen "desenhado demais".', 'Histórias de recuperação difícil que te travam.', 'Receio de confiar a sua segurança a quem você não conhece.'],
    dorFechamento: 'Nenhum desses medos é bobagem. Um bom planejamento existe exatamente para isso.',
    solucaoTitle: 'Tecnologia <span class="text-brand-gold italic">DM Experience</span>',
    solucaoIntro: 'A Lipo HD do Dr. Farid integra as tecnologias mais avançadas em um único protocolo:',
    solucaoItems: [
      { icon: 'fa-wand-magic-sparkles', title: 'VASER', desc: 'Emulsiona a gordura com ultrassom antes da remoção — mais precisão na definição e menos trauma nos tecidos.' },
      { icon: 'fa-sun', title: 'Renuvion', desc: 'Auxilia na retração da pele, diferenciando um resultado natural de um resultado "vazio".' },
    ],
    solucaoFechamento: 'A tecnologia é o meio, não o fim. Cada caso começa com planejamento individualizado da sua anatomia e do resultado possível.',
    beneficios: ['Volte a vestir o que quiser sem o incômodo daquela região resistente.', 'Resultado natural — realçar o seu corpo, não criar outro.', 'Retração de pele no mesmo procedimento, contorno mais firme.', 'Menos trauma com VASER, favorecendo a recuperação.', 'Cirurgião membro titular da SBCP, planejamento criterioso.', 'Acompanhamento real — você não é só mais um na agenda.'],
    ofertaIntro: 'Não vendemos cirurgia pela internet. O primeiro passo é uma avaliação onde o Dr. Farid analisa o seu caso e desenha um plano sob medida.',
    avaliacao: ['Análise da sua anatomia e objetivos', 'Explicação clara de procedimento, riscos e recuperação', 'Planejamento honesto: o que é possível e o que não é', 'Todas as dúvidas respondidas, sem pressa'],
    objecoes: [
      { q: 'Tenho medo de ficar artificial.', a: 'Esse é o ponto de partida do trabalho do Dr. Farid: "a ciência da naturalidade". O objetivo é realçar o seu corpo, nunca denunciar cirurgia.' },
      { q: 'E a recuperação?', a: 'O VASER tende a reduzir o trauma nos tecidos. Na avaliação, você recebe orientações claras de pós-operatório.' },
      { q: 'É caro.', a: 'O valor varia conforme o caso. Cirurgião barato pode sair muito caro — aqui o investimento é em segurança e planejamento.' },
      { q: 'Já tive experiência ruim.', a: 'Faz sentido estar cautelosa. A avaliação é o momento de entender se há confiança — sem compromisso.' },
    ],
    garantia: 'Não existe "garantia de resultado" em cirurgia. O Dr. Farid garante honestidade: na avaliação, você ouve o que é possível e o que não é. Sua segurança vem antes de qualquer venda.',
    urgencia: 'Agenda limitada para atendimento individualizado. Quanto antes você agenda, antes começa o planejamento.',
    faq: [
      { q: 'A Lipo HD serve pra mim?', a: 'Só a avaliação responde com precisão. Em geral, é para gordura localizada resistente a dieta e exercício, com boa qualidade de pele.' },
      { q: 'Vou ficar com cicatrizes grandes?', a: 'As incisões são pequenas e posicionadas estrategicamente. Detalhes na avaliação.' },
      { q: 'Quanto tempo de recuperação?', a: 'Varia conforme a extensão. Você recebe um plano claro na consulta.' },
      { q: 'A lipo trata flacidez?', a: 'O Renuvion ajuda na retração, mas o grau de flacidez é avaliado caso a caso.' },
      { q: 'Onde é realizada?', a: 'Em Curitiba, em estrutura adequada e segura.' },
      { q: 'Quem vai me operar?', a: 'O próprio Dr. Farid Bark Hamdar, membro titular da SBCP.' },
    ],
    ctaFinal: 'Você já se esforçou o suficiente sozinha. Agora pode contar com planejamento de precisão e quem leva a sua segurança a sério.',
    ps: 'A Lipo HD não é sobre virar outra pessoa — é sobre realçar a melhor versão de você. O primeiro passo é só uma conversa.',
  },
  'cirurgia-mamaria.html': {
    title: 'Cirurgia Mamária em Curitiba | Dr. Farid Bark Hamdar',
    meta: 'Prótese, mastopexia e explante em Curitiba. Resultado natural. Membro titular SBCP.',
    badge: 'Cirurgia Mamária de Vanguarda',
    heroImg: 'img/farid-cirurgia-mamaria.png',
    headline: 'Cirurgia Mamária em Curitiba',
    headlineAccent: 'Mamas naturais e harmônicas, no tamanho que combina com você.',
    subheadline: 'Aumento com prótese, mastopexia ou explante. Cada caso merece planejamento individual para um resultado harmônico e seguro.',
    microcopy: 'Prótese · Mastopexia · Explante · Membro Titular SBCP',
    waText: 'Olá, gostaria de agendar uma avaliação de Cirurgia Mamária',
    propostaLead: 'A mama está ligada à forma como a mulher se enxerga. Poucas decisões são tão pessoais quanto mexer nela.',
    propostaCards: [
      { icon: 'fa-heart', title: 'O resultado precisa ser o seu', text: 'Mais volume, levantamento ou retirada de próteses — o caminho muda, mas o objetivo é harmonia com o seu corpo, não um padrão de prateleira.' },
      { icon: 'fa-scale-balanced', title: 'Proporção, não exagero', text: 'O Dr. Farid trabalha com foco em harmonia e proporção — a mama que conversa com o seu corpo e a sua fase de vida.' },
    ],
    dores: ['Não se sente confortável com o volume ou formato atual.', 'A gravidez ou amamentação mudaram tudo.', 'Próteses antigas e dúvida sobre trocar ou retirar com segurança.', 'Medo do resultado exagerado ou artificial.', 'Pesquisou tanto que ficou mais confusa do que segura.'],
    dorFechamento: 'Você não precisa decidir sozinha. Precisa de um plano feito pra você.',
    solucaoTitle: 'Um caminho para <span class="text-brand-gold italic">cada caso</span>',
    solucaoIntro: 'Cirurgia mamária não é uma coisa só. O trabalho começa entendendo qual é o seu caso:',
    solucaoItems: [
      { icon: 'fa-circle-plus', title: 'Aumento com prótese', desc: 'Tamanho, formato e posicionamento pensados para a sua anatomia — não para um catálogo.' },
      { icon: 'fa-arrow-up', title: 'Mastopexia', desc: 'Reposiciona e firma, com ou sem prótese, devolvendo o contorno.' },
      { icon: 'fa-arrows-rotate', title: 'Explante', desc: 'Remoção ou troca de próteses com planejamento seguro e bem conduzido.' },
    ],
    solucaoFechamento: 'Em todos os casos: harmonia, naturalidade e segurança. A técnica a serviço da sua confiança.',
    beneficios: ['Volte a se reconhecer no espelho e se vestir sem pensar duas vezes.', 'Resultado proporcional ao seu corpo, não um padrão importado.', 'Decisão informada, sem pressão.', 'Cirurgião membro titular da SBCP.', 'Acompanhamento humanizado do começo ao fim.', 'Caminho seguro mesmo no explante.'],
    ofertaIntro: 'Na avaliação, o Dr. Farid entende o que você deseja, examina o caso e explica os caminhos possíveis — para você decidir com segurança.',
    avaliacao: ['Entendimento do que você quer (e do que não quer)', 'Análise da anatomia e indicação adequada', 'Explicação de prótese vs. mastopexia vs. explante', 'Riscos, recuperação e expectativas esclarecidos'],
    objecoes: [
      { q: 'Medo de ficar exagerada.', a: 'O objetivo é harmonia com o seu corpo — não um volume que chama atenção pela cirurgia.' },
      { q: 'Não sei se preciso de prótese ou levantamento.', a: 'Tudo bem não saber. Essa é a função da avaliação — você sai entendendo o seu caso.' },
      { q: 'Prótese é segura?', a: 'Depende de indicação, material e técnica. Tudo é discutido abertamente na consulta.' },
      { q: 'Quero tirar próteses antigas.', a: 'O explante é atendido com caminho seguro e planejado.' },
    ],
    garantia: 'Prometemos clareza, não resultado milagroso. Se a melhor recomendação for esperar ou não operar, o Dr. Farid vai dizer. Ética antes de tudo.',
    urgencia: 'Agenda limitada por escolha — atendimento individual, sem volume.',
    faq: [
      { q: 'Como escolher o tamanho da prótese?', a: 'Na avaliação, considerando anatomia, estilo de vida e desejo.' },
      { q: 'Mastopexia deixa cicatriz?', a: 'Sim, posicionadas para serem discretas. Detalhes no seu caso.' },
      { q: 'Posso amamentar depois?', a: 'Depende da técnica. Converse abertamente na consulta.' },
      { q: 'Quanto tempo de recuperação?', a: 'Varia conforme o procedimento. Plano claro de pós-operatório.' },
      { q: 'Explante e prótese nova no mesmo ato?', a: 'Em muitos casos sim — avaliado individualmente.' },
      { q: 'Quem vai me operar?', a: 'O próprio Dr. Farid Bark Hamdar, membro titular da SBCP.' },
    ],
    ctaFinal: 'A sua relação com o corpo merece uma decisão bem cuidada — e um cirurgião que ouve antes de operar.',
    ps: 'Seja prótese, levantamento ou retirada, o melhor resultado começa pela conversa certa.',
  },
  'mommy-makeover.html': {
    title: 'Mommy Makeover em Curitiba | Dr. Farid Bark Hamdar',
    meta: 'Mommy Makeover em Curitiba: reconstrução da silhueta pós-gestação com planejamento individual.',
    badge: 'Mommy Makeover',
    heroImg: 'img/farid-mommy.png',
    headline: 'Mommy Makeover em Curitiba',
    headlineAccent: 'O corpo mudou na maternidade. Recuperá-lo também é um ato de cuidado com você.',
    subheadline: 'Reconstrução da silhueta após a maternidade — abdômen, mamas e contorno em um planejamento que respeita o seu corpo e a sua história.',
    microcopy: 'Plano pós-gestação · Membro Titular SBCP · Sem julgamento',
    waText: 'Olá, gostaria de agendar uma avaliação de Mommy Makeover',
    propostaLead: 'Ninguém te avisou que o corpo não voltaria sozinho. A pele que não retraiu, a barriga que não fecha, as mamas que mudaram de lugar.',
    propostaCards: [
      { icon: 'fa-heart', title: 'Não é vaidade — é legítimo', text: 'É o desejo de voltar a se sentir você depois de ter dado o corpo para gerar uma vida. Sem culpa, sem julgamento.' },
      { icon: 'fa-puzzle-piece', title: 'Um plano, não um pacote', text: 'Pode unir correção do abdômen (incluindo diástase), reposicionamento das mamas e contorno corporal — tudo pensado para você.' },
    ],
    dores: ['A barriga não fecha mais — diástase que exercício sozinho não resolve.', 'Pele do abdômen flácida que não retraiu.', 'Mamas que mudaram de volume e posição.', 'Evita fotos, roupas e o espelho.', 'Culpa por querer cuidar de si mesma.'],
    dorFechamento: 'Querer se reconhecer de novo não tira nada de ninguém. É cuidar de quem cuida de todo mundo.',
    solucaoTitle: 'Planejamento <span class="text-brand-gold italic">integrado</span>',
    solucaoIntro: 'Procedimentos combinados de forma inteligente — uma recuperação em vez de várias:',
    solucaoItems: [
      { icon: 'fa-grip-lines', title: 'Correção do abdômen', desc: 'Sutura da diástase e remoção de pele flácida.' },
      { icon: 'fa-shapes', title: 'Cirurgia mamária', desc: 'Prótese, levantamento ou ambos para volume e posição.' },
      { icon: 'fa-user', title: 'Contorno corporal', desc: 'Lipoaspiração de áreas que mudaram com a gestação.' },
    ],
    solucaoFechamento: 'Tudo com a naturalidade que é marca do trabalho do Dr. Farid — respeitando anatomia e história.',
    beneficios: ['Volte a se reconhecer — muda como você se veste e se sente.', 'Um plano, uma recuperação: combinação inteligente.', 'Correção da diástase: postura e sustentação, não só estética.', 'Resultado natural, sem padrão de catálogo.', 'Atendimento que entende a sua fase de vida.', 'Segurança: membro titular SBCP.'],
    ofertaIntro: 'Avaliação individualizada: o Dr. Farid entende a sua história e desenha o plano certo — sem pacote pronto.',
    avaliacao: ['Escuta da sua história e objetivos', 'Avaliação de abdômen, mamas e contorno', 'Definição do que combinar (ou não)', 'Recuperação e cuidados explicados com clareza'],
    objecoes: [
      { q: 'Culpa de gastar comigo.', a: 'Cuidar de você permite cuidar melhor de todo mundo. É uma decisão legítima.' },
      { q: 'Medo de ficar artificial.', a: 'O objetivo é resgatar a sua harmonia de forma natural — não um corpo "novo".' },
      { q: 'Preciso fazer tudo de uma vez?', a: 'Não. O plano é individual — combine o que faz sentido ou faça em etapas.' },
      { q: 'Recuperação com filhos pequenos.', a: 'Ponto real e importante. Na avaliação, planejam o momento e a rede de apoio.' },
    ],
    garantia: 'Prometemos honestidade, não "corpo dos sonhos". Se a recomendação for esperar, o Dr. Farid vai dizer.',
    urgencia: 'Agenda limitada. Quanto antes conversar, antes começa o planejamento do momento ideal.',
    faq: [
      { q: 'Quanto tempo depois do parto?', a: 'Após estabilização do peso e fim da amamentação. Avaliado individualmente.' },
      { q: 'Preciso ter parado de ter filhos?', a: 'Recomenda-se, para preservar o resultado — conversado no seu caso.' },
      { q: 'A diástase é corrigida junto?', a: 'Sim, costuma fazer parte do plano abdominal.' },
      { q: 'Quantos procedimentos posso combinar?', a: 'O que for seguro. A segurança define o limite.' },
      { q: 'Recuperação com filhos em casa?', a: 'Exige planejamento e apoio — discutido em detalhe na avaliação.' },
      { q: 'Quem vai me operar?', a: 'O próprio Dr. Farid Bark Hamdar, membro titular da SBCP.' },
    ],
    ctaFinal: 'Você passou anos cuidando de todo mundo. Talvez seja hora de fazer algo por você — com segurança e zero julgamento.',
    ps: 'O Mommy Makeover não apaga a história de mãe — ajuda você a se reconhecer de novo nela.',
  },
  'abdominoplastia-hd-raft.html': {
    title: 'Abdominoplastia HD RAFT em Curitiba | Dr. Farid Bark Hamdar',
    meta: 'Abdominoplastia HD RAFT: correção de diástase, flacidez e definição muscular natural em Curitiba.',
    badge: 'Abdominoplastia HD RAFT',
    heroImg: 'img/farid-abdominoplastia.png',
    headline: 'Abdominoplastia HD RAFT',
    headlineAccent: 'Correção do abdômen com definição natural — não só "tirar a pele".',
    subheadline: 'Reconstrução da parede abdominal: correção da diástase, remoção de pele flácida e definição com técnica HD RAFT.',
    microcopy: 'Correção de diástase · Definição natural · Membro Titular SBCP',
    waText: 'Olá, gostaria de agendar uma avaliação de Abdominoplastia HD RAFT',
    propostaLead: 'Existe um tipo de barriga que não responde a nada. Você emagrece, treina, fecha a dieta — e a parede continua estufada e a pele sobrando.',
    propostaCards: [
      { icon: 'fa-circle-info', title: 'Não é falta de esforço', text: 'Na maioria das vezes é diástase + excesso de pele que perdeu capacidade de retrair. Nenhum exercício resolve isso sozinho.' },
      { icon: 'fa-dumbbell', title: 'Além de remover pele', text: 'A HD RAFT reconstrói a parede muscular e trabalha a definição — abdômen firme e de aparência natural.' },
    ],
    dores: ['Emagreceu, mas a barriga continua saliente.', 'Pele sobrando que se dobra e marca a roupa.', 'Linha no meio do abdômen aberta (diástase).', 'Esconde o abdômen em fotos, praia e intimidade.', 'Medo da cirurgia grande, cicatriz e recuperação.'],
    dorFechamento: 'Esses medos são válidos — e são o que um planejamento sério existe para endereçar.',
    solucaoTitle: 'Técnica <span class="text-brand-gold italic">HD RAFT</span>',
    solucaoIntro: 'Vai além da abdominoplastia tradicional:',
    solucaoItems: [
      { icon: 'fa-arrows-left-right', title: 'Correção da diástase', desc: 'Sutura dos músculos separados — sustentação e firmeza à parede abdominal.' },
      { icon: 'fa-crop', title: 'Remoção de pele', desc: 'Excesso que não retrai mais é removido com planejamento individual.' },
      { icon: 'fa-bolt', title: 'Definição HD', desc: 'Resultado de aparência muscular natural — não apenas "plano e vazio".' },
    ],
    solucaoFechamento: 'Planejamento baseado na sua anatomia, grau de diástase e resultado natural possível.',
    beneficios: ['Reconquiste a barriga que o esforço sozinho não entregava.', 'Correção funcional da diástase: postura e sustentação.', 'Fim do incômodo da pele sobrando.', 'Definição natural com técnica HD RAFT.', 'Confiança de volta na praia, fotos e intimidade.', 'Planejamento criterioso, membro titular SBCP.'],
    ofertaIntro: 'Na avaliação, o Dr. Farid examina o abdômen, mede diástase e flacidez, e explica o que a HD RAFT pode fazer pelo seu caso.',
    avaliacao: ['Exame: diástase, pele e contorno', 'Indicação adequada (abdominoplastia, mini, com lipo?)', 'Técnica HD RAFT explicada para o seu caso', 'Cicatriz, recuperação e cuidados esclarecidos'],
    objecoes: [
      { q: 'Medo da cicatriz.', a: 'Posicionada na linha baixa, escondida pela roupa íntima. Detalhes na avaliação.' },
      { q: 'Cirurgia grande, medo da recuperação.', a: 'Exige planejamento. Na avaliação, orientações claras do que esperar.' },
      { q: 'Não é só fazer mais exercício?', a: 'Diástase + pele em excesso não respondem a exercício. A avaliação esclarece.' },
      { q: 'É caro.', a: 'Depende do caso. Segurança de cirurgião qualificado não é onde economizar.' },
    ],
    garantia: 'Avaliação honesta: você saberá o que a HD RAFT pode e não pode fazer. Segurança antes da venda.',
    urgencia: 'Agenda limitada — atendimento individual. Garanta a sua e comece o planejamento.',
    faq: [
      { q: 'Como sei se tenho diástase?', a: 'Sinais como linha que não fecha e abdômen estufado — o exame confirma.' },
      { q: 'A cicatriz fica aparente?', a: 'Linha baixa, escondida pela roupa íntima. Tende a clarear com os cuidados.' },
      { q: 'Posso combinar com lipo?', a: 'Em muitos casos sim — avaliado individualmente.' },
      { q: 'Quanto tempo de recuperação?', a: 'Varia conforme extensão. Plano claro na consulta.' },
      { q: 'Preciso emagrecer antes?', a: 'Ideal estar próximo do peso estável — avaliado no seu caso.' },
      { q: 'Quem vai me operar?', a: 'O próprio Dr. Farid Bark Hamdar, membro titular da SBCP.' },
    ],
    ctaFinal: 'Se você já tentou de tudo e a barriga não responde, o problema nunca foi falta de esforço.',
    ps: 'Diástase e pele flácida não se resolvem com mais abdominais. A HD RAFT existe exatamente para isso.',
  },
};

function buildPage(p) {
  const waLink = wa(p.waText);

  const doresHtml = p.dores.map((d, i) => `
    <div class="card-dark flex gap-4 items-start" ${aos('fade-up', i * 50)}>
      <span class="flex-shrink-0 w-9 h-9 rounded-full bg-brand-gold/20 text-brand-gold font-bold text-sm flex items-center justify-center">${String(i + 1).padStart(2, '0')}</span>
      <p class="text-brand-textLight/90 text-base leading-relaxed pt-1">${d}</p>
    </div>`).join('');

  const solucaoHtml = p.solucaoItems.map((s, i) => `
    <div class="card-light flex flex-col sm:flex-row gap-5 items-start" ${aos('fade-up', i * 80)}>
      <div class="w-14 h-14 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
        <i class="fa-solid ${s.icon} text-2xl text-brand-gold"></i>
      </div>
      <div>
        <h3 class="text-xl font-serif text-brand-dark mb-2">${s.title}</h3>
        <p class="text-brand-textDark/70 leading-relaxed">${s.desc}</p>
      </div>
    </div>`).join('');

  const beneficiosHtml = p.beneficios.map((b, i) => `
    <div class="flex gap-4 p-5 rounded-xl bg-white/10 border border-white/10 hover:border-brand-gold/40 hover:bg-white/[0.12] transition-all duration-300" ${aos('fade-up', i * 60)}>
      <i class="fa-solid fa-circle-check text-brand-gold text-xl shrink-0 mt-1"></i>
      <p class="text-brand-textLight/90 text-base leading-relaxed">${b}</p>
    </div>`).join('');

  const propostaHtml = p.propostaCards.map((c, i) => `
    <div class="card-light h-full" ${aos('fade-up', i * 100)}>
      <div class="w-12 h-12 rounded-xl bg-[#f3eee6] flex items-center justify-center mb-5">
        <i class="fa-solid ${c.icon} text-2xl text-[#9a8351]"></i>
      </div>
      <h3 class="text-xl font-serif text-brand-dark mb-3">${c.title}</h3>
      <p class="text-brand-textDark/75 leading-relaxed">${c.text}</p>
    </div>`).join('');

  const avaliacaoHtml = p.avaliacao.map((a, i) => `
    <div class="card-light flex gap-4 items-start text-left" ${aos('fade-up', i * 80)}>
      <span class="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold text-brand-dark font-bold flex items-center justify-center">${i + 1}</span>
      <p class="text-brand-textDark/85 text-base leading-relaxed pt-2">${a}</p>
    </div>`).join('');

  const objecoesHtml = p.objecoes.map((o, i) => `
    <div class="card-dark h-full" ${aos('fade-up', i * 80)}>
      <p class="text-brand-gold font-serif text-lg mb-3"><i class="fa-solid fa-quote-left text-sm mr-2 opacity-60"></i>${o.q}</p>
      <p class="text-brand-textLight/75 leading-relaxed text-sm md:text-base">${o.a}</p>
    </div>`).join('');

  const faqHtml = p.faq.map((f) => `
    <details class="group border-b border-white/10 last:border-0">
      <summary class="flex justify-between items-center gap-4 py-5 cursor-pointer list-none group/sum">
        <span class="text-base md:text-lg text-white font-normal group-open/sum:text-brand-gold transition-colors pr-2">${f.q}</span>
        <span class="faq-toggle"><i class="fa-solid fa-plus text-brand-gold text-sm transition-transform duration-300 group-open/sum:rotate-45"></i></span>
      </summary>
      <div class="pb-6 text-brand-textLight/70 leading-relaxed text-base max-w-prose">${f.a}</div>
    </details>`).join('');

  const statsHtml = `
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
      ${[
        ['15+', 'Anos de experiência', 'fa-award'],
        ['SBCP', 'Membro Titular', 'fa-shield-halved'],
        ['★★★★★', 'Google', 'fa-star'],
        ['100%', 'Acompanhamento', 'fa-user-doctor'],
      ].map(([val, label, icon], i) => `
      <div class="card-stat" ${aos('zoom-in', i * 80)}>
        <i class="fa-solid ${icon} text-brand-gold text-xl mb-2"></i>
        <span class="block text-2xl md:text-3xl text-brand-gold font-serif font-bold">${val}</span>
        <span class="text-xs text-brand-textDark/50 uppercase tracking-wider mt-1 block">${label}</span>
      </div>`).join('')}
    </div>`;

  const videosHtml = videos.map((v, i) => `
    <div class="video-card" ${aos('fade-up', i * 100)}>
      <iframe class="w-full h-full" src="${v}" title="Depoimento" allowfullscreen loading="lazy"></iframe>
    </div>`).join('');

  return `${headAssets(p.title, p.meta)}
<body class="bg-brand-light">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NCJCZXRH" height="0" width="0" style="display:none"></iframe></noscript>

<nav class="sticky top-0 z-50 py-3 md:py-4 border-b border-white/10 bg-brand-dark/95 backdrop-blur-md">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
    <a href="index.html" class="transition-opacity hover:opacity-80"><img src="img/logo-farid-branca.png" alt="Dr. Farid Bark" class="h-10 md:h-12 w-auto"></a>
    <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="nav-wa">
      <i class="fa-brands fa-whatsapp"></i><span class="hidden sm:inline">Agendar Avaliação</span><span class="sm:hidden">Agendar</span>
    </a>
  </div>
</nav>

<header class="hero-section relative bg-brand-dark overflow-hidden">
  <div class="absolute inset-0"><img src="${p.heroImg}" alt="" class="w-full h-full object-cover opacity-20"><div class="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/60 lg:to-brand-dark/25"></div></div>
  <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
    <div class="lg:grid lg:grid-cols-2 lg:items-center">
      <div class="flex justify-center lg:justify-end lg:pr-6 xl:pr-10 py-14 md:py-20 lg:py-24" ${aos('fade-right')}>
        <div class="w-full max-w-lg text-center lg:text-left">
      <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/40 text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 w-max mx-auto lg:mx-0"><i class="fa-solid fa-star text-[10px]"></i> ${p.badge}</span>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-serif leading-[1.15] mb-4">${p.headline}</h1>
      <p class="text-lg md:text-xl text-brand-gold/90 font-serif italic font-light leading-snug mb-6">${p.headlineAccent}</p>
      <p class="text-base md:text-lg text-brand-textLight/80 leading-relaxed mb-8">${p.subheadline}</p>
      ${ctaBtn('Quero agendar minha avaliação', waLink, 'gold')}
      <p class="mt-4 text-brand-textLight/45 text-[11px] uppercase tracking-wider">${p.microcopy}</p>
      <div class="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-textLight/80 text-xs"><i class="fa-solid fa-shield-halved text-brand-gold"></i> Membro Titular SBCP</span>
        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-textLight/80 text-xs"><i class="fa-solid fa-id-card text-brand-gold"></i> CRM-PR 31890</span>
      </div>
        </div>
      </div>
    </div>
  </div>
  <div class="hidden lg:block absolute bottom-0 left-0 right-0 z-[1] pointer-events-none leading-[0]" ${aos('fade-left', 200)}>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-2">
        <div aria-hidden="true"></div>
        <div class="flex justify-end">
      <img src="img/drHero.png" alt="Dr. Farid Bark Hamdar" class="hero-doctor-img w-auto max-w-none drop-shadow-2xl select-none">
        </div>
      </div>
    </div>
  </div>
</header>

<section class="py-16 md:py-24 bg-[#f3eee6]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${sectionHead('Entenda o procedimento', 'Por que <span class="text-[#C0A063] italic">faz sentido</span> para você?')}
    <p class="text-xl md:text-2xl font-serif text-[#25364c] text-center leading-relaxed max-w-3xl mx-auto mb-12 md:mb-16" ${aos('fade-up')}>"${p.propostaLead}"</p>
    <div class="grid md:grid-cols-2 gap-6">${propostaHtml}</div>
  </div>
</section>

<section class="py-16 md:py-24 bg-brand-dark">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${sectionHead('Você se identifica?', 'Talvez <span class="text-brand-gold italic">isso</span> soe familiar', true)}
    <div class="grid sm:grid-cols-2 gap-4 mb-10">${doresHtml}</div>
    <p class="text-center text-brand-textLight/60 text-lg font-light italic max-w-xl mx-auto border-t border-white/10 pt-8" ${aos('fade-up')}>"${p.dorFechamento}"</p>
  </div>
</section>

<section class="py-16 md:py-24 bg-brand-light">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${sectionHead('A solução', p.solucaoTitle)}
    <p class="text-center text-brand-textDark/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed" ${aos('fade-up')}>${p.solucaoIntro}</p>
    <div class="grid gap-5 max-w-4xl mx-auto">${solucaoHtml}</div>
    <p class="text-center text-brand-textDark/60 mt-10 max-w-2xl mx-auto leading-relaxed italic md:border-t md:border-brand-gold/30 md:pt-8" ${aos('fade-up')}>${p.solucaoFechamento}</p>
  </div>
</section>

<section class="py-16 md:py-24 bg-brand-accent">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${sectionHead('Transformação', 'O que muda <span class="text-brand-gold italic">na prática</span>', true)}
    <div class="grid sm:grid-cols-2 gap-4">${beneficiosHtml}</div>
  </div>
</section>

<section class="py-12 md:py-14 bg-brand-gold overflow-hidden">
  <div class="max-w-4xl mx-auto px-4 text-center" ${aos('zoom-in')}>
    <p class="text-brand-dark text-lg md:text-xl font-serif mb-6">Pronto para dar o primeiro passo com segurança?</p>
    ${ctaBtn('Agendar minha avaliação', waLink, 'dark')}
  </div>
</section>

<section class="py-16 md:py-24 bg-[#f3eee6]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${sectionHead('Prova social', 'Vidas <span class="text-[#C0A063] italic">transformadas</span>')}
    ${statsHtml}
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">${videosHtml}</div>
  </div>
</section>

<section class="py-16 md:py-24 bg-white">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${sectionHead('Próximo passo', 'O que acontece na <span class="text-[#C0A063] italic">sua avaliação</span>')}
    <p class="text-center text-brand-textDark/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed" ${aos('fade-up')}>${p.ofertaIntro}</p>
    <div class="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">${avaliacaoHtml}</div>
    <div class="text-center" ${aos('fade-up')}>${ctaBtn('Agendar minha avaliação', waLink, 'gold')}</div>
  </div>
</section>

<section class="py-16 md:py-24 bg-brand-dark">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${sectionHead('Transparência', 'Suas dúvidas, <span class="text-brand-gold italic">respondidas</span>', true)}
    <div class="grid md:grid-cols-2 gap-4 mb-10">${objecoesHtml}</div>
    <div class="card-dark border-brand-gold/30 text-center max-w-3xl mx-auto" ${aos('fade-up')}>
      <i class="fa-solid fa-handshake text-3xl text-brand-gold mb-4"></i>
      <p class="text-brand-textLight/85 leading-relaxed text-base md:text-lg">${p.garantia}</p>
    </div>
    <p class="mt-8 text-center text-brand-textLight/45 text-sm max-w-lg mx-auto" ${aos('fade-up')}>${p.urgencia}</p>
  </div>
</section>

<section class="py-16 md:py-24 bg-brand-dark border-t border-white/5">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    ${sectionHead('FAQ', 'Perguntas <span class="text-brand-gold italic">frequentes</span>', true)}
    <div class="rounded-2xl border border-white/10 bg-white/[0.02] px-5 md:px-8" ${aos('fade-up')}>${faqHtml}</div>
  </div>
</section>

<section class="py-16 md:py-20 bg-brand-accent text-center px-4 overflow-hidden">
  <div class="max-w-2xl mx-auto" ${aos('fade-up')}>
    <p class="text-xl md:text-2xl text-white font-serif leading-relaxed mb-8">${p.ctaFinal}</p>
    ${ctaBtn('Agendar minha avaliação', waLink, 'gold')}
    <p class="mt-10 text-brand-textLight/50 text-sm leading-relaxed italic max-w-md mx-auto">${p.ps}</p>
  </div>
</section>

<section class="py-16 md:py-20 bg-[#f3eee6] overflow-hidden">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid md:grid-cols-2 gap-6">
      <div class="card-light border-l-4 border-l-brand-gold" ${aos('fade-right')}>
        <div class="flex items-center gap-3 mb-4"><i class="fa-solid fa-location-dot text-2xl text-brand-gold"></i><h3 class="font-bold text-brand-dark uppercase tracking-wider text-sm">Endereço</h3></div>
        <p class="text-brand-textDark/80 text-lg leading-relaxed">Avenida Vicente Machado, 1881<br>Curitiba — PR</p>
      </div>
      <div class="card-light flex flex-col justify-center gap-4 border-l-4 border-l-brand-gold overflow-hidden" ${aos('fade-left')}>
        ${ctaBtn('Falar no WhatsApp', waLink, 'sm-whatsapp')}
        <a href="tel:+554132442055" class="btn-cta btn-outline px-6 py-3 text-sm w-full"><i class="fa-solid fa-phone"></i> (41) 3244-2055</a>
      </div>
    </div>
  </div>
</section>

<footer class="bg-brand-dark py-10 border-t border-white/5">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
      <a href="index.html" class="transition-opacity hover:opacity-80"><img src="img/logo-farid-branca.png" alt="Dr. Farid" class="h-10 w-auto opacity-90"></a>
      <div class="flex flex-wrap justify-center gap-4 text-sm">
        <a href="index.html" class="link-footer">Início</a>
        <a href="lipo-hd.html" class="link-footer">Lipo HD</a>
        <a href="cirurgia-mamaria.html" class="link-footer">Cirurgia Mamária</a>
        <a href="mommy-makeover.html" class="link-footer">Mommy Makeover</a>
        <a href="abdominoplastia-hd-raft.html" class="link-footer">Abdominoplastia</a>
      </div>
    </div>
    <p class="text-center text-brand-textLight/30 text-[10px] uppercase tracking-widest">Dr. Farid Bark Hamdar · CRM-PR 31890 · Membro Titular SBCP</p>
    <p class="text-center text-brand-textLight/25 text-[10px] mt-2 italic">Resultados variam conforme cada paciente. Conteúdo informativo CFM.</p>
  </div>
</footer>

<a href="${wa()}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="whatsapp-float fixed bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#1faa59] z-[100] transition-all duration-300">
  <i class="fa-brands fa-whatsapp text-white text-2xl"></i>
</a>
${footScripts}
</body>
</html>`;
}

Object.entries(services).forEach(([file, data]) => {
  fs.writeFileSync(file, buildPage(data));
  console.log('✓', file);
});
