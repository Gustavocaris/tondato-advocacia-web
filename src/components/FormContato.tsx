'use client';

import { useActionState } from 'react';
import { enviarContato, type Campo, type EstadoContato } from '@/app/actions/contato';

const ESTADO_INICIAL: EstadoContato = { status: 'idle' };

export default function FormContato() {
  const [estado, acao, enviando] = useActionState(enviarContato, ESTADO_INICIAL);
  const valor = (c: Campo) => estado.valores?.[c] ?? '';
  const erro = (c: Campo) => estado.erros?.[c];
  const props = (c: Campo) => ({
    id: `contato-${c}`,
    name: c,
    defaultValue: valor(c),
    'aria-invalid': erro(c) ? true : undefined,
    'aria-describedby': erro(c) ? `contato-${c}-erro` : undefined,
  });
  const msgErro = (c: Campo) =>
    erro(c) && (
      <span className="campo-erro" id={`contato-${c}-erro`}>
        {erro(c)}
      </span>
    );

  if (estado.status === 'ok') {
    return (
      <div className="form-contato form-ok" role="status">
        <h3>Obrigado pelo contato!</h3>
        <p className="lead">{estado.mensagem ?? 'Mensagem enviada.'}</p>
      </div>
    );
  }

  return (
    <form className="form-contato" action={acao} noValidate>
      <h3>Envie sua dúvida</h3>
      <p className="lead">Preencha os campos abaixo e responderemos pelo seu e-mail.</p>

      <div className="campos">
        <div className="campo">
          <label htmlFor="contato-nome">Nome</label>
          <input {...props('nome')} type="text" autoComplete="name" required />
          {msgErro('nome')}
        </div>
        <div className="campo">
          <label htmlFor="contato-email">E-mail</label>
          <input {...props('email')} type="email" autoComplete="email" required />
          {msgErro('email')}
        </div>
        <div className="campo">
          <label htmlFor="contato-telefone">
            Telefone <small>(opcional)</small>
          </label>
          <input {...props('telefone')} type="tel" autoComplete="tel" />
        </div>
        <div className="campo">
          <label htmlFor="contato-assunto">Assunto</label>
          <select {...props('assunto')} required>
            <option value="" disabled>
              Selecione
            </option>
            <option>Direito Previdenciário</option>
            <option>Direito Trabalhista</option>
            <option>Outro assunto</option>
          </select>
          {msgErro('assunto')}
        </div>
        <div className="campo campo-largo">
          <label htmlFor="contato-mensagem">Mensagem</label>
          <textarea {...props('mensagem')} rows={5} required maxLength={5000} />
          {msgErro('mensagem')}
        </div>
        {/* Armadilha anti-spam: escondido de pessoas, preenchido por robôs. */}
        <div className="campo-oculto" aria-hidden="true">
          <label htmlFor="contato-site">Site</label>
          <input id="contato-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {estado.status === 'erro' && estado.mensagem && (
        <p className="form-aviso" role="alert">
          {estado.mensagem}
        </p>
      )}

      <div className="form-rodape">
        <button className="btn btn-wine" type="submit" disabled={enviando}>
          {enviando ? 'Enviando…' : 'Enviar mensagem'}
        </button>
        <p className="form-nota">
          Seus dados são usados apenas para responder ao seu contato. Não envie documentos sigilosos por aqui.
        </p>
      </div>
    </form>
  );
}
