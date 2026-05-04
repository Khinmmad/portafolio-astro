import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { navigation as links } from '../data/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome =
    typeof window !== 'undefined' &&
    (window.location.pathname === '/portafolio-astro/' || window.location.pathname === '/');

  const getHref = (href: string) => {
    if (href.startsWith('#') && !isHome) {
      return `/portafolio-astro/${href}`;
    }
    return href;
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sectionLinks = links.filter((l) => l.href.startsWith('#'));
      const sections = sectionLinks.map((l) => l.href.slice(1));
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const top = el.getBoundingClientRect().top;
        return top <= 200;
      });
      if (current) setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActive('');
    if (!isHome && window.location.pathname.includes('/blog')) {
      setActive('blog');
    }
  }, [isHome]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      role="navigation"
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/80 backdrop-blur-lg shadow-lg shadow-purple-900/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
          Khinmmad
        </a>

        <div className="hidden md:flex gap-8">
          {links.map((l) => {
            const href = getHref(l.href);
            const isActive = l.href.startsWith('#')
              ? active === l.href.slice(1)
              : active === l.href.replace(/^.*\//, '');
            return (
              <a
                key={l.href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative text-sm font-medium transition-colors ${
                  isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full"
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800/95 backdrop-blur-lg border-t border-white/5"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {links.map((l) => {
                const href = getHref(l.href);
                const isActive = l.href.startsWith('#')
                  ? active === l.href.slice(1)
                  : active === l.href.replace(/^.*\//, '');
                return (
                  <a
                    key={l.href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    } focus-visible:ring-2 focus-visible:ring-purple-400`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
