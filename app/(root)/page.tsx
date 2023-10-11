import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { getNews } from "../../store/dataSlice";
import { Container, Filters, NewsCart } from "../../components";
import Search from "../../components/Search";
import "./style.scss";
import store from "../../store";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#052c54",
};

const News = async () => {
  await store.dispatch(getNews());

  const sources = await store.getState().dataSlice.sources;

  return (
    <div className="news-container">
      <Container>
        <>
          <Filters categories={store.getState().dataSlice.categories} />
          <div className="search-area-container">
            <img src="/images/search.png" alt="" />
            <Search />
          </div>
          <div className="divider" />
          <ClipLoader
            loading={store.getState().dataSlice.isSourcesLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <NewsCart sources={sources} />
        </>
      </Container>
    </div>
  );
};

export default News;
