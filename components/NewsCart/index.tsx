"use client";

import { useRouter } from "next/navigation";
import "./style.scss";
import { sourcesTypes } from "../../helpers/types";
import { getArticles } from "../../store/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const NewsCart = ({ sources }: { sources: sourcesTypes[] }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    selectedCategories,
    search,
  }: { selectedCategories: string[]; search: string } = useAppSelector(
    (state) => state.dataSlice
  );

  const handleOpenNewsDetail = (name: string) => {
    const modifiedName = name.split(" ").join("-");
    router.push(`/newsList/${modifiedName}`);
    window.localStorage.setItem("sourceName", name);
  };
  let filteredSources = [...sources];

  if (selectedCategories.length > 0) {
    filteredSources = filteredSources.filter((x: sourcesTypes) => {
      return selectedCategories.find((k) => k === x.category);
    });
  }

  filteredSources = filteredSources.filter((item: sourcesTypes) => {
    return item?.name?.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });
  return (
    <div className="news-item-container">
      {filteredSources.map((source) => (
        <div
          key={source.id}
          className="cart-container"
          onClick={() => handleOpenNewsDetail(source.name)}
        >
          <span className="title">{source.name}</span>
          <div className="description-area">
            <span>{source.description}</span>
            <img src="/images/next.png" alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCart;
