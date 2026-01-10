import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  const renderHeader = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  it("renders header text", () => {
    renderHeader();
    expect(screen.getByText(/Northwind/i)).toBeInTheDocument();
  });
});
