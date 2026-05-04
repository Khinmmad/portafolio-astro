import React from 'react';

function createIcon(name: string) {
  return React.forwardRef(function MockIcon(props: any, ref: any) {
    return React.createElement('span', { ref, 'data-icon': name, ...props });
  });
}

export const GoStar = createIcon('star');
export const GoRepoForked = createIcon('fork');
