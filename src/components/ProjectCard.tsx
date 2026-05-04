import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GoStar, GoRepoForked } from 'react-icons/go';
import { FiExternalLink, FiBookOpen } from 'react-icons/fi';
import type { GithubRepo } from '../lib/github';
import { LANGUAGE_COLORS } from '../lib/github';

interface Props {
  repo: GithubRepo;
  index: number;
  onOpenReadme: (name: string) => void;
}

export default function ProjectCard({ repo, index, onOpenReadme }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
        className="relative group"
        whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
    >
      <div
          className="relative p-6 rounded-2xl bg-dark-700/50 border border-white/5 overflow-hidden transition-all duration-300 group-hover:border-purple-500/30 group-hover:shadow-[0_0_40px_-15px_rgba(168,85,247,0.3)]"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(168,85,247,0.08), transparent 60%)`,
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
              {repo.name}
            </h3>
            {repo.language && (
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#6b7280' }}
                />
                {repo.language}
              </span>
            )}
          </div>
          <div className="flex gap-3 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <GoStar size={14} />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GoRepoForked size={14} />
              {repo.forks_count}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
          {repo.description || 'Sin descripción'}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics?.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 rounded px-1 py-0.5"
          >
            <FiExternalLink size={14} aria-hidden="true" />
            GitHub
          </a>
          <button
            onClick={() => onOpenReadme(repo.name)}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 rounded px-1 py-0.5"
          >
            <FiBookOpen size={14} aria-hidden="true" />
            Cómo usar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
