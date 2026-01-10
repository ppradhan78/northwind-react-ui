import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer component", () => {
  const renderFooter = () =>
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

  it("renders footer text", () => {
    renderFooter();
    expect(screen.getByText(/Northwind/i)).toBeInTheDocument();
  });
});
