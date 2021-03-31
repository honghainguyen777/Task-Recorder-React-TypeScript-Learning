import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { EndOfLineState } from 'typescript';

test('renders learn react link', () => {
  render(<App />);
  const el = screen.getByText(/Hello/i);
  expect(el).toBeInTheDocument();
});
