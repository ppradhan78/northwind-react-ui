// src/components/Hello.test.tsx
import { render, screen } from "@testing-library/react";
import Banner from "./banner";

describe("Banner component", () => {
  const defaultProps = {
    title: "Northwind",
    subtitle: "Trading",
    imageUrl: "/test-banner.png",
  };

  it("renders title and subtitle", () => {
    render(<Banner {...defaultProps} />);
    expect(screen.getByText("Northwind")).toBeInTheDocument();
    expect(screen.getByText("Trading")).toBeInTheDocument();
  });

  it("renders banner image with alt text", () => {
    render(<Banner {...defaultProps} />);

    const image = screen.getByAltText("Application banner");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-banner.png");
  });

  it("renders button when onButtonClick is provided", () => {
    render(
      <Banner
        {...defaultProps}
        buttonText="Get Started"
        onButtonClick={() => {}}
      />
    );

    expect(
      screen.getByRole("button", { name: "Get Started" })
    ).toBeInTheDocument();
  });
});
