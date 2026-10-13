
import { useState, useRef, useEffect } from "react";
import "./App.css";
import ContratoDate from "./ContratoDate";

// ============================================
// PERSONALIZAÇÃO
// ============================================

// Coloque o nome da pessoa aqui.
const nomePessoa = "meu bem";

// WhatsApp que receberá o convite.
// Formato: código do país + DDD + número.
const WHATSAPP_NUMERO = "5534988789039";

// Se quiser usar fotos reais na chuva de fotos,
// coloque os caminhos dos arquivos em public/fotos
// e informe os caminhos aqui. Ex.: "/fotos/foto1.jpg".
const FOTOS_CHUVA = [];

const mensagensNao = [
  "NÃO 🙃",
  "Tem certeza? 👀",
  "Só um datezinho... 🥺",
  "Pensa mais um pouquinho 🥺",
  "Vai ser legal, eu prometo 🥹",
  "Não custa nada considerar 😔",
  "Você nem ouviu minha proposta direito 😭",
  "Dá uma chance pro cidadão 💐",
  "E se eu levar um docinho? 🍫",
  "Pensa no look que você vai usar 💅",
  "Para de ser ruim, muié 😭",
  "Eu hein! Tô valendo nada mesmo?! 🤡",
  "AMIGA, COLABORA COM O ROTEIRO 😂",
  "O universo está mandando sinais 🌌",
  "PARAAAAAA!!!!!",
  "EU PAGO A FATURA DO SEU CARTÃO DE CRÉDITO 💳",
  "Minha autoestima está em suas mãos 🥲",
  "O cupido pede uma segunda opinião 🏹",
  "Esse botão está em modo de fuga 🏃",
  "Não me faça instalar o Tinder de novo, purvafor 💀",
  "Como explico isso pra minha imaginação? 💔",
  "A opção NÃO está tentando fugir 📵",
  "Atualize a página e tente se apaixonar 🔄",
  "Quantos nãos você quer? 😂",
  "O máximo que ela pode dizer é não... 😭",
  "Now you're just somebody that I used to know 🎶",
  "Você atingiu seu limite diário de nãos 📉",
  "VOCÊ DERROTOU UM BOTÃO. FELIZ AGORA? 🏆",
  "OH MEU DEUS!!! NÃO SOBROU NADAAAAA 😭",
  "Vai me obrigar a fazer isso msm?",
  "ultima chance hein!!!",
  "me desculpa por isso, mas eu te avisei",
  "CLIQUE AQUI SE VC APOIA FLÁVIO BOLSONARO 22",
  "VOCÊ CLICOUU?? OMG! EU ESTAVA MUITO ENGANADO COM VC",
  "EU TE AMO, MAS VC É UM MONSTRO",
  "ACHO Q NÃO TEM MAIS JEITO, NÃO PODEMOS FICAR JUNTOS",
  "A UNICA COISA Q EU PRECISO, É Q VC DIGA..."
];


const tiposDeDate = [
  {
    nome: "Terapia",
    som: `${import.meta.env.BASE_URL}sons/ta-bom-quanto-sentimento.mp3`,
    emoji: "🛋️",
    descricao: "Vamos descobrir se o problema é a sociedade ou nós dois.",
    historia:
      "A gente chegou achando que ia falar sobre a vida, mas em quinze minutos já estávamos discutindo quem demorou mais para responder no WhatsApp. A terapeuta ficou em silêncio, anotou alguma coisa e sugeriu sessões semanais. Saímos de lá sem resolver nossos problemas, mas com um novo date marcado e uma suspeita: talvez o problema seja a gente mesmo.",
  },
  {
    nome: "Corridinha no Piscinão",
    som: `${import.meta.env.BASE_URL}sons/eu-ja-nao-aguento-mais.mp3`,
    emoji: "🏃",
    descricao: "Cardio, suor e decisões questionáveis.",
    historia:
      "O plano era fazer uma corridinha leve e saudável. Cinco minutos depois, um de nós já estava questionando a existência do capitalismo, a utilidade da educação física e a necessidade de ter pulmões. Terminamos caminhando, fingindo que era parte do treino, e descobrimos que passar vergonha juntos também é uma forma de intimidade.",
  },
  {
    nome: "Laboratório 96",
    som: `${import.meta.env.BASE_URL}sons/que-delicia-ele-e-dos-nossos.mp3`,
    emoji: "🧪",
    descricao: "Um experimento social chamado nós dois.",
    historia:
      "Chegamos com a postura de dois adultos sofisticados, pedimos nossas coisas e tentamos parecer extremamente interessantes. Deu certo por aproximadamente sete minutos. Depois começamos a rir de qualquer besteira e esquecemos completamente a pose. A experiência foi um sucesso: dois indivíduos emocionalmente suspeitos apresentaram forte compatibilidade em ambiente controlado.",
  },
  {
    nome: "Magnolia",
    som: `${import.meta.env.BASE_URL}sons/cheiro-bom-de-pica.mp3`,
    emoji: "🌸",
    descricao: "Luxo, glamour e saldo bancário confidencial.",
    historia:
      "O ambiente era lindo, a companhia era melhor ainda e nós dois estávamos agindo como herdeiros de uma fortuna internacional. Cada pedido era acompanhado de uma rápida consulta mental ao saldo bancário. Mesmo assim, saímos com a dignidade intacta, algumas fotos bonitas e a certeza de que o amor é lindo, mas a fatura do cartão chega sem piedade.",
  },
  {
    nome: "Brejo Bar",
    som: `${import.meta.env.BASE_URL}sons/lesbicasgaysbozo.mp3`,
    emoji: "🐸",
    descricao: "Um encontro digno de um príncipe anfíbio.",
    historia:
      "Nosso romance começou sob a bênção dos anfíbios. Entre conversas, risadas e possíveis coaxares, descobrimos que o amor verdadeiro não exige castelo: às vezes basta um brejo, duas pessoas meio bobas e uma química que nem a biologia consegue explicar. No fim, trocamos olhares apaixonados e quase assinamos um tratado de paz com a comunidade dos sapos.",
  },
  {
    nome: "Comuna Bar",
    som: `${import.meta.env.BASE_URL}sons/ussr.mp3`,
    emoji: "🚩",
    descricao: "Amor, geopolítica e uma bandeira vermelha ou outra.",
    historia:
      "O date começou com uma conversa inocente e terminou com um debate geopolítico que nem a ONU conseguiria mediar. Entre teorias, piadas e acusações de radicalismo ideológico, percebemos que concordávamos em pelo menos uma pauta: passar mais tempo juntos. A revolução pode esperar; primeiro precisamos decidir quem vai pagar a conta.",
  },
  {
    nome: "Jorge's Hamburgueria",
    som: `${import.meta.env.BASE_URL}sons/torresmo_pt1.mp3`,
    emoji: "🍔",
    descricao: "Uma mordida no hambúrguer e outra no coração.",
    historia:
      "Pedimos hambúrgueres e juramos que dividiríamos as batatas de maneira justa. Foi a primeira grande crise diplomática do relacionamento. Depois de negociações intensas, algumas batatas desapareceram misteriosamente e a paz foi restaurada com uma mordida roubada do lanche alheio. O amor venceu, mas a divisão de acompanhamentos precisará ser regulamentada.",
  },
    {
      nome: "Chiquinho",
      som: `${import.meta.env.BASE_URL}sons/toma-milk-shake-de-morango_7NJhrnd.mp3`,
      emoji: "🍦",
      descricao: "Tomando sorvete e derretendo mais que a casquinha.",
      historia:
        "O plano era só tomar um sorvetinho, mas aparentemente ninguém avisou ao meu coração que a sobremesa não era a única coisa capaz de me deixar derretido. Entre colheradas, caldas e aquela discussão importantíssima sobre qual sabor é o melhor, fomos percebendo que até um passeio simples pode virar uma memória gostosa. No fim, o sorvete acabou, a vontade de ficar juntinho continuou e ficou a dúvida: será que eu gostei mais do Chiquinho ou da companhia? Spoiler: a resposta não estava no cardápio. 🍦💕",
    },
  {
    nome: "Bar da Mata",
    som: `${import.meta.env.BASE_URL}sons/descansarnequeocaranaoedeferro.mp3`,
    emoji: "🌳",
    descricao: "Criando raízes enquanto os mosquitos fazem a festa.",
    historia:
      "A natureza estava linda, o clima estava perfeito e os mosquitos decidiram participar ativamente do nosso romance. Tentamos manter a pose de casal de comercial de perfume, mas passamos boa parte do tempo espantando insetos. Ainda assim, entre uma reclamação e outra, descobrimos que até no meio do mato a companhia certa consegue transformar qualquer caos em uma boa história.",
  },
  {
    nome: "Dentista",
    som: `${import.meta.env.BASE_URL}sons/lula-cara-sem-dente.mp3`,
    emoji: "🦷",
    descricao: "tamo aqui pra isso, se precisar",
    historia:
      "Poucos casais podem dizer que o romance começou com alguém perguntando se usamos fio dental. Enquanto aguardávamos, trocamos olhares nervosos e fingimos que aquela era uma atividade normal de casal. A consulta terminou, nossos dentes sobreviveram e o dentista recomendou retornar em seis meses. Nós, porém, já estávamos pensando em marcar o próximo encontro para antes disso.",
  },
  {
    nome: "Parque das Barrigudas",
    som: `${import.meta.env.BASE_URL}sons/vc-sabe-aonde-fica-a-rua-tchunosbangos-tchunosbagos-1.mp3`,
    emoji: "🤰",
    descricao: "Turismo, mistério e a lendária grávida de Taubaté.",
    historia:
      "Fomos contemplar as maravilhas do parque e refletir sobre um dos maiores mistérios da história brasileira: a grávida de Taubaté. Entre teorias, risadas e uma investigação que não levaria a lugar nenhum, percebemos que nossa capacidade de transformar qualquer passeio em um evento histórico era extraordinária. O romance avançou, a investigação ficou inconclusiva e o relatório final foi arquivado por falta de seriedade.",
  },
  {
    nome: "Pôr do Sol",
    som: `${import.meta.env.BASE_URL}sons/e-ta-bom.mp3`,
    emoji: "🌅",
    descricao: "Um pouquinho de romance no meio desse surto coletivo lá no mirante.",
    historia:
      "Encontramos um lugar bonito, vimos o céu mudar de cor e, por alguns instantes, o mundo pareceu menos caótico. Não precisamos de grandes declarações nem de um roteiro perfeito. Bastou conversar, rir e aproveitar a companhia. Foi o tipo de momento que termina com uma pergunta perigosa: quando vamos fazer isso de novo?",
  },
  {
    nome: "Fazer um corre",
    som: `${import.meta.env.BASE_URL}sons/vamos-usar-droga-desgraca.mp3`,
    emoji: "🍁",
    descricao: "Uma missão misteriosa com destino ao lanche.",
    historia:
"Era para ser apenas um rolê para ir f1. Um plano simples, sem grandes expectativas — pelo menos era isso que alguém tentava convencer a própria cabeça.Saímos para cumprir nossa pequena missão, sem imaginar que, entre uma conversa aleatória e outra, a companhia acabaria sendo tão boa quanto o próprio rolê. Houve risadas, assuntos que surgiram do absoluto nada e aquela sensação gostosa de estar com alguém com quem até os momentos mais comuns ficam interessantes. No fim, a missão foi um sucesso: aproveitamos o momento e ainda ganhamos uma desculpa perfeita para marcar outro date. E foi assim que terminou o primeiro capítulo: com um sorriso bobo, uma lembrança boa e uma pergunta que ficou no ar... E se a gente escrevesse o capítulo 2 pessoalmente? 🍃👀"  },
    {
  nome: "Livrar o Brasil das Garras do CAPETAlismo",
  som: `${import.meta.env.BASE_URL}sons/nos-o-povo-sovietico.mp3`,
  emoji: "☭",
  descricao: "My name is Marx, Karl Marx",
  historia:
    "Nosso encontro começou com um objetivo nobre: acabar com a exploração da classe trabalhadora e, se sobrasse tempo, dar uns beijos. Entre debates políticos, denúncias contra a burguesia e olhares suspeitos, percebemos que a única coisa que queríamos socializar era o carinho. Redigimos um manifesto, fundamos o Partido dos Apaixonados e decretamos que os beijos seriam distribuídos conforme a necessidade, mas sempre com consentimento. A revolução ainda não aconteceu, o capitalismo continua firme e forte, mas pelo menos conseguimos dividir a conta sem instaurar uma crise diplomática. 🚩✊"
},
{
  nome: "Academia",
  som: `${import.meta.env.BASE_URL}sons/hora-do-show-porra.mp3`,
  emoji: "🏋️",
  descricao: "Endorfina, competição desnecessária e flerte entre séries.",
  historia:
    "A ideia era treinar juntos e incentivar um ao outro. Na prática, um ficou responsável por contar as repetições e o outro por julgar a execução. Teve competição de quem aguentava mais na esteira, uma discussão séria sobre whey protein e pelo menos três olhares no espelho fingindo conferir a postura. No final, ninguém sabia se estava apaixonado ou só com o músculo dolorido. Fomos embora tomar açaí porque o shape não se constrói sozinho, mas a felicidade também não."
},
{
  nome: "Hospital",
  som: `${import.meta.env.BASE_URL}sons/defante-parada-full.mp3`,
  emoji: "🏥",
  descricao: "Na saúde e na doença, ou pelo menos até a recepção chamar a senha.",
  historia:
    "Nosso romance chegou a um nível tão intenso que o próximo encontro foi no hospital. Entre a recepção, a triagem e a pergunta 'o que você está sentindo?', descobrimos que acompanhar alguém na consulta é praticamente um teste de compatibilidade. Teve cadeira desconfortável, demora, preocupação e aquela troca de olhares de quem já está pensando em fugir dali para comer alguma coisa. No fim, saímos sem saber se o coração acelerado era amor ou ansiedade com o atendimento, mas uma coisa ficou clara: se a gente sobreviveu à espera do SUS junto, talvez consiga sobreviver a qualquer DR. 💗🩺"
},
{
  nome: "Sushi",
  som: `${import.meta.env.BASE_URL}sons/untitled_zd2ts4l-audiotrimmer.mp3`,
  emoji: "🍣",
  descricao: "Peixe cru, olhares suspeitos e a conta chegando como plot twist.",
  historia:
    "O date começou sofisticado: restaurante japonês, conversa interessante e a promessa de comer com elegância. A elegância acabou no primeiro rodízio. Um começou a pedir as peças favoritas como se estivesse se preparando para o inverno, enquanto o outro fingia não reparar na quantidade de salmão consumida. Entre um hot roll e outro, rolou aquela troca de olhares que dizia mais do que qualquer declaração romântica. O verdadeiro teste de amor foi descobrir se dividiríamos a última peça ou iniciaríamos uma guerra diplomática."
},
{
  nome: "Coisas de adulto🔞",
  som: `${import.meta.env.BASE_URL}sons/mas-voce-e-safado-ne.mp3`,
  emoji: "😈",
  descricao: "18+: boletos, responsabilidades e intimidades que não aparecem nos filmes.",
  historia:
    "Chegou a fase em que o maior ato de sedução é perguntar se a pessoa já pagou a conta de luz. O roteiro inclui resolver pendências, fazer orçamento do mês, discutir quem vai lavar a louça e pesquisar por que tudo está tão caro. No meio da burocracia, bateu aquela vontade de abandonar tudo e pedir comida. Mas aí veio o momento mais íntimo de todos: sentar lado a lado, abrir o aplicativo do banco e encarar a realidade sem chorar. No fim, entendemos que crescer é basicamente ter saudade de quando o único problema era escolher o desenho da tarde. E que dividir a vida com alguém é dividir até o PIX do mercado."
},

{
  nome: "Na Minha Casa",
  som: `${import.meta.env.BASE_URL}sons/aqui-e-pra-dormir-e-a-tua-casa-aqui.mp3`,
  emoji: "🏠",
  descricao: "O conforto do lar e a suspeita de que o date vai durar mais que o previsto.",
  historia:
    "O plano era simples: ficar de boa, pedir alguma coisa gostosa e assistir a um filme. Só esquecemos de combinar quem escolheria o filme, porque passamos quarenta minutos procurando algo e mais uma hora conversando. No fim, ninguém prestou atenção na história, a comida acabou rápido demais e ficou aquela vontade suspeita de repetir a dose. Talvez o melhor programa fosse só ficar ali, na companhia um do outro. 💗",
},
{
  nome: "Na Sua Casa",
  som: `${import.meta.env.BASE_URL}sons/tira-tira-caraio-everson-zoio-meme.mp3`,
  emoji: "🗝️",
  descricao: "Visita com hora pra chegar e nenhuma previsão confiável pra ir embora.",
  historia:
    "Cheguei dizendo que era só uma visitinha rápida, como se alguém acreditasse nisso. Entre conversas aleatórias, risadas e aquela intimidade que vai surgindo sem pedir licença, o tempo simplesmente evaporou. A gente começou falando de qualquer coisa e terminou criando piadas internas que provavelmente não fariam sentido pra mais ninguém. Fui embora com um sorriso bobo e a sensação de que já estava arrumando uma desculpa pra voltar. 👀💕",
}
];


const memes = [
  {
    emoji: "🤡",
    titulo: "EU, ANTES DA RESPOSTA",
    legenda: "Fingindo tranquilidade enquanto imagino 47 futuros possíveis.",
  },
  {
    emoji: "👀",
    titulo: "EU, VENDO O SIM",
    legenda: "Não vou criar expectativas... já criando expectativas.",
  },
  
];



function App() {
  
  const [naoMovendo, setNaoMovendo] = useState(false);
  const movimentoNaoRef = useRef(null);
  const direcaoNaoRef = useRef({ x: 3, y: 2 });
  const [chanceDeDesistir, setChanceDeDesistir] = useState(false);
  const [desistiuDoDate, setDesistiuDoDate] = useState(false);
  const audioAtual = useRef(null);
  const [etapa, setEtapa] = useState(1);
  const [cartinhaAberta, setCartinhaAberta] = useState(false);
  const [tentativasNao, setTentativasNao] = useState(0);
  const [posicaoNao, setPosicaoNao] = useState({ top: 0, left: 0 });
  const [tipoDate, setTipoDate] = useState("");
  const [spoilerAberto, setSpoilerAberto] = useState(false);
  const [celular, setCelular] = useState(
    window.matchMedia("(max-width: 600px)").matches
  );

  const [nomePessoa, setNomePessoa] = useState("");
  const areaBotoesRef = useRef(null);
  const botaoNaoRef = useRef(null);

  const dateEscolhido = tiposDeDate.find(
    (date) => date.nome === tipoDate
  );

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 600px)");
    const atualizarTela = () => setCelular(consulta.matches);

    if (consulta.addEventListener) {
      consulta.addEventListener("change", atualizarTela);
      return () => consulta.removeEventListener("change", atualizarTela);
    }

    consulta.addListener(atualizarTela);
    return () => consulta.removeListener(atualizarTela);
  }, []);

  function fugirDoNao() {
    const area = areaBotoesRef.current;
    const botao = botaoNaoRef.current;

    if (!area || !botao || celular) return;

    const larguraArea = area.clientWidth;
    const alturaArea = area.clientHeight;
    const larguraBotao = botao.offsetWidth;
    const alturaBotao = botao.offsetHeight;

    const maxLeft = Math.max(0, larguraArea - larguraBotao);
    const maxTop = Math.max(0, alturaArea - alturaBotao);

    setPosicaoNao({
      left: Math.random() * maxLeft,
      top: Math.random() * maxTop,
    });
  }

    const audiosNao = [
      `${import.meta.env.BASE_URL}sons/faahhhhhh.mp3`,
      `${import.meta.env.BASE_URL}sons/faah-reverb.mp3`,
      `${import.meta.env.BASE_URL}sons/vine-boom.mp3`,
      `${import.meta.env.BASE_URL}sons/seu_arrombadinho_.mp3`,
      `${import.meta.env.BASE_URL}sons/nao-sobrou-nada_fZprXSC.mp3`,
      `${import.meta.env.BASE_URL}sons/voce-nao-tem-aura.mp3`,
      `${import.meta.env.BASE_URL}sons/crank-that-soulja.mp3`,
      `${import.meta.env.BASE_URL}sons/untitled-2_2.mp3`,
      `${import.meta.env.BASE_URL}sons/cat-laugh-meme-1.mp3`
    ];

    const audioEscolhido =
    audiosNao[Math.floor(Math.random() * audiosNao.length)];


    
    function tentarClicarNoNao() {
      if (audioAtual.current) {
        audioAtual.current.pause();
        audioAtual.current.currentTime = 0;
      }

      const audioEscolhido =
        audiosNao[Math.floor(Math.random() * audiosNao.length)];

      const som = new Audio(audioEscolhido);
      som.volume = 0.7;

      audioAtual.current = som;
      som.play().catch(() => {});

      if (tentativasNao >= mensagensNao.length) {
        setEtapa(4);
        return;
      }

      const proximaTentativa = tentativasNao + 1;

      setTentativasNao(proximaTentativa);

      // A chance de desistir aparece uma única vez, na 12ª tentativa.
      if (proximaTentativa === 20 && !chanceDeDesistir) {
        setChanceDeDesistir(true);
      }

      if (!celular) {
        fugirDoNao();
      }

      
useEffect(() => {
  if (!naoMovendo) return;

  let animacao;
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let velocidadeX = 3;
  let velocidadeY = 2;
  let corAtual = 0;

  const cores = [
    "#ff2d95",
    "#00d4ff",
    "#ffe600",
    "#7b2cff",
    "#00e676",
    "#ff5722",
  ];

  const mover = () => {
    const botao = botaoNaoRef.current;
    if (!botao) return;

    const largura = botao.offsetWidth;
    const altura = botao.offsetHeight;

    x += velocidadeX;
    y += velocidadeY;

    if (x + largura >= window.innerWidth || x <= 0) {
      velocidadeX *= -1;
      corAtual = (corAtual + 1) % cores.length;
    }

    if (y + altura >= window.innerHeight || y <= 0) {
      velocidadeY *= -1;
      corAtual = (corAtual + 1) % cores.length;
    }

    x = Math.max(0, Math.min(x, window.innerWidth - largura));
    y = Math.max(0, Math.min(y, window.innerHeight - altura));

    botao.style.position = "fixed";
    botao.style.left = `${x}px`;
    botao.style.top = `${y}px`;
    botao.style.zIndex = "9999";
    botao.style.backgroundColor = cores[corAtual];

    animacao = requestAnimationFrame(mover);
  };

  animacao = requestAnimationFrame(mover);

  return () => cancelAnimationFrame(animacao);
}, [naoMovendo]);

    }



function abrirWhatsApp() {
  if (!WHATSAPP_NUMERO || !/^\d+$/.test(WHATSAPP_NUMERO)) {
    alert("Confira o número de WhatsApp no início do App.jsx.");
    return;
  }

  const nome = nomePessoa.trim().replace(/\./g, " ");

  if (!nome) {
    alert("Informe seu nome antes de continuar.");
    return;
  }

  const mensagem =
    `Oi! Sou ${nome}. Aceitei o convite do João e quero receber minha mensagem do futuro! 🔮 S2`;

  const url =
    `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

    const mensagem =
      `Oiii, João 👀💗\n\n` +
      `Nossa, já tem um tempinho que eu tô de olho em você, sabia? KKKKK 🤭 ` +
      `Te acho bonitinho e confesso que fiquei com vontade de te conhecer melhor...\n\n` +
      `Aí pensei: por que não tomar coragem e te chamar pra sair, né? 🥹❤️\n\n` +
      `O que você acha da gente ir ao ${tipoDate} ${dateEscolhido?.emoji ?? ""} comigo? ` +
      ``Queria tanto te verrr KKKKK 💗👉👈\n\ S2`;`;

    const url =
      `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  const confetes = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    esquerda: `${(i * 37 + 7) % 100}%`,
    atraso: `${(i % 9) * 0.14}s`,
    duracao: `${2.5 + (i % 5) * 0.45}s`,
    emoji: ["💗", "💕", "💖", "✨", "❤️", "📸"][i % 6],
  }));

  return (
    <main className="pagina">
      
       <div className="fundo-coracoes" aria-hidden="true">
  {Array.from({ length: 150 }, (_, i) => {
    const coracoes = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🩷", "🩵", "🤍", "🤎"];
    return (
      <span
        key={i}
        className="foto-flutuante"
        style={{
          "--posicao": `${(i * 47 + 12) % 100}%`,
          "--atraso": `${(i % 20) * -1.8}s`,
          "--duracao": `${10 + (i % 8) * 2}s`,
          "--rotacao": `${(i % 2 === 0 ? -1 : 1) * (8 + (i % 4) * 4)}deg`,
          left: `${(i * 47 + 12) % 100}%`,
          animationDelay: `${(i % 20) * -1.8}s`,
          animationDuration: `${10 + (i % 8) * 2}s`,
          fontSize: `${16 + (i % 5) * 6}px`,
        }}
      >
        {coracoes[i % coracoes.length]}
      </span>
    );
  })}
</div>

      {/* ETAPA 1 — CARTINHA INICIAL */}
      {etapa === 1 && (
        <section className="cartao entrada">
          <span className="icone-principal">💌</span>
          <p className="etiqueta">UMA PEQUENA SURPRESA</p>
          <h1 className="titulo">
            Oiee!
          </h1>
          <p className="mensagem">
            Fiz uma coisinha pra você...
          </p>

          {!cartinhaAberta ? (
            <button
              className="botao botao-principal"
              onClick={() => setCartinhaAberta(true)}
            >
              ABRIR CARTINHA 💌
            </button>
          ) : (
            <div className="carta-revelada entrada">
              <span className="carta-coracao">💗</span>
              <p>
                Tenho uma proposta pra você… 👀
                Prometo boas risadas, uma companhia interessante
                e talvez uma vontade de repetir o encontro.
              </p>
              <button
                className="botao botao-principal"
                onClick={() => setEtapa(2)}
              >
                CONTINUAR 💌
              </button>
            </div>
          )}
        </section>
      )}

      {/* ETAPA 2 — CONTRATO */}
      {etapa === 2 && (
        <ContratoDate
          nomePessoa={nomePessoa}
          onNomeChange={setNomePessoa}
          aoAceitar={() => setEtapa(3)}
        />
      )}

      {/* ETAPA 3 — PERGUNTA */}
      {etapa === 3 && (
        <section className="cartao entrada">
          <span className="icone-principal">💘</span>
          <p className="etiqueta">TENHO UMA PERGUNTA</p>
          <h2>Bora sair comigo, {nomePessoa}?</h2>
          <p>
            Prometo que vai ser melhor do que ficar no celular. 👀
          </p>

          <button
            className="botao botao-sim"
            onClick={() =>{
              const som = new Audio(`${import.meta.env.BASE_URL}sons/acabou.mp3`);
                som.volume = 0.8;
                som.play().catch(() => {});
              abrirWhatsApp();
              setEtapa(4);
            }}
          >
            SIM 😍
          </button>

          <div
            className={`area-botoes ${celular ? "area-celular" : ""}`}
            ref={areaBotoesRef}
            style={{ position: "relative", minHeight: "70px" }}
          >

            <button
              ref={botaoNaoRef}
              className="botao botao-nao"
              style={
                celular
                  ? {}
                  : {
                      position: "absolute",
                      top: `${posicaoNao.top}px`,
                      left: `${posicaoNao.left}px`,
                    }
              }
              onMouseEnter={() => {
                if (!celular) tentarClicarNoNao();
              }}
              onClick={() =>{
                setNaoMovendo(true);
                tentarClicarNoNao();
              }}
            >
              {tentativasNao < mensagensNao.length
                ? mensagensNao[tentativasNao]
                : "SIM 2😍"}
            </button>
          </div>

          
      {chanceDeDesistir && (
        <button
          className="botao"
          onClick={() => {
            const som = new Audio(`${import.meta.env.BASE_URL}sons/good-luck.mp3`);
            som.volume = 0.8;
            som.play().catch(() => {});

            setDesistiuDoDate(true);
            setEtapa(8);
          }}
        >
          Dobrar e passa pra próxima ou um botão misterioso? 💀
        </button>
      )}
        </section>
      )}

      {/* ETAPA 4 — ACEITE E CHUVA DE CORAÇÕES */}
      {etapa === 4 && (
        <section className="cartao comemoracao entrada">
          <div className="chuva-coracoes" aria-hidden="true">
            {confetes.map((confete) => (
              <span
                key={confete.id}
                className="confete"
                style={{
                  left: confete.esquerda,
                  animationDelay: confete.atraso,
                  animationDuration: confete.duracao,
                }}
              >
                {confete.emoji}
              </span>
            ))}
          </div>

          <span className="icone-principal pulando">🥹💗</span>
          <p className="etiqueta">MELHOR RESPOSTA POSSÍVEL</p>
          <h2 className="titulo-comemoracao">
            AAAaaaa! VOCÊ DISSE SIM!
          </h2>
          <p>EU SABIAAAAA! 😂❤️</p>
          <p>
            {nomePessoa}, você acabou de deixar uma pessoa
            muito feliz. EU NÃO DUVIDEI DE VC EM NENHUM MOMENTO. Só dizendo… 👀
          </p>

          {/* Mini fotos decorativas ou fotos reais configuradas acima */}
          <div className="mini-fotos" aria-label="Chuva de lembranças">
            {FOTOS_CHUVA.length > 0
              ? FOTOS_CHUVA.map((foto, index) => (
                  <img
                    key={`${foto}-${index}`}
                    src={foto}
                    alt={`Lembrança ${index + 1}`}
                    className="mini-foto"
                  />
                ))
              : ["📸", "💗", "🥰", "✨"].map((emoji, index) => (
                  <span key={index} className="mini-foto mini-foto-emoji">
                    {emoji}
                  </span>
                ))}
          </div>

          <div className="selo-amor">DATE ACEITO 💌</div>

          <button
            className="botao botao-principal"
            onClick={() => setEtapa(5)}
          >
            TEM MAIS? 👀
          </button>
        </section>
      )}

      
      {/* ETAPA 8 — DESISTÊNCIA */}
      {etapa === 8 && (
        <section className="cartao entrada">
          <span className="icone-principal">💅🤡</span>
          <p className="etiqueta">PEDIDO DE DESISTÊNCIA RECEBIDO</p>

          <h2>Ok, entendi que você não me quer. 😔</h2>

          <p>
            Eu sei que sou um partidão demais pra você.
            Deve dar uma insegurança andar com um homem tão bonito assim.
          </p>
          
            <div className="video-desistencia">
              <video controls playsInline preload="metadata">
                <source src={`${import.meta.env.BASE_URL}imagens/5.mp4`} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            </div>
          <p>
            Um total de zero mulheres doidas pra ficar comigo...
            VC NÃO SABE O QUE TÁ PERDENDO 💀
          </p>

          <button
            className="botao botao-principal"
            onClick={() => {
              setEtapa(3);
              setDesistiuDoDate(false);
              setChanceDeDesistir(false);
              setTentativasNao(0);
            }}
          >
            TÁ BOM, VOU TE DAR UMA CHANCE
          </button>
        </section>
      )}

      {/* ETAPA 5 — CARTINHA ROMÂNTICA */}
      {etapa === 5 && (
        <section className="cartao entrada">
          <span className="icone-principal">💌</span>
          <p className="etiqueta">UMA COISA QUE EU QUERIA TE DIZER</p>
          <h2>Uma cartinha pra você...</h2>

          <div className="carta-romantica">
            <span className="selo-carta">♥</span>
            <p>Oi, {nomePessoa}! ❤️</p>
            <p>
              Confesso que eu estava torcendo muito para você
              clicar naquele SIM.
            </p>
            <p>
              Quero que nosso encontro seja cheio de risadas,
              conversas boas e daqueles momentos simples que
              acabam se tornando especiais.
            </p>
            <p>
              Sem pressão para ser perfeito. A ideia é a gente
              se conhecer melhor, aproveitar o momento e ver
              o que acontece naturalmente. 🥹
            </p>
            <p className="assinatura">
              Com carinho, alguém que quer te ver. 💗
            </p>
          </div>
          <img
            className="imagem-meme-cartinha"
            src={`${import.meta.env.BASE_URL}imagens/img1.jpeg`}
            alt="Meme romântico"
            loading="lazy"
          />

          <button
            className="botao botao-principal"
            onClick={() => setEtapa(6)}
          >
            AGORA QUERO VER O SPOILER 👀
          </button>
        </section>
      )}

      
      {/* ETAPA 6 — SPOILER DO FUTURO: VÍDEOS E IMAGEM */}
      {etapa === 6 && (
        <section className="cartao entrada">
          <span className="icone-principal">🔮</span>
          <p className="etiqueta">PREVISÕES DO FUTURO</p>

          <h2>Quer ver um spoiler do futuro? 👀💍</h2>

          <p>
            A bola de cristal está funcionando com 2% de bateria
            e 98% de expectativas.
          </p>

          {!spoilerAberto ? (
            <button
              className="botao botao-principal"
              onClick={() => setSpoilerAberto(true)}
            >
              MOSTRA LOGO 👀
            </button>
          ) : (
            <div className="spoiler-revelado entrada">
              <h2>📺 CENTRAL DE PREVISÕES</h2>

              <p>
                O sistema analisou os dados e chegou a uma conclusão:
                alguém aqui já está emocionado demais.
              </p>

              <div className="galeria-futuro">
                {/* VÍDEO 1 */}
                <article className="video-card">
                  <video controls playsInline preload="metadata">
                    <source
                      src={`${import.meta.env.BASE_URL}imagens/WhatsApp Video 2026-10-12 at 18.39.05.mp4`}
                      type="video/mp4"
                    />
                    Seu navegador não suporta vídeos.
                  </video>

                  <p>Nosso primeiro aniversário de namoro</p>
                </article>

                {/* VÍDEO 2 */}
                <article className="video-card">
                  <video controls playsInline preload="metadata">
                    <source
                      src={`${import.meta.env.BASE_URL}imagens/WhatsApp Video 8.mp4`}
                      type="video/mp4"
                    />
                    Seu navegador não suporta vídeos.
                  </video>

                  <p>Um sabadinho tranquilo contigo lá em casa</p>
                </article>

                {/* VÍDEO 3 */}
                <article className="video-card">
                  <video controls playsInline preload="metadata">
                    <source
                      src={`${import.meta.env.BASE_URL}imagens/WhatsApp Video 2.mp4`}
                      type="video/mp4"
                    />
                    Seu navegador não suporta vídeos.
                  </video>

                  <p>Nossas Bodas de Rubi</p>
                </article>

                {/* VÍDEO 4 */}
                <article className="video-card">
                  <video controls playsInline preload="metadata">
                    <source
                      src={`${import.meta.env.BASE_URL}imagens/WhatsApp Video 3.mp4`}
                      type="video/mp4"
                    />
                    Seu navegador não suporta vídeos.
                  </video>

                  <p>EU QUERO O QUE ELES TEM!!</p>
                </article>

              </div>

              <h2>MANTENDO AS EXPECTATIVAS CONTROLADAS👍</h2>

              <button
                className="botao botao-principal"
                onClick={() => setEtapa(7)}
              >
                ESCOLHER NOSSO DATE 💘
              </button>
            </div>
          )}
        </section>
      )}


      {/* ETAPA 7 — ESCOLHA DO DATE */}
      {etapa === 7 && (
        <section className="cartao entrada">
          <span className="icone-principal">🗓️</span>
          <p className="etiqueta">VOCÊ ESCOLHE</p>
          <h2>Qual vai ser nosso date?</h2>
          <p>
            Escolha sua opção favorita. Prometo considerar todas! 🥰
          </p>

          <div className="opcoes-date">
            {tiposDeDate.map((date) => (
              <button
                key={date.nome}
                className="opcao-date"
                onClick={() => {
                  const som = new Audio(date.som);
                  som.volume = 0.8;
                  som.play().catch(() => {});
                  setTipoDate(date.nome);
                  setEtapa(9);
                }}
              >
                <span className="emoji-date">{date.emoji}</span>
                <span className="nome-date">{date.nome}</span>
                <span className="descricao-date">
                  {date.descricao}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ETAPA 9 — FANFIC PERSONALIZADA PELO DATE */}
      {etapa === 9 && dateEscolhido && (
        <section className="cartao entrada">
          <span className="icone-principal">{dateEscolhido.emoji}</span>
          <p className="etiqueta">UM POSSÍVEL CAPÍTULO DA NOSSA HISTÓRIA</p>
          <h2>Fanfic: {dateEscolhido.nome} com você 💗</h2>

          <div className="carta-romantica fanfic">
            <p>
              <strong>Capítulo 1 — O começo de alguma coisa?</strong>
            </p>
            <p>
              Era para ser apenas um {dateEscolhido.nome.toLowerCase()}.
              Um plano simples, sem grandes expectativas — pelo menos
              era isso que alguém tentava convencer a própria cabeça.
            </p>
            <p>{dateEscolhido.historia}</p>
            <p>
              E foi assim que terminou o primeiro capítulo:
              com um sorriso bobo, uma lembrança boa e uma pergunta
              que ficou no ar...
            </p>
            <p>
              <strong>
                E se a gente escrevesse o capítulo 2 pessoalmente?
              </strong>
            </p>
          </div>

          <div className="confirmacao-date">
            <span className="emoji-confirmacao">
              {dateEscolhido.emoji}
            </span>
            <p>Nosso date escolhido:</p>
            <h3>{dateEscolhido.nome}</h3>
            <p className="texto-pequeno">
              Agora só falta combinar o dia e a hora.
            </p>
          </div>

          <button
            className="botao botao-whatsapp"
            onClick={abrirWhatsApp}
          >
            💬 VAMOS COMBINAR PELO WHATSAPP
          </button>

          <button
            className="botao botao-secundario"
            onClick={() => setEtapa(7)}
          >
            ESCOLHER OUTRO DATE
          </button>

          <p className="texto-pequeno">
            Mal posso esperar. ❤️
          </p>
        </section>
      )}
    </main>
  );
}

export default App;
