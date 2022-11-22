import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_THREE_MORE_ITEMS } from "../../../apollo";
import "./style.scss";

export default function MoreItems({ tags }) {
  const [variables, setVariables] = useState({ tags: tags });
  const [doQuery, { data, loading }] = useLazyQuery(GET_THREE_MORE_ITEMS, {
    variables: variables,
  });

  return (
    <div className="get-more">
      <button onClick={() => doQuery()}>Show more clothes</button>
      {!loading && data && <p>loaded</p>}
    </div>
  );
}
