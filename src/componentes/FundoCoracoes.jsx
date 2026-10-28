
export default function FundoCoracoes() {
  const coracoes = Array.from({ length: 200 }, (_, index) => ({
    id: index,
    emoji: ["💗", "💜", "💕", "💖", "❤️", "💘"][index % 6],
    left: `${(index * 37) % 100}%`,
    delay: `${(index * 1.7) % 14}s`,
    duracao: `${12 + (index % 6)}s`,
  }));

  return (
    <div className="corações-jogo" aria-hidden="true">
      {coracoes.map((coracao) => (
        <span
          key={coracao.id}
          style={{
            left: coracao.left,
            animationDelay: coracao.delay,
            animationDuration: coracao.duracao,
          }}
        >
          {coracao.emoji}
        </span>
      ))}
    </div>
  );
}
