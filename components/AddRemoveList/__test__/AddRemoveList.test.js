/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/no-node-access */
import AddRemoveList from "..";
import { render, fireEvent } from "@testing-library/react";

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: (...args) => mockGetItem(...args),
    setItem: (...args) => mockSetItem(...args),
    removeItem: (...args) => mockRemoveItem(...args),
  },
});

const defaultProps = {
  hour: "13:05",
  articleSourceId: "article-1",
  articlesInStorage: ["article-1", "article-2"],
  setArticlesInStorage: jest.fn(),
};

describe("AddRemoveList", () => {
  it("is component rendered", () => {
    render(<AddRemoveList {...defaultProps} />);
    const el = document.querySelector(".button-container");
    expect(el).toBeInTheDocument();
  });
  it("add remove item from storage", () => {
    render(<AddRemoveList {...defaultProps} />);
    const el = document.querySelector(".left-side");
    const item = document.querySelector(".button-container span");
    fireEvent.click(el);
    expect(item.textContent).toBe("Remove my read list");
  });
});
