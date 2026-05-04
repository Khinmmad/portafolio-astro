import type { IconType } from 'react-icons';
import { FaGithub } from 'react-icons/fa';

export interface Social {
  icon: IconType;
  label: string;
  href: string;
}

export const socials: Social[] = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/Khinmmad' },
];
