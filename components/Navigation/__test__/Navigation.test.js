/* eslint-disable testing-library/no-node-access */
import Navigation from "..";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Navigation", () => {
  it("is navigation rendered", () => {
    render(<Navigation />);
    const el = document.querySelector(".navigation-container");
    expect(el).toBeInTheDocument();
  });
});
