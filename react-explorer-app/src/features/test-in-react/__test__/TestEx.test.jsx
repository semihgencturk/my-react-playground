import { render, screen } from "@testing-library/react";
import TestEx from "@/features/test-in-react/TestEx.jsx";

test("renders hello message", () => {
  render(<TestEx />);
  expect(screen.getByText(/hello react/i)).toBeInTheDocument();
});