import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchBar from "../layout/SearchBar";

export default function SidebarLayout() {
  const { pathname } = useLocation();

  const hideSearchOn = ["/welcome"];

  const showSearch = !hideSearchOn.includes(pathname);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, background: "#0f1113", display: "flex", flexDirection: "column" }}>
        
        {showSearch && (
          <div style={{ padding: "15px", borderBottom: "1px solid #1a1d21", background: "#171C26" }}>
            <SearchBar />
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
