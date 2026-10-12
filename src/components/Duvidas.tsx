'use client';

import { useState } from 'react';
import Reveal from './Reveal';

const PERGUNTAS = [
  {
    pergunta: 'O INSS negou meu benefício. O que posso fazer?',
    resposta:
      'A decisão do INSS não é definitiva. É possível apresentar recurso administrativo, em regra no prazo de 30 dias a partir da ciência da decisão, ou levar o pedido à Justiça, onde as provas são analisadas novamente e, quando for o caso, é feita perícia judicial.',
  },
  {
    pergunta: 'O que é a aposentadoria por idade híbrida?',
    resposta:
      'É a aposentadoria por idade que permite somar o tempo de trabalho rural com o tempo de trabalho urbano para completar a carência exigida. É uma opção para quem trabalhou parte da vida no campo e parte na cidade.',
  },
  {
    pergunta: 'Quem tem direito ao BPC/LOAS?',
    resposta:
      'O BPC é um benefício assistencial de um salário mínimo pago à pessoa idosa, a partir de 65 anos, ou à pessoa com deficiência, desde que a família esteja em situação de baixa renda. Não é preciso ter contribuído para o INSS.',
  },
  {
    pergunta: 'Posso pedir revisão da minha aposentadoria?',
    resposta:
      'Em muitos casos, sim. Erros no cálculo, períodos não considerados ou mudanças na legislação podem justificar uma revisão. Em regra, o prazo para pedir a revisão é de 10 anos, contados do primeiro pagamento do benefício.',
  },
  {
    pergunta: 'Qual é o prazo para entrar com uma ação trabalhista?',
    resposta:
      'A ação trabalhista deve ser proposta em até 2 anos após o fim do contrato de trabalho, e podem ser cobrados os direitos dos últimos 5 anos, contados da data do ajuizamento.',
  },
];

export default function Duvidas() {
  /* Abre uma pergunta por vez. */
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <section id="duvidas" className="faq">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2>Perguntas comuns sobre INSS e direitos trabalhistas</h2>
        </Reveal>
        <Reveal className="faq-list">
          {PERGUNTAS.map((item, i) => (
            <details
              key={item.pergunta}
              open={aberta === i}
              onToggle={(e) => {
                if (e.currentTarget.open) setAberta(i);
                else setAberta((atual) => (atual === i ? null : atual));
              }}
            >
              <summary>{item.pergunta}</summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </Reveal>
        <p className="nota">Conteúdo informativo. Cada caso exige análise individual.</p>
      </div>
    </section>
  );
}
