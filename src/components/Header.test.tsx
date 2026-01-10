// src/components/Hello.test.tsx
import { render, screen } from "@testing-library/react";
import Hello from "../components/Header";

describe("Header component", () => {
  it("renders heading", () => {
    render(<Hello />);
    expect(screen.getByText("Application Header")).toBeInTheDocument();
  });
});
