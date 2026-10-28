
import { useEffect, useState } from "react";
import FundoCoracoes from "../../componentes/FundoCoracoes.jsx";

const EMOJIS = ["🐱", "🐶", "🐸", "🦄", "🐼", "🦊", "🐵", "🐰"];

function embaralhar() {
  return [...EMOJIS, ...EMOJIS]
    .map((emoji, indice) => ({
      id: `${indice}-${Math.random()}`,
      emoji,
    }))
    .sort(() => Math.random() - 0.5);
}

const botao = {
  padding: "10px 16px",
  border: 0,
  borderRadius: 16,
  background: "#ff43b8",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  margin: 5,
};

export default function JogoDaMemoria({ onVoltar }) {
  const [cartas, setCartas] = useState(embaralhar);
  const [abertas, setAbertas] = useState([]);
  const [pares, setPares] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    if (abertas.length !== 2) return;

    setBloqueado(true);
    setTentativas((valor) => valor + 1);

    const [primeira, segunda] = abertas;
    const combinam =
      cartas[primeira].emoji === cartas[segunda].emoji;

    const temporizador = setTimeout(() => {
      if (combinam) {
        setPares((atuais) => [...atuais, cartas[primeira].emoji]);
      }

      setAbertas([]);
      setBloqueado(false);
    }, combinam ? 450 : 900);

    return () => clearTimeout(temporizador);
  }, [abertas, cartas]);

  function virarCarta(indice) {
    if (
      bloqueado ||
      abertas.includes(indice) ||
      pares.includes(cartas[indice].emoji
      )
    ) {
      return;
    }

    setAbertas((atuais) => [...atuais, indice]);
  }

  function reiniciar() {
    setCartas(embaralhar());
    setAbertas([]);
    setPares([]);
    setTentativas(0);
    setBloqueado(false);
  }

  const venceu = pares.length === EMOJIS.length;

  return (
    <main className="pagina-jogo-roxa" style={{ color: "#fff", textAlign: "center", padding: 12 }}>
        <FundoCoracoes />
      <h1>🧠 Jogo da Memória</h1>
      <p>🎯 Tentativas: {tentativas}</p>
      <p>
        {venceu
          ? "🎉 Você encontrou todos os pares!"
          : "Encontre os pares iguais!"}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(55px, 85px))",
          gap: 9,
          justifyContent: "center",
          margin: "22px auto",
        }}
      >
        {cartas.map((carta, indice) => {
          const revelada =
            abertas.includes(indice) || pares.includes(carta.emoji);

          return (
            <button
              key={carta.id}
              onClick={() => virarCarta(indice)}
              aria-label={revelada ? carta.emoji : "Carta escondida"}
              style={{
                aspectRatio: "1",
                borderRadius: 13,
                border: "2px solid #ff75cf",
                background: revelada ? "#fff0fa" : "#29133d",
                color: revelada ? "#25102f" : "#ff75cf",
                fontSize: "clamp(25px, 7vw, 38px)",
                cursor: "pointer",
                boxShadow: "0 0 10px #ff43b833",
              }}
            >
              {revelada ? carta.emoji : "❔"}
            </button>
          );
        })}
      </div>

      <button style={botao} onClick={reiniciar}>
        🔄 Jogar novamente
      </button>

      {onVoltar && (
        <button style={botao} onClick={onVoltar}>
          Voltar ao menu
        </button>
      )}
    </main>
  );
}
