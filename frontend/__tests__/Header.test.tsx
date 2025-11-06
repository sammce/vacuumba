import Header from "../components/Header";
import { render, screen } from "@testing-library/react";

// describe() creates a test suite
describe("Header", () => {
  // beforeEach() runs before each test in the suite
  beforeEach(() => {
    render(<Header />);
  });

  // it() creates an individual unit test
  it("renders the main heading", () => {
    const heading = screen.getByText("vacuumba");
    expect(heading).toBeVisible();
  });

  it("renders a login button", () => {
    const btn = screen.getByText("Login");
    expect(btn).toHaveClass("chakra-button");
    expect(btn).toBeVisible();
  });
});
