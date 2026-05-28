// src/App.jsx — Routing shell only

import React, { useState } from "react";
import "./App.css";
import { IS_DEMO } from "./supabase.js";
import Site, { CancelPage, ClientPortal } from "./Site.jsx";
import Dashboard from "./Dashboard.jsx";

export default function App() {
  const [page, setPage] = useState("site");
  const params = new URLSearchParams(window.location.search);
  const cancelToken = params.get("token");
  const portalEmail = params.get("email");
  const portalToken = params.get("t");
  const path = window.location.pathname;

  if (path === "/cancel" && cancelToken) return <CancelPage token={cancelToken} />;
  if (path === "/my-bookings" && portalEmail && portalToken) return <ClientPortal email={portalEmail} token={portalToken} />;

  if (page === "dashboard") {
    return (
      <>
        <Dashboard onBack={() => setPage("site")} />
        {IS_DEMO && <div className="nn-demo-banner">Demo Mode — Connect your Supabase project to go live</div>}
      </>
    );
  }

  return (
    <>
      <Site onDash={() => setPage("dashboard")} />
      {IS_DEMO && <div className="nn-demo-banner">Demo Mode — Connect your Supabase project to go live</div>}
    </>
  );
}
