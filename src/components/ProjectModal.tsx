import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiExternalLink, HiExclamation } from 'react-icons/hi';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { fetchReadme } from '../lib/github';

interface Props {
  repoName: string | null;
  onClose: () => void;
}

export default function ProjectModal({ repoName, onClose }: Props) {
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const onCloseStable = useCallback(onClose, []);

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
    if (repoName) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      }, 50);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [repoName]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseStable();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements.length === 0) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCloseStable]);

  const titleId = 'modal-title';

  return (
    <AnimatePresence>
      {repoName && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          aria-hidden="false"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-dark-800 border border-white/10 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 id={titleId} className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" aria-hidden="true" />
                {repoName}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400"
                aria-label="Cerrar ventana"
              >
                <HiX size={20} aria-hidden="true" />
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-16" role="status">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="sr-only">Cargando README...</span>
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-12" role="alert">
                <HiExclamation size={40} className="mx-auto text-gray-600 mb-4" aria-hidden="true" />
                <p className="text-gray-400 mb-4">No se encontró README para este proyecto</p>
                <a
                  href={`https://github.com/Khinmmad/${repoName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 rounded px-2 py-1"
                >
                  <HiExternalLink size={14} aria-hidden="true" />
                  Ver en GitHub
                </a>
              </div>
            )}

            {readme && !loading && (
              <div className="prose prose-invert prose-sm max-w-none [&_pre]:bg-dark-900/80 [&_pre]:border [&_pre]:border-white/5 [&_code]:text-sm [&_table]:border-collapse [&_th]:border [&_th]:border-white/10 [&_td]:border [&_td]:border-white/10 [&_th]:px-3 [&_td]:px-3 [&_th]:py-1 [&_td]:py-1 [&_img]:max-w-full [&_img]:rounded-lg [&_a]:text-purple-400 [&_a]:hover:text-purple-300">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {readme}
                </Markdown>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
