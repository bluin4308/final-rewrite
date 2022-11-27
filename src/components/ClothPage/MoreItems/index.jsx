import React from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_THREE_MORE_ITEMS } from "../../../apollo";
import "./style.scss";

export default function MoreItems({ tags }) {
  const [doQuery, { data, loading }] = useLazyQuery(GET_THREE_MORE_ITEMS, {
    variables: {
      tags: tags,
    },
  });

  return (
    <div className="get-more">
      <button disabled={data || loading} onClick={() => doQuery()}>
        Show more similar clothes
      </button>

      {/* DATA LOADED */}
      {!loading && data && (
        <div className="cards">
          {data.clothes.nodes.map((item, index) => {
            return (
              <div className="card" key={index}>
                <img
                  src={item.featuredImage.node.sourceUrl}
                  alt={item.featuredImage.node.title}
                />
                <Link to={"../all/" + item.id} className="title">
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
