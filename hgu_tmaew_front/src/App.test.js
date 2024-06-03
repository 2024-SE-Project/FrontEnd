// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Router component', () => {
  render(<App />);
  // Assuming your Router component renders something identifiable
  const linkElement = screen.getByText('Team Meeting Match Page');
  expect(linkElement).toBeInTheDocument();
});
