import Reveal from './Reveal';

const DIFERENCIAIS = [
  { titulo: 'Escuta atenta', texto: 'Entendemos sua história antes de falar de processo. Cada caso é único.' },
  {
    titulo: 'Estratégia técnica',
    texto: 'Análise cuidadosa da documentação e do histórico para construir o melhor caminho.',
  },
  { titulo: 'Comunicação clara', texto: 'Você acompanha cada andamento do seu processo, sem termos difíceis.' },
];

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="dark">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Por que a Tondato</span>
          <h2>Perto de você em cada decisão</h2>
        </Reveal>
        <Reveal className="grid3" stagger>
          {DIFERENCIAIS.map((d, i) => (
            <div key={d.titulo}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{d.titulo}</h3>
              <p>{d.texto}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
