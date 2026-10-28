
import { useState } from "react";
import "../../paginaJogo.css";
import FundoCoracoes from "../../componentes/FundoCoracoes.jsx";

const estilos = {
  pagina: { color: "#fff", textAlign: "center", padding: 20 },
  tabuleiro: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(75px, 100px))",
    gap: 8,
    justifyContent: "center",
    margin: "24px auto",
  },
  casa: {
    height: 90,
    border: "2px solid #ff70c5",
    borderRadius: 14,
    background: "#21102f",
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
    cursor: "pointer",
  },
  botao: {
    padding: "10px 18px",
    border: 0,
    borderRadius: 20,
    background: "#ff43b8",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    margin: 6,
  },
};

function verificarVencedor(casas) {
  const combinacoes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const [a, b, c] of combinacoes) {
    if (casas[a] && casas[a] === casas[b] && casas[a] === casas[c]) {
      return casas[a];
    }
  }

  return null;
}

export default function JogoDaVelha({ onVoltar }) {
  const [casas, setCasas] = useState(Array(9).fill(null));
  const [jogador, setJogador] = useState("X");

  const vencedor = verificarVencedor(casas);
  const empate = !vencedor && casas.every(Boolean);

  function jogar(indice) {
    if (casas[indice] || vencedor || empate) return;

    const novasCasas = [...casas];
    novasCasas[indice] = jogador;

    setCasas(novasCasas);
    setJogador(jogador === "X" ? "O" : "X");
  }

  function reiniciar() {
    setCasas(Array(9).fill(null));
    setJogador("X");
  }


const coracoes = Array.from({ length: 200 }, (_, index) => ({
  id: index,
  emoji: ["💗", "💜", "💕", "💖", "❤️", "💘"][
    index % 6
  ],
  left: `${(index * 37) % 100}%`,
  delay: `${(index * 1.7) % 14}s`,
  duracao: `${12 + (index % 6)}s`,
}));


  return (
  <main className="pagina-jogo-roxa" style={estilos.pagina}>
     <FundoCoracoes />
      <h1>⭕ Jogo da Velha ❌</h1>
      <p>
        {vencedor
          ? `🎉 Jogador ${vencedor} venceu!`
          : empate
          ? "Deu velha! 🤝"
          : `Vez do jogador ${jogador}`}
      </p>

      <div style={estilos.tabuleiro}>
        {casas.map((valor, indice) => (
          <button
            key={indice}
            style={{
              ...estilos.casa,
              color: valor === "X" ? "#ff75cf" : "#72eaff",
            }}
            onClick={() => jogar(indice)}
            aria-label={`Casa ${indice + 1}${valor ? `: ${valor}` : ""}`}
          >
            {valor}
          </button>
        ))}
      </div>

      <button style={estilos.botao} onClick={reiniciar}>
        Jogar novamente
      </button>

      {onVoltar && (
        <button style={estilos.botao} onClick={onVoltar}>
          Voltar ao menu
        </button>
      )}
    </main>
  );
}
