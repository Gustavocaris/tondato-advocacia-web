const PILARES = [
  { titulo: 'Atendimento humanizado', texto: 'Você ouvido de perto, em cada etapa' },
  { titulo: 'Análise individual', texto: 'Cada caso avaliado com atenção aos detalhes' },
  { titulo: 'Foco no segurado', texto: 'O melhor direito em primeiro lugar' },
  { titulo: 'Acompanhamento próximo', texto: 'Você sabe em que fase seu caso está' },
  { titulo: 'Comunicação clara', texto: 'Cada etapa explicada em linguagem simples' },
  { titulo: 'Atendimento pelo WhatsApp', texto: 'Fale com o escritório de onde estiver' },
  { titulo: 'Toledo e região', texto: 'Atendimento presencial no escritório' },
];

/* Faixa de diferenciais em loop contínuo; o segundo grupo é cópia visual para emendar o movimento. */
export default function Pilares() {
  const grupo = (copia: boolean) => (
    <ul className="pilares-grupo" aria-hidden={copia || undefined}>
      {PILARES.map((p) => (
        <li key={p.titulo}>
          <strong>{p.titulo}</strong>
          <span>{p.texto}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="pilares">
      <div className="pilares-marquee">
        <div className="pilares-track">
          {grupo(false)}
          {grupo(true)}
        </div>
      </div>
    </div>
  );
}
