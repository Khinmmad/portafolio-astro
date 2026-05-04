import React from 'react';

const mockDiv = React.forwardRef(function MockDiv(props: any, ref: any) {
  return React.createElement('div', { ref, ...props });
});

const mockSpan = React.forwardRef(function MockSpan(props: any, ref: any) {
  return React.createElement('span', { ref, ...props });
});

const motion: any = {
  div: mockDiv,
  nav: mockDiv,
  section: mockDiv,
  span: mockSpan,
  form: React.forwardRef(function MockForm(props: any, ref: any) {
    return React.createElement('form', { ref, ...props });
  }),
  a: React.forwardRef(function MockA(props: any, ref: any) {
    return React.createElement('a', { ref, ...props });
  }),
  p: React.forwardRef(function MockP(props: any, ref: any) {
    return React.createElement('p', { ref, ...props });
  }),
  button: React.forwardRef(function MockButton(props: any, ref: any) {
    return React.createElement('button', { ref, ...props });
  }),
};

const AnimatePresence = ({ children }: any) => children;

const useInView = () => [null, true];

export { motion, AnimatePresence, useInView };
