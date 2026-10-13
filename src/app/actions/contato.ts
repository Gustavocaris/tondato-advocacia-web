'use server';

import { SITE } from '@/lib/site';

export type Campo = 'nome' | 'email' | 'telefone' | 'assunto' | 'mensagem';

export interface EstadoContato {
  status: 'idle' | 'ok' | 'erro';
  mensagem?: string;
  erros?: Partial<Record<Campo, string>>;
  valores?: Partial<Record<Campo, string>>;
}

const ASSUNTOS = ['Direito Previdenciário', 'Direito Trabalhista', 'Outro assunto'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
 * Envia a mensagem do formulário de contato por e-mail usando a API do Resend (resend.com).
 * Variáveis de ambiente: RESEND_API_KEY (obrigatória), CONTATO_TO e CONTATO_FROM (opcionais).
 */
export async function enviarContato(_anterior: EstadoContato, dados: FormData): Promise<EstadoContato> {
  const ler = (campo: string) => String(dados.get(campo) ?? '').trim();
  const valores = {
    nome: ler('nome').replace(/[\r\n]+/g, ' '),
    email: ler('email'),
    telefone: ler('telefone'),
    assunto: ler('assunto'),
    mensagem: ler('mensagem'),
  };

  // Campo invisível para humanos: se vier preenchido, é robô. Finge sucesso e descarta.
  if (ler('site')) return { status: 'ok' };

  const erros: EstadoContato['erros'] = {};
  if (valores.nome.length < 2) erros.nome = 'Informe seu nome.';
  if (!EMAIL_RE.test(valores.email)) erros.email = 'Informe um e-mail válido.';
  if (!ASSUNTOS.includes(valores.assunto)) erros.assunto = 'Escolha um assunto.';
  if (valores.mensagem.length < 10) erros.mensagem = 'Conte um pouco mais sobre sua dúvida.';
  if (valores.mensagem.length > 5000) erros.mensagem = 'A mensagem pode ter até 5.000 caracteres.';
  if (Object.keys(erros).length > 0) {
    return { status: 'erro', mensagem: 'Revise os campos destacados.', erros, valores };
  }

  const chave = process.env.RESEND_API_KEY;
  if (!chave) {
    console.warn('[contato] RESEND_API_KEY não configurada; mensagem não enviada.');
    return {
      status: 'erro',
      mensagem: 'O envio por e-mail está temporariamente indisponível. Fale conosco pelo WhatsApp.',
      valores,
    };
  }

  const texto = [
    `Nome: ${valores.nome}`,
    `E-mail: ${valores.email}`,
    `Telefone: ${valores.telefone || '—'}`,
    `Assunto: ${valores.assunto}`,
    '',
    valores.mensagem,
  ].join('\n');

  try {
    const resposta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${chave}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTATO_FROM ?? 'Site Tondato <onboarding@resend.dev>',
        to: [process.env.CONTATO_TO ?? SITE.email],
        reply_to: valores.email,
        subject: `[Site] ${valores.assunto} — ${valores.nome}`,
        text: texto,
      }),
    });
    if (!resposta.ok) throw new Error(`Resend respondeu ${resposta.status}: ${await resposta.text()}`);
  } catch (e) {
    console.error('[contato] Falha ao enviar e-mail:', e);
    return {
      status: 'erro',
      mensagem: 'Não foi possível enviar agora. Tente novamente em instantes ou fale conosco pelo WhatsApp.',
      valores,
    };
  }

  return { status: 'ok', mensagem: 'Mensagem enviada! Responderemos pelo e-mail informado em breve.' };
}
