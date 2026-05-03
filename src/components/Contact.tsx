import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const socials = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/Khinmmad' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
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
          >
            <div>
              <input
                type="text"
                placeholder="Tu nombre"
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Tu email"
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Tu mensaje"
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sent}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
            >
              {sent ? '¡Mensaje enviado!' : 'Enviar mensaje'}
              <FiSend size={16} />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-dark-700/50 border border-white/5">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Redes</h3>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group"
                  >
                    <s.icon size={20} />
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
