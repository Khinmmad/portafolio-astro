import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

vi.mock('framer-motion');
vi.mock('react-icons/fi');
vi.mock('react-icons/fa');
vi.mock('react-icons/hi');
vi.mock('react-icons/go');

describe('Contact', () => {
  it('renders contact form', async () => {
    const { default: Contact } = await import('../components/Contact');
    render(React.createElement(Contact));
    expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu mensaje')).toBeInTheDocument();
    expect(screen.getByText('Enviar mensaje')).toBeInTheDocument();
  });

  it('shows sending state on submit', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})),
    );
    const { default: Contact } = await import('../components/Contact');
    const { container } = render(React.createElement(Contact));
    const form = container.querySelector('form');
    expect(form).toBeTruthy();
    fireEvent.submit(form!);
    expect(await screen.findByText('Enviando...')).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});
