/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/no-node-access */
import Filters from "../index";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
const defaultProps = {
  categories: [
    {
      id: 1,
      name: "business",
      count: 7,
    },
    {
      id: 2,
      name: "entertainment",
      count: 8,
    },
    {
      id: 3,
      name: "general",
      count: 41,
    },
  ],
  selectedCategories: ["science", "entertainment"],
};

const initialState = {
  sources: [],
  isSourcesLoading: false,
  categories: [],
  articles: [],
  isArticlesLoaded: false,
  selectedCategories: [],
  selectedArticle: {},
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Filters {...defaultProps} />
    </Provider>
  );
};

jest.mock("axios");

const mockedUsedNavigate = jest.fn();

describe("Categories", () => {
  it("is Filter area rendered", () => {
    render(<AppWrapper />);
    const filterEl = document.querySelector(".filter-area-container");
    expect(filterEl).toBeInTheDocument();
  });

  it("select or unselectCategories", () => {
    render(<AppWrapper />);
    const itemEl = document.querySelectorAll(".filter-item-container")[1];
    fireEvent.click(itemEl);
    expect(itemEl).toHaveClass("selected");
    const itemEl2 = document.querySelectorAll(".filter-item-container")[2];
    fireEvent.click(itemEl2);
    expect(itemEl2).not.toHaveClass("selected");
  });
});
