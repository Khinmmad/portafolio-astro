import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { socials } from '../data/socials';

const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY || '';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Error al enviar');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error de conexión');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contacto
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            ¿Tienes alguna pregunta o quieres colaborar? Escríbeme.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Tu nombre
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Tu nombre"
                required
                aria-required="true"
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus-visible:ring-2 focus-visible:ring-purple-400 transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Tu email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Tu email"
                required
                aria-required="true"
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus-visible:ring-2 focus-visible:ring-purple-400 transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Tu mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Tu mensaje"
                required
                aria-required="true"
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus-visible:ring-2 focus-visible:ring-purple-400 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              {status === 'sending' && (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              )}
              {status === 'sent' && (
                <>
                  <FiCheck size={18} />
                  ¡Mensaje enviado!
                </>
              )}
              {status === 'idle' && (
                <>
                  Enviar mensaje
                  <FiSend size={16} />
                </>
              )}
              {status === 'error' && (
                <>
                  Reintentar
                  <FiSend size={16} />
                </>
              )}
            </button>
            {errorMsg && status === 'error' && (
              <p className="text-red-400 text-sm flex items-center gap-1.5" role="alert">
                <FiAlertCircle size={14} />
                {errorMsg}
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-dark-700/50 border border-white/5 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.15)] transition-all duration-300">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Redes</h3>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group focus-visible:ring-2 focus-visible:ring-purple-400 rounded px-1 py-0.5"
                  >
                    <s.icon size={20} aria-hidden="true" />
                    <span className="group-hover:translate-x-1 transition-transform">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
