import type { IconType } from 'react-icons';
import { HiCode, HiTerminal, HiCube } from 'react-icons/hi';

export interface Highlight {
  icon: IconType;
  label: string;
  value: string;
}

export const highlights: Highlight[] = [
  { icon: HiCode, label: 'Proyectos Web', value: 'Full-stack' },
  { icon: HiTerminal, label: 'Scripts', value: 'Automatización' },
  { icon: HiCube, label: 'Open Source', value: 'Contribuciones' },
];
