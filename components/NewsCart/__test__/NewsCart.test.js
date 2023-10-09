/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/no-node-access */
import NewsCart from "..";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
const defaultProps = {
  sources: [
    {
      id: "abc-news",
      name: "ABC News",
      description:
        "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
      url: "https://abcnews.go.com",
      category: "general",
      language: "en",
      country: "us",
    },
    {
      id: "abc-news-au",
      name: "ABC News (AU)",
      description:
        "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
      url: "http://www.abc.net.au/news",
      category: "general",
      language: "en",
      country: "au",
    },
    {
      id: "al-jazeera-english",
      name: "Al Jazeera English",
      description:
        "News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.",
      url: "http://www.aljazeera.com",
      category: "general",
      language: "en",
      country: "us",
    },
  ],
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
      <NewsCart {...defaultProps} />
    </Provider>
  );
};

jest.mock("axios");

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

describe("NewsCart", () => {
  it("is component rendered", () => {
    render(<AppWrapper />);
    const sourceEl = document.querySelectorAll(".cart-container");
    expect(sourceEl[0]).toBeInTheDocument();
  });

  it("open news detail page", async () => {
    render(<AppWrapper />);
    const singleEl = document.querySelectorAll(".cart-container")[0];
    fireEvent.click(singleEl);
    await waitFor(() => {
      const value = localStorage.getItem("sourceName");
      if (value) {
        expect(value).toBe("ABC News");
      } else {
        expect(value).toEqual(undefined);
      }
    });
  });
});
