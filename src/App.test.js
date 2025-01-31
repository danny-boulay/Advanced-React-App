import { render, screen } from '@testing-library/react';
import App from './App';

test('renders paragraph with TEST', () => {
  render(<App />);
  const textElement = screen.getByText("TEST"); /*Enlever le commentaire correspondant dans App.jspour que le test fonctionne*/ 
  expect(textElement).toBeInTheDocument();
});
