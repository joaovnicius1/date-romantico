
import { useState } from "react";
import FundoCoracoes from "../../componentes/FundoCoracoes.jsx";

const tamanho = 8;

function criarTabuleiro() {
  return Array.from({ length: tamanho }, (_, linha) =>
    Array.from({ length: tamanho }, (_, coluna) => {
      if ((linha + coluna) % 2 === 0) return null;
      if (linha < 3) return "B";
      if (linha > 4) return "P";
      return null;
    })
  );
}

const botao = {
  padding: "10px 18px",
  border: 0,
  borderRadius: 20,
  background: "#ff43b8",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  margin: 6,
};

export default function Damas({ onVoltar }) {
  const [tabuleiro, setTabuleiro] = useState(criarTabuleiro);
  const [jogador, setJogador] = useState("P");
  const [selecionada, setSelecionada] = useState(null);
  const [mensagem, setMensagem] = useState("Selecione uma peça sua.");

  function clicar(linha, coluna) {
    const peca = tabuleiro[linha][coluna];

    if (!selecionada) {
      if (peca === jogador) {
        setSelecionada([linha, coluna]);
        setMensagem("Agora escolha uma casa diagonal.");
      } else {
        setMensagem("Selecione uma peça sua.");
      }
      return;
    }

    const [origemLinha, origemColuna] = selecionada;

    if (peca === jogador) {
      setSelecionada([linha, coluna]);
      return;
    }

    const deltaLinha = linha - origemLinha;
    const deltaColuna = coluna - origemColuna;
    const direcao = jogador === "P" ? -1 : 1;

    const movimentoSimples =
      Math.abs(deltaColuna) === 1 &&
      deltaLinha === direcao &&
      !peca;

    const captura =
      Math.abs(deltaColuna) === 2 &&
      deltaLinha === direcao * 2 &&
      !peca &&
      tabuleiro[origemLinha + deltaLinha / 2][
        origemColuna + deltaColuna / 2
      ] &&
      tabuleiro[origemLinha + deltaLinha / 2][
        origemColuna + deltaColuna / 2
      ] !== jogador;

    if (!movimentoSimples && !captura) {
      setMensagem("Movimento inválido. Tente outra diagonal.");
      setSelecionada(null);
      return;
    }

    const novoTabuleiro = tabuleiro.map((linhaTabuleiro) => [
      ...linhaTabuleiro,
    ]);

    novoTabuleiro[linha][coluna] = jogador;
    novoTabuleiro[origemLinha][origemColuna] = null;

    if (captura) {
      novoTabuleiro[origemLinha + deltaLinha / 2][
        origemColuna + deltaColuna / 2
      ] = null;
    }

    setTabuleiro(novoTabuleiro);
    setJogador(jogador === "P" ? "B" : "P");
    setSelecionada(null);
    setMensagem(
      captura
        ? "Peça capturada! Vez do próximo jogador."
        : "Boa jogada! Vez do próximo jogador."
    );
  }

  function reiniciar() {
    setTabuleiro(criarTabuleiro());
    setJogador("P");
    setSelecionada(null);
    setMensagem("Selecione uma peça sua.");
  }

  return (
    <main className="pagina-jogo-roxa" style={{ color: "white", textAlign: "center", padding: 12 }}>
        <FundoCoracoes />
      <h1>♟️ Damas</h1>
      <p>Vez de: {jogador === "P" ? "🔴 Vermelho" : "⚪ Branco"}</p>
      <p>{mensagem}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, minmax(25px, 48px))",
          width: "fit-content",
          margin: "20px auto",
          border: "3px solid #ff75cf",
        }}
      >
        {tabuleiro.map((linha, i) =>
          linha.map((peca, j) => {
            const escura = (i + j) % 2 === 1;
            const selecionadaAgora =
              selecionada?.[0] === i && selecionada?.[1] === j;

            return (
              <button
                key={`${i}-${j}`}
                onClick={() => clicar(i, j)}
                aria-label={`Linha ${i + 1}, coluna ${j + 1}`}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  padding: 0,
                  border: selecionadaAgora
                    ? "3px solid #00f5ff"
                    : "1px solid #333",
                  background: escura ? "#57244f" : "#f7d9ee",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {peca && (
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: "75%",
                      height: "75%",
                      borderRadius: "50%",
                      background: peca === "P" ? "#ff4242" : "#fff",
                      color: peca === "P" ? "#fff" : "#222",
                      border: "2px solid #222",
                      fontSize: 18,
                    }}
                  >
                    ●
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>

      <button style={botao} onClick={reiniciar}>Reiniciar</button>
      {onVoltar && (
        <button style={botao} onClick={onVoltar}>Voltar ao menu</button>
      )}
    </main>
  );
}
