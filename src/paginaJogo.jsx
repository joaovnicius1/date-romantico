
import "./paginaJogo.css";
import { useState } from "react";

import JogoDaVelha from "./jogos/JogoDaVelha/jogoDaVelha.jsx";
import Damas from "./jogos/damas/damas.jsx";
import Cobrinha from "./jogos/cobrinha/cobrinha.jsx";
import JogoDaMemoria from "./jogos/JogoDaMemoria/JogoDaMemoria.jsx";

function PaginaJogo() {
    const [jogoAtivo, setJogoAtivo] = useState(null);
  const jogos = [
    {
      id: "velha",
      emoji: "⭕",
      nome: "JOGO DA VELHA",
      descricao: "X contra O. Quem perder paga a próxima!",
      cor: "rosa",
      status: "PRONTO PARA A TRETA"
    },
    {
      id: "damas",
      emoji: "♟️",
      nome: "DAMAS",
      descricao: "Estratégia, capturas e humilhação.",
      cor: "roxo",
      status: "ESTRATÉGIA PURA"
    },
    {
      id: "cobrinha",
      emoji: "🐍",
      nome: "JOGO DA COBRINHA",
      descricao: "Coma, cresça e não bata em nada!",
      cor: "verde",
      status: "NÃO SE MATE"
    },
    {
      id: "memoria",
      emoji: "🃏",
      nome: "JOGO DA MEMÓRIA",
      descricao: "Será que você lembra de alguma coisa?",
      cor: "azul",
      status: "TESTE SEU CÉREBRO"
    }
  ];

  
        if (jogoAtivo === "velha") {
        return <JogoDaVelha onVoltar={() => setJogoAtivo(null)} />;
        }

        if (jogoAtivo === "damas") {
        return <Damas onVoltar={() => setJogoAtivo(null)} />;
        }

        if (jogoAtivo === "cobrinha") {
        return <Cobrinha onVoltar={() => setJogoAtivo(null)} />;
        }

        if (jogoAtivo === "memoria") {
        return <JogoDaMemoria onVoltar={() => setJogoAtivo(null)} />;
        }


  return (
    <main className="pagina-jogo">
      <div className="fundo-jogos" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => {
          const emojis = [
            "🎮", "🎲", "👾", "🕹️", "🏆",
            "🧩", "💎", "🎯", "♟️", "🐍"
          ];

          return (
            <span
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i * 1.7) % 14}s`,
                animationDuration: `${10 + (i % 8)}s`
              }}
            >
              {emojis[i % emojis.length]}
            </span>
          );
        })}
      </div>

      <section className="menu-jogos">
        <header className="cabecalho-jogos">
          <span className="subtitulo-jogos">
            ★ SEJA MUITO BEM-VINDA AO ★
          </span>

          <h1 className="titulo-gayman">
            GAYMAN<span>PLAY</span>
          </h1>

          <p className="frase-jogos">
            ♠ NÃO DEIXA O LULA FICAR SABENDO ♣
          </p>

          <div className="divisor-neon">
            ✦ ━━━━━ ESCOLHA SUA TRETA ━━━━━ ✦
          </div>
        </header>


        <div className="grade-jogos">
        {jogos.map((jogo) => (
            <button
            type="button"
            className={`card-jogo ${jogo.cor}`}
            key={jogo.id}
            onClick={() => setJogoAtivo(jogo.id)}
            >
            <span className="etiqueta-jogo">{jogo.status}</span>

            <span className="emoji-jogo">{jogo.emoji}</span>

            <h2>{jogo.nome}</h2>

            <p>{jogo.descricao}</p>

            <span className="botao-jogar">
                JOGAR AGORA ▶
            </span>
            </button>
        ))}
        </div>

        <footer className="rodape-jogos">
          <span>🎰 GAYMANPLAY ARCADE 🎰</span>
          <p>ENTRE POR SUA CONTA E RISCO 😂</p>
        </footer>
      </section>
    </main>
  );
}

export default PaginaJogo;
