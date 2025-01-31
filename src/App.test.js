import { fireEvent,render, screen } from '@testing-library/react';
import App from './App';
import FeedbackForm from './components/FeedbackForm';

/*
test('renders paragraph with TEST', () => {
  render(<App />);
  const textElement = screen.getByText("TEST"); //Enlever le commentaire correspondant dans App.jspour que le test fonctionne
  expect(textElement).toBeInTheDocument();
});
*/

describe('FeedbackForm', () => {
  test("Submission is disabled if score is lower than 5 and the comment is too short", () => {
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // Simule un changement du score à 4
    const scoreInput = screen.getByLabelText(/Score:/i);
    fireEvent.change(scoreInput, { target: { value: "4" } });

    // Vérifie que le bouton est désactivé
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();

    // Tente de soumettre le formulaire
    fireEvent.click(submitButton);

    // Vérifie que la fonction handleSubmit n'a pas été appelée
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});