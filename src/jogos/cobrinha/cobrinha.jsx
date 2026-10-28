
import { useCallback, useEffect, useRef, useState } from "react";
import FundoCoracoes from "../../componentes/FundoCoracoes.jsx";

const TAMANHO = 20;
const INICIAL = [
  { x: 5, y: 10 },
  { x: 4, y: 10 },
  { x: 3, y: 10 },
];

const DIRECOES = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

function gerarComida(cobra) {
  let comida;

  do {
    comida = {
      x: Math.floor(Math.random() * TAMANHO),
      y: Math.floor(Math.random() * TAMANHO),
    };
  } while (cobra.some((parte) => parte.x === comida.x && parte.y === comida.y));

  return comida;
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

export default function Cobrinha({ onVoltar }) {
  const [cobra, setCobra] = useState(INICIAL);
  const [comida, setComida] = useState(() => gerarComida(INICIAL));
  const [direcao, setDirecao] = useState({ x: 1, y: 0 });
  const [fim, setFim] = useState(false);
  const [iniciou, setIniciou] = useState(false);

  const direcaoRef = useRef(direcao);
  const cobraRef = useRef(cobra);
  const comidaRef = useRef(comida);
  const fimRef = useRef(fim);

  const pontuacao = (cobra.length - INICIAL.length) * 10;

  const mudarDirecao = useCallback((novaDirecao) => {
    const atual = direcaoRef.current;

    if (
      novaDirecao.x + atual.x === 0 &&
      novaDirecao.y + atual.y === 0
    ) {
      return;
    }

    direcaoRef.current = novaDirecao;
    setDirecao(novaDirecao);
    setIniciou(true);
  }, []);

  useEffect(() => {
    function teclado(evento) {
      const tecla = evento.key.length === 1
        ? evento.key.toLowerCase()
        : evento.key;

      const novaDirecao = DIRECOES[tecla];
      if (!novaDirecao) return;

      evento.preventDefault();
      mudarDirecao(novaDirecao);
    }

    window.addEventListener("keydown", teclado);
    return () => window.removeEventListener("keydown", teclado);
  }, [mudarDirecao]);

  useEffect(() => {
    if (fim) return;

    const intervalo = setInterval(() => {
      const atual = cobraRef.current;
      const movimento = direcaoRef.current;
      const cabeca = {
        x: atual[0].x + movimento.x,
        y: atual[0].y + movimento.y,
      };

      const comeu =
        cabeca.x === comidaRef.current.x &&
        cabeca.y === comidaRef.current.y;

      const corpoVerificado = comeu ? atual : atual.slice(0, -1);

      const bateuParede =
        cabeca.x < 0 ||
        cabeca.x >= TAMANHO ||
        cabeca.y < 0 ||
        cabeca.y >= TAMANHO;

      const bateuCorpo = corpoVerificado.some(
        (parte) => parte.x === cabeca.x && parte.y === cabeca.y
      );

      if (bateuParede || bateuCorpo) {
        fimRef.current = true;
        setFim(true);
        return;
      }

      const novaCobra = [cabeca, ...atual];

      if (!comeu) novaCobra.pop();

      cobraRef.current = novaCobra;
      setCobra(novaCobra);

      if (comeu) {
        const novaComida = gerarComida(novaCobra);
        comidaRef.current = novaComida;
        setComida(novaComida);
      }
    }, iniciou ? 140 : 220);

    return () => clearInterval(intervalo);
  }, [fim, iniciou]);

  function reiniciar() {
    const novaCobra = [...INICIAL];
    const novaComida = gerarComida(novaCobra);
    const novaDirecao = { x: 1, y: 0 };

    cobraRef.current = novaCobra;
    comidaRef.current = novaComida;
    direcaoRef.current = novaDirecao;
    fimRef.current = false;

    setCobra(novaCobra);
    setComida(novaComida);
    setDirecao(novaDirecao);
    setFim(false);
    setIniciou(false);
  }

  return (
    <main className="pagina-jogo-roxa" style={{ color: "#fff", textAlign: "center", padding: 12 }}>
    <FundoCoracoes />
      <h1>🐍 Cobrinha</h1>
      <p>⭐ Pontuação: {pontuacao}</p>

      <p>
        {fim
          ? "💥 Fim de jogo!"
          : iniciou
          ? "Use as setas ou WASD para jogar."
          : "Pressione uma seta ou toque em uma direção para começar."}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${TAMANHO}, 1fr)`,
          width: "min(88vw, 400px)",
          aspectRatio: "1",
          margin: "18px auto",
          background: "#130d22",
          border: "3px solid #ff43b8",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: TAMANHO * TAMANHO }, (_, indice) => {
          const x = indice % TAMANHO;
          const y = Math.floor(indice / TAMANHO);

          const parte = cobra.findIndex(
            (p) => p.x === x && p.y === y
          );

          const ehComida = comida.x === x && comida.y === y;

          return (
            <div
              key={indice}
              style={{
                background: ehComida
                  ? "#ffcf4a"
                  : parte === 0
                  ? "#00f5c4"
                  : parte > 0
                  ? "#38cba6"
                  : "transparent",
                border: "1px solid #ffffff08",
                borderRadius: parte === 0 ? 5 : 1,
              }}
            />
          );
        })}
      </div>

      <div style={{ display: "grid", gap: 5, justifyContent: "center" }}>
        <button style={botao} onClick={() => mudarDirecao(DIRECOES.ArrowUp)}>
          ⬆️
        </button>
        <div>
          <button style={botao} onClick={() => mudarDirecao(DIRECOES.ArrowLeft)}>
            ⬅️
          </button>
          <button style={botao} onClick={() => mudarDirecao(DIRECOES.ArrowDown)}>
            ⬇️
          </button>
          <button style={botao} onClick={() => mudarDirecao(DIRECOES.ArrowRight)}>
            ➡️
          </button>
        </div>
      </div>

      <button style={botao} onClick={reiniciar}>
        🔄 Reiniciar
      </button>

      {onVoltar && (
        <button style={botao} onClick={onVoltar}>
          Voltar ao menu
        </button>
      )}
    </main>
  );
}
