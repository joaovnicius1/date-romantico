
import { useState } from "react";
import "./ContratoDate.css";

export default function ContratoDate({ nomePessoa, onNomeChange, aoAceitar }) {
  const [leuTermos, setLeuTermos] = useState(false);
  const [rolouAteOFim, setRolouAteOFim] = useState(false);

  function verificarRolagem(event) {
    const elemento = event.currentTarget;
    const chegouAoFim =
      elemento.scrollTop + elemento.clientHeight >=
      elemento.scrollHeight - 10;

    if (chegouAoFim) {
      setRolouAteOFim(true);
    }
  }

  return (
    <section className="contrato-overlay">
      <div className="contrato-janela">
        <header className="contrato-titulo">
          <div className="contrato-titulo-esquerda">
            <span className="contrato-icone">📄</span>
            <span>Assistente de Compromisso Romântico</span>
          </div>

          <span className="contrato-versao">v1.0</span>
        </header>

        <div className="contrato-conteudo">
          <div className="contrato-cabecalho">
            <span className="contrato-selo">DOCUMENTO OFICIALMENTE NÃO OFICIAL</span>

            <h1>Termo de Responsabilidade Afetiva🤝</h1>

            <p>
              Instrumento particular de intenção de comparecimento a um
              encontro romântico.
            </p>
          </div>

          
          <div className="campo-nome-contrato">
            <label htmlFor="nome-contratante">
              IDENTIFIQUE A ILUSTRE CONTRATANTE 💌
            </label>

            <input
              id="nome-contratante"
              type="text"
              value={nomePessoa}
              onChange={(event) => onNomeChange(event.target.value)}
              placeholder="Assine aqui com seu nome ou apelido..."
              maxLength={40}
              autoComplete="given-name"
              required
            />
          </div>


          <div className="contrato-identificacao">
            <p>
              <strong>CONTRATANTE:</strong>{" "}
              {nomePessoa?.trim() || "Pessoa Misteriosa"}
            </p>
            <p>
              <strong>CONTRATADO:</strong> João Vinicius
            </p>
            <p>
              <strong>OBJETO:</strong> Comparecer ao date e evitar um bolo
              injustificado.
            </p>
          </div>

          <div
            className="contrato-texto"
            onScroll={verificarRolagem}
            tabIndex={0}
            aria-label="Termos e condições do contrato"
          >
            <h2>CLÁUSULA 1ª — DO COMPARECIMENTO</h2>
            <p>
              A pessoa contratante declara estar ciente de que existe uma
              expectativa romântica envolvida e que sua presença será aguardada
              com níveis preocupantes de ansiedade.
            </p>

            <h2>CLÁUSULA 2ª — DA PROIBIÇÃO DO BOLO</h2>
            <p>
              Fica extremamente proibido cancelar o date usando justificativas clássicas como “dormi”, “esqueci”, “surgiu o aniversário da minha prima”, “bateram no meu Celta”,
              “tô com problemas gástricos”, “tô sem orçamento”,
              “preciso ir a um velório”, “meu signo não recomenda contato social hj”, “minha bateria social acabou”, “não tenho roupa pra sair”, "sair pra beijar??? nesse contexto politico??", “perdi a vontade de existir", "só quero ficar romantizando a minha solidão hoje", “confundi o dia”, “achei que era amanhã”.
            </p>

            <h2>CLÁUSULA 3ª — DAS PENALIDADES</h2>
            <p>
                Em caso de bolo injustificado, fica estipulada uma multa simbólica de
                R$ 50,00 (cinquenta reais), a título de indenização pelos danos
                emocionais causados ao João.
            </p>

            <h2>CLÁUSULA 4ª — DOS DIREITOS DO CONTRATADO</h2>
            <p>
              Este contrato possui 0% de validade jurídica e 100% de seriedade nas
              intenções românticas do contratado. Nenhuma cláusula poderá ser exigida
              judicialmente, sendo este documento meramente humorístico infelizmente, sem multas
              reais ou obrigações legais. A única cláusula verdadeiramente válida é
              o desejo da minha pessoa de sair contigo. Pensa com carinho, na moral kkkkkk
            </p>

            <h2>CLÁUSULA 5ª — DA LEITURA DOS TERMOS</h2>
            <p>
               Considerando que a contratante provavelmente não leu este documento
                por completo e se leu, certamente pulou alguns parágrafos, fica
                registrado que, ao marcar a caixinha e aceitar os termos, declara
                oficialmente que aceita se casar com João Vinicius, em nome do Pai, Filho e Espirito Santo, em uma cerimônia cuja
                organização, orçamento e escolha das testemunhas serão discutidos
                oportunamente.
            </p>

            <div className="contrato-final">
              <span>FIM DO DOCUMENTO</span>
              <p>
                Parabéns por chegar até aqui. Você tem mais persistência do
                que 98% dos usuários.
              </p>
            </div>
          </div>

          <p className="contrato-aviso">
            {rolouAteOFim
              ? "Você chegou ao final. Agora só falta assumir esse compromisso altamente duvidoso."
              : "Role até o final para desbloquear o aceite deste documento."}
          </p>

          <label className="contrato-checkbox">
            <input
              type="checkbox"
              checked={leuTermos}
              onChange={(event) => setLeuTermos(event.target.checked)}
              disabled={!rolouAteOFim}
            />
            <span>
              Li os termos (ou rolei até o fim fingindo que li) e aceito.
            </span>
          </label>
        </div>

        <footer className="contrato-rodape">
          <span className="contrato-status">
            {leuTermos ? "Termos aceitos" : "Aguardando aceite"}
          </span>

          <button
            type="button"
            className="contrato-botao"
            disabled={!leuTermos}
            onClick={aoAceitar}
          >
            Aceitar e continuar →
          </button>
        </footer>
      </div>
    </section>
  );
}
