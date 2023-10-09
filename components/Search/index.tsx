"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearch } from "../../store/dataSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.dataSlice);
  const handleSearchField = (e: any) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <input
      placeholder="search news"
      type="text"
      className="search-input"
      value={search}
      onChange={handleSearchField}
    />
  );
};

export default Search;
