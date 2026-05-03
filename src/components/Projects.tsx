import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import type { GithubRepo } from '../lib/github';
import { fetchRepos } from '../lib/github';

export default function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalRepo, setModalRepo] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetchRepos()
      .then(setRepos)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mis <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Proyectos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Proyectos open-source actualizados desde GitHub. Haz clic en "Cómo usar" para ver las instrucciones.
          </p>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-dark-700/50 border border-white/5 animate-pulse">
                <div className="h-5 bg-dark-600 rounded w-2/3 mb-4" />
                <div className="h-3 bg-dark-600 rounded w-1/4 mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-dark-600 rounded w-full" />
                  <div className="h-3 bg-dark-600 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Error al cargar los proyectos. Intenta de nuevo más tarde.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                index={i}
                onOpenReadme={setModalRepo}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectModal repoName={modalRepo} onClose={() => setModalRepo(null)} />
    </section>
  );
}
