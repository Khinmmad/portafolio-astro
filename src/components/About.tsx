import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '../data/skills';
import { highlights } from '../data/highlights';

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">mí</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Desarrollador apasionado por Linux, automatización y crear herramientas que faciliten la vida.
            Me encanta compartir mis proyectos con la comunidad open-source.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-2xl bg-dark-700/50 border border-white/5 text-center hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)] hover:-translate-y-1"
            >
              <h.icon className="text-purple-400 mx-auto mb-3" size={28} />
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{h.label}</p>
              <p className="text-white font-semibold">{h.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-8 text-center text-gray-300">Tecnologías y Habilidades</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 max-w-2xl mx-auto">
            {skills.map((s, i) => (
              <SkillBar key={s.name} {...s} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
