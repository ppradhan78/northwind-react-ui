import { render, screen } from "@testing-library/react";
import Reports from "./Reports";

describe("Report page", () => {
  it("report page header", () => {
    render(<Reports />);
    expect(screen.getByText("Reports")).toBeInTheDocument();
  });
});
