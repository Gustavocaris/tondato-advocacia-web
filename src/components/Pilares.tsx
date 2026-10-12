import Reveal from './Reveal';

const PILARES = [
  { titulo: 'Atendimento humanizado', texto: 'Você ouvido de perto, em cada etapa' },
  { titulo: 'Análise individual', texto: 'Cada caso avaliado com atenção aos detalhes' },
  { titulo: 'Foco no segurado', texto: 'O melhor direito em primeiro lugar' },
  { titulo: 'Acompanhamento próximo', texto: 'Você sabe em que fase seu caso está' },
];

export default function Pilares() {
  return (
    <div className="pilares">
      <Reveal className="wrap" stagger>
        {PILARES.map((p) => (
          <div key={p.titulo}>
            <strong>{p.titulo}</strong>
            <span>{p.texto}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
