import type { ReactNode } from 'react';
import { iconeProps } from './icons';
import Reveal from './Reveal';

interface Area {
  titulo: string;
  descricao: string;
  icone: ReactNode;
  itens: string[];
}


const AREAS: Area[] = [
  {
    titulo: 'Direito Previdenciário',
    descricao:
      'Atuamos na defesa do segurado em cada etapa da relação com o INSS, da concessão do benefício às revisões.',
    icone: (
      <svg {...iconeProps}>
        <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    itens: [
      'Auxílio-doença e aposentadoria por incapacidade',
      'Aposentadoria por idade, rural, híbrida e por tempo de contribuição',
      'Aposentadoria especial',
      'Benefícios negados ou cessados pelo INSS',
      'Revisão de benefícios',
      'Pensão por morte, BPC/LOAS e auxílio-acidente',
      'Perícias médicas e recursos administrativos',
    ],
  },
  {
    titulo: 'Direito Trabalhista',
    descricao: 'Atuamos na defesa do trabalhador na busca pelos direitos previstos em lei.',
    icone: (
      <svg {...iconeProps}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    itens: [
      'Rescisão e verbas trabalhistas não pagas',
      'Horas extras, adicional noturno e de insalubridade',
      'Doenças ocupacionais e acidentes de trabalho',
      'Reconhecimento de vínculo empregatício',
      'Reclamatórias trabalhistas e acordos',
    ],
  },
];

/* Áreas de atuação. */
export default function Servicos() {
  return (
    <section id="areas">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Áreas de Atuação</span>
          <h2>Direito Previdenciário e Direito Trabalhista em Toledo/PR</h2>
          <p className="lead">
            Atuamos de forma dedicada nas duas áreas, defendendo os direitos de quem trabalha e de quem precisa do
            INSS, em Toledo e região.
          </p>
        </Reveal>
        <Reveal className="cards" stagger>
          {AREAS.map((area) => (
            <article className="card" key={area.titulo}>
              <div className="ico">{area.icone}</div>
              <h3>{area.titulo}</h3>
              <p className="lead">{area.descricao}</p>
              <ul>
                {area.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
