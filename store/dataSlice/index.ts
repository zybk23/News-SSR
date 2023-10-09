import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl, apiKey } from "../../helpers/constants";
import {
  sourcesTypes,
  categoriesTypes,
  articlesTypes,
} from "../../helpers/types";
import moment from "moment";

export const getNews = createAsyncThunk("data/getNews", async () => {
  const response = await fetch(
    `https://newsapi.org/v2/sources?apiKey=c2ea8b306ade46959013772f6e5ca9bd`
  )
    .then((res) => res.json())
    .then((result) => result);
  return response.sources;
});

export const getArticles = createAsyncThunk(
  "data/getArticles",
  async (articleName: string) => {
    const response = await axios.get(
      `${baseApiUrl}/top-headlines?q=${articleName}&apiKey=${apiKey}`
    );
    return response.data.articles;
  }
);

export interface stateType {
  sources: sourcesTypes[];
  isSourcesLoading: boolean;
  categories: categoriesTypes[];
  articles: articlesTypes[];
  isArticlesLoaded: boolean;
  selectedCategories: string[];
  selectedArticle: articlesTypes;
  search: string;
}

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    sources: [],
    isSourcesLoading: false,
    categories: [],
    articles: [],
    isArticlesLoaded: false,
    selectedCategories: [],
    selectedArticle: {},
    search: "",
  },
  reducers: {
    setSelectedCategories: (
      state: stateType,
      action: PayloadAction<string>
    ) => {
      const isCategoryExist = state.selectedCategories.find(
        (item) => item === action.payload
      );
      if (isCategoryExist) {
        state.selectedCategories = state.selectedCategories.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedCategories = [
          ...state.selectedCategories,
          action.payload,
        ];
      }
    },
    setSelectedArticles: (
      state: stateType,
      action: PayloadAction<articlesTypes>
    ) => {
      state.selectedArticle = action.payload;
    },
    setSearch: (state: stateType, action: PayloadAction<any>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<stateType>) => {
    builder.addCase(
      getNews.fulfilled,
      (state: stateType, action: PayloadAction<sourcesTypes[]>) => {
        const newsLanguageWithEn = action.payload.filter(
          (item) => item.language === "en"
        );
        const categories = newsLanguageWithEn.map((item) => item.category);
        const uniqCategories = categories
          .filter((value, index, array) => array.indexOf(value) === index)
          .sort();

        function CountSameElementInArray(arr: string[]) {
          const countElement = [];
          arr.sort();

          var current = null;
          var cnt = 0;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== current) {
              if (cnt > 0) {
                countElement.push(cnt);
              }
              current = arr[i];
              cnt = 1;
            } else {
              cnt++;
            }
          }
          if (cnt > 0) {
            countElement.push(cnt);
          }
          return countElement;
        }

        const countCategories = CountSameElementInArray(categories);

        const allCategoriesWithCount = [];

        for (let i = 0; i < uniqCategories.length; i++) {
          allCategoriesWithCount.push({
            id: i + 1,
            name: uniqCategories[i],
            count: countCategories[i],
          });
        }

        state.sources = newsLanguageWithEn;
        state.isSourcesLoading = false;
        state.categories = allCategoriesWithCount;
      }
    );
    builder.addCase(getNews.pending, (state: stateType, action) => {
      state.isSourcesLoading = true;
    });
    builder.addCase(getNews.rejected, (state: stateType, action) => {
      state.isSourcesLoading = false;
    });
    builder.addCase(
      getArticles.fulfilled,
      (state: stateType, action: PayloadAction<sourcesTypes[]>) => {
        let modifiedArticles = [];

        modifiedArticles = action.payload.sort(
          (a: any, b: any) =>
            moment(b.publishedAt).unix() - moment(a.publishedAt).unix()
        );

        modifiedArticles = modifiedArticles.map((item, index) => {
          return { ...item, id: index + 1 };
        });

        state.articles = modifiedArticles;
        state.isArticlesLoaded = false;
      }
    );
    builder.addCase(getArticles.pending, (state: stateType, action) => {
      state.isArticlesLoaded = true;
    });
    builder.addCase(getArticles.rejected, (state: stateType, action) => {
      state.isArticlesLoaded = false;
    });
  },
});

export const { setSelectedCategories, setSelectedArticles, setSearch } =
  dataSlice.actions;

export default dataSlice.reducer;
