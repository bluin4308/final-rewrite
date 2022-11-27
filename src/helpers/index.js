export function isSale(item) {
  return item.tags.nodes.findIndex((item) => item.name === "sale") > 0;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
