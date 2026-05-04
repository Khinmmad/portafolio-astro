import React from 'react';

function createIcon(name: string) {
  return React.forwardRef(function MockIcon(props: any, ref: any) {
    return React.createElement('span', { ref, 'data-icon': name, ...props });
  });
}

export const HiMenu = createIcon('menu');
export const HiX = createIcon('x');
export const HiArrowDown = createIcon('arrow-down');
export const HiCode = createIcon('code');
export const HiTerminal = createIcon('terminal');
export const HiCube = createIcon('cube');
export const HiExternalLink = createIcon('external');
export const HiExclamation = createIcon('exclamation');
export const HiSun = createIcon('sun');
export const HiMoon = createIcon('moon');
