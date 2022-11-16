import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export default function Navigation() {
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
    </div>
  );
}
