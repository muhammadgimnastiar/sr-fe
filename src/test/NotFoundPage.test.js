import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import NotFoundPage from "../pages/NotFoundPage";

test("renders NotFoundPage component", () => {
  render(
    <Router>
      <NotFoundPage />
    </Router>
  );

  expect(screen.getByText(/404/i)).toBeInTheDocument();

  const backToHomeLink = screen.getByText(/back to home/i);
  expect(backToHomeLink).toBeInTheDocument();

  expect(screen.getByText("404")).toBeInTheDocument();
  expect(screen.getByText("Sorry, the page you visited does not exist.")).toBeInTheDocument();

  fireEvent.click(backToHomeLink);
  expect(window.location.pathname).toBe("/");
});
