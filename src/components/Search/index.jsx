import React, { useEffect } from "react";
import useStore, { useTitle } from "../../store";
import { useQuery } from "@apollo/client";
import { SEARCH_ITEMS } from "../../apollo";
import Navigation from "../Navigation";
import "./style.scss";

export default function Search() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Search");
  }, []);

  return (
    <div className="search-layout">
      <Navigation />
      <div className="_80percent">
        <p>search results</p>
      </div>
    </div>
  );
}
