"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../store/hooks";
import { Button, AddRemoveList } from "../../../components";
import { articlesTypes } from "../../../helpers/types";
import moment from "moment";
import "./style.scss";

const NewsDetail = () => {
  const router = useRouter();
  const [articlesInStorage, setArticlesInStorage] = useState(
    typeof window !== "undefined" &&
      JSON.parse(window.localStorage.getItem("readList") || "[]")
  );
  const { selectedArticle }: { selectedArticle: articlesTypes } =
    useAppSelector((state) => state.dataSlice);

  const handleGoBackToListPage = () => {
    router.back();
  };

  return (
    <div className="detail-page-container">
      <div className="detail-container">
        <span className="detail-title">{selectedArticle?.title}</span>
        <img className="detail-img" src={selectedArticle?.urlToImage} alt="" />
        <span className="detail-content">{selectedArticle?.content}</span>
        <AddRemoveList
          hour={moment(selectedArticle?.publishedAt).format("hh:mm")}
          articleSourceId={
            selectedArticle?.source?.id + "-" + selectedArticle?.id
          }
          articlesInStorage={articlesInStorage}
          setArticlesInStorage={setArticlesInStorage}
        />
        <div style={{ marginTop: "45px" }}>
          <Button text="Go to Back" handleGoBack={handleGoBackToListPage} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
