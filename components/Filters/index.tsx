"use client";

import React from "react";
import "./style.scss";
import { categoriesTypes } from "../../helpers/types";
import { setSelectedCategories } from "../../store/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Filters = ({ categories }: { categories: categoriesTypes[] }) => {
  const dispatch = useAppDispatch();

  const selectedCategories: string[] = useAppSelector(
    (state) => state?.dataSlice?.selectedCategories
  );

  const handleSelectCategories = (name: string) => {
    dispatch(setSelectedCategories(name));
  };
  return (
    <div className="filter-container">
      <div className="title-container">
        <span className="title">News</span>
      </div>
      <div className="filter-area-container">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleSelectCategories(category.name)}
            className={`filter-item-container ${
              selectedCategories && selectedCategories.includes(category.name)
                ? "selected"
                : ""
            }`}
          >
            <img
              src={`/images/${
                selectedCategories && selectedCategories.includes(category.name)
                  ? "check"
                  : "add"
              }.png`}
              alt=""
            />
            <span className="category-name">{category.name}</span>
            <span>({category.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
