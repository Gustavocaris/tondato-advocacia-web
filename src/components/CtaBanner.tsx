import { SITE } from '@/lib/site';

export default function CtaBanner() {
  return (
    <div className="cta">
      <div className="wrap">
        <h2>Precisa entender seus direitos previdenciários ou trabalhistas?</h2>
        <a className="btn btn-cream" href={SITE.whatsappUrl} target="_blank" rel="noopener">
          Fale com a Tondato <span className="btn-seta" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
