import React from 'react';

function createIcon(name: string) {
  return React.forwardRef(function MockIcon(props: any, ref: any) {
    return React.createElement('span', { ref, 'data-icon': name, ...props });
  });
}

export const FiSend = createIcon('send');
export const FiCheck = createIcon('check');
export const FiAlertCircle = createIcon('alert');
export const FiExternalLink = createIcon('external');
export const FiBookOpen = createIcon('book');
