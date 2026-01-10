import { render, screen, fireEvent } from "@testing-library/react";
import Reports from "./Reports";
import { vi } from "vitest";

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: "John" },
  });

  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: "Doe" },
  });

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "john.doe@test.com" },
  });

  fireEvent.change(screen.getByLabelText(/department/i), {
    target: { value: "IT" },
  });

  fireEvent.click(screen.getByLabelText(/male/i));

  fireEvent.change(screen.getByLabelText(/hire date/i), {
    target: { value: new Date().toISOString().split("T")[0] },
  });

  fireEvent.change(screen.getByLabelText(/salary/i), {
    target: { value: "50000" },
  });

  fireEvent.click(screen.getByLabelText(/terms and conditions/i));
};

describe("Report page", () => {
  it("report page header", () => {
    render(<Reports />);
    expect(screen.getByText("Employee Form")).toBeInTheDocument();
  });

  test("submits form when submit is clicked", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<Reports />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    consoleSpy.mockRestore();
  });

  test("clear form when clear is clicked", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<Reports />);

    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    consoleSpy.mockRestore();
  });

  test("email validation works", () => {
    render(<Reports />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test("hire date cannot be in the past", () => {
    render(<Reports />);

    fireEvent.change(screen.getByLabelText(/hire date/i), {
      target: { value: "2020-01-01" },
    });

    expect(screen.getByText(/past date not allowed/i)).toBeInTheDocument();
  });

  test("salary min and max validation", () => {
    render(<Reports />);

    fireEvent.change(screen.getByLabelText(/salary/i), {
      target: { value: "500" },
    });

    expect(screen.getByText(/salary must be between/i)).toBeInTheDocument();
  });

  test("submit button is disabled initially", () => {
    render(<Reports />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  // test("shows required validation errors on submit", () => {
  //   render(<Reports />);

  //   fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  //   expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  //   expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
  //   expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  //   expect(screen.getByText(/department is required/i)).toBeInTheDocument();
  //   expect(screen.getByText(/gender is required/i)).toBeInTheDocument();
  //   expect(screen.getByText(/hire date is required/i)).toBeInTheDocument();
  //   expect(screen.getByText(/you must accept terms/i)).toBeInTheDocument();
  // });

  // test("submit button enabled when form is valid", () => {
  //   render(<Reports />);
  //   fillValidForm();
  //   expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();
  // });

  // test("form submits successfully with valid data", () => {
  //   const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  //   render(<Reports />);
  //   fillValidForm();
  //   fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  //   expect(consoleSpy).toHaveBeenCalled();
  //   consoleSpy.mockRestore();
  // });

  // test("clear button resets form including checkbox", () => {
  //   render(<Reports />);
  //   fillValidForm();
  //   fireEvent.click(screen.getByRole("button", { name: /clear/i }));
  //   expect(screen.getByLabelText(/first name/i)).toHaveValue("");
  //   expect(screen.getByLabelText(/terms and conditions/i)).not.toBeChecked();
  //   expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  // });

  test("allows multiple file selection and updates the file list", () => {
    render(<Reports />);

    // Create fake files
    const file1 = new File(["content1"], "file1.pdf", {
      type: "application/pdf",
    });
    const file2 = new File(["content2"], "file2.png", { type: "image/png" });

    const fileInput = screen.getByLabelText(
      /upload files/i
    ) as HTMLInputElement;

    // Simulate selecting multiple files
    fireEvent.change(fileInput, {
      target: { files: [file1, file2] },
    });

    // Check that files are displayed in the component (UI)
    expect(screen.getByText("file1.pdf")).toBeInTheDocument();
    expect(screen.getByText("file2.png")).toBeInTheDocument();

    // Optional: check input files directly
    expect(fileInput.files).toHaveLength(2);
    expect(fileInput.files?.[0].name).toBe("file1.pdf");
    expect(fileInput.files?.[1].name).toBe("file2.png");
  });

  test("clears file input on Clear button click", () => {
    render(<Reports />);

    const file1 = new File(["content1"], "file1.pdf", {
      type: "application/pdf",
    });
    const fileInput = screen.getByLabelText(
      /upload files/i
    ) as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file1] } });

    // Click clear
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));

    // File input should be empty
    expect(fileInput.value).toBe("");
    // File list in UI should be cleared
    expect(screen.queryByText("file1.pdf")).not.toBeInTheDocument();
  });
});
