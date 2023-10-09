/* eslint-disable testing-library/no-node-access */
import Button from "..";
import { render } from "@testing-library/react";

const defaultProps = {
  handleGoBack: () => {},
  text: "Taha",
};

describe("Button", () => {
  it("is text changing based on different prop", () => {
    const { rerender } = render(<Button {...defaultProps} />);
    const el = document.querySelector(".header-button-container");
    expect(el.textContent).toBe("Taha");
    const modifiedProps = { ...defaultProps, text: "Zeybek" };
    rerender(<Button {...modifiedProps} />);
    expect(el.textContent).toBe("Zeybek");
  });
});
