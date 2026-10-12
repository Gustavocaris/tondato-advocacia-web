/* Dados estruturados (schema.org) para o Google. `<` é escapado para o JSON não fechar a tag script. */
export default function JsonLd({ dados }: { dados: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  );
}
