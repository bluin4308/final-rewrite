import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export default memo(function Navigation() {
  return (
    <div className="navigation">
      <NavLink
        to="../sale"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        sale
      </NavLink>
      <NavLink
        to="../jeans"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        jeans
      </NavLink>
      <NavLink
        to="../jackets"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        jackets
      </NavLink>
      <NavLink
        to="../all"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        all clothes
      </NavLink>
    </div>
  );
});
