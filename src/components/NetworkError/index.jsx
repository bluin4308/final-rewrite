import React from "react";
import "./style.scss";

export default function NetworkError() {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="warning">
      <p>Connection Lost. Please, reload the page</p>
      <button onClick={() => reload()}>Reload</button>
    </div>
  );
}
