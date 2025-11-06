import Testimony from "../components/Testimony";
import { screen, render } from "@testing-library/react";

describe("Testimony", () => {
  beforeEach(() => {
    render(
      <Testimony
        name="Cian"
        heading="Test"
        description="test"
        imageUrl="/cian-pfp.jpg"
      />
    );
  });
  it("renders an image", () => {
    const pic = screen.getByRole("img");
    expect(pic).toBeInTheDocument();
  });
});
