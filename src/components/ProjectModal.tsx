import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiExternalLink, HiExclamation } from 'react-icons/hi';
import { fetchReadme } from '../lib/github';

interface Props {
  repoName: string | null;
  onClose: () => void;
}

export default function ProjectModal({ repoName, onClose }: Props) {
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!repoName) return;
    setLoading(true);
    setError(false);
    setReadme(null);
    fetchReadme(repoName)
      .then((data) => {
        if (data) setReadme(data.content);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [repoName]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {repoName && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-dark-800 border border-white/10 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                {repoName}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-12">
                <HiExclamation size={40} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 mb-4">No se encontró README para este proyecto</p>
                <a
                  href={`https://github.com/Khinmmad/${repoName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <HiExternalLink size={14} />
                  Ver en GitHub
                </a>
              </div>
            )}

            {readme && !loading && (
              <div className="prose prose-invert prose-sm max-w-none">
                {readme.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return (
                      <h1 key={i} className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0">
                        {line.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={i} className="text-xl font-semibold text-gray-200 mb-3 mt-5">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={i} className="text-lg font-medium text-gray-300 mb-2 mt-4">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={i} className="text-gray-400 ml-4 mb-1">
                        {line.replace('- ', '')}
                      </li>
                    );
                  }
                  if (line.startsWith('```')) {
                    return (
                      <pre key={i} className="bg-dark-900/80 text-gray-300 p-4 rounded-xl my-3 overflow-x-auto text-sm border border-white/5">
                        {line.replace(/```\w*/, '')}
                      </pre>
                    );
                  }
                  if (line.trim() === '') {
                    return <div key={i} className="h-3" />;
                  }
                  return (
                    <p key={i} className="text-gray-400 leading-relaxed">
                      {line}
                    </p>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
