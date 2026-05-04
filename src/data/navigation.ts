export interface NavLink {
  href: string;
  label: string;
}

export const navigation: NavLink[] = [
  { href: '#hero', label: 'Inicio' },
  { href: '#about', label: 'Sobre mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '/portafolio-astro/blog', label: 'Blog' },
  { href: '#contact', label: 'Contacto' },
];
