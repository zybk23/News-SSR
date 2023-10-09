"use client";

import "./style.scss";

interface propTypes {
  hour: string;
  articleSourceId: string;
  articlesInStorage: any;
  setArticlesInStorage: (item: any) => void;
}

const AddRemoveList = ({
  hour,
  articleSourceId,
  articlesInStorage,
  setArticlesInStorage,
}: propTypes) => {
  const handleAddRemoveReadList = () => {
    const readList = window.localStorage.getItem("readList");
    let arr: any = [];
    if (readList) {
      arr = JSON.parse(readList);
    }
    const isArticleIdExist = arr.find((x: string) => x === articleSourceId);
    if (isArticleIdExist) {
      arr = arr.filter((item: string) => item !== articleSourceId);
    } else {
      arr.push(articleSourceId);
    }
    if (arr) {
      setArticlesInStorage(arr);
    }
    window.localStorage.setItem("readList", JSON.stringify(arr));
  };
  const isArticlesExistInStorage = articlesInStorage.includes(articleSourceId);
  return (
    <div className="button-container">
      <div onClick={handleAddRemoveReadList} className="left-side">
        <img
          src={require(`/images/${
            isArticlesExistInStorage ? "delete" : "add"
          }.png`)}
          alt=""
        />
        <span>{isArticlesExistInStorage ? "Remove" : "Add"} my read list</span>
      </div>
      <span className="hour">{hour}</span>
    </div>
  );
};

export default AddRemoveList;
