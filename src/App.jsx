// src/App.jsx — Routing shell only
// All logic lives in Site.jsx, Dashboard.jsx, shared.js, and supabase.js

import React, { useState } from "react";
import "./App.css";
import { IS_DEMO } from "./supabase.js";
import Site, { CancelPage, ClientPortal, BookingSuccess } from "./Site.jsx";
import Dashboard from "./Dashboard.jsx";

export default function App() {
  const [page, setPage] = useState("site");
  const params = new URLSearchParams(window.location.search);
  const cancelToken = params.get("token");
  const portalEmail = params.get("email");
  const portalToken = params.get("t");
  const sessionId = params.get("session_id");

  const isCancelPage = window.location.pathname === "/cancel" && cancelToken;
  const isPortalPage = window.location.pathname === "/my-bookings" && portalEmail && portalToken;
  const isSuccessPage = window.location.pathname === "/booking-success" && sessionId;

  if (isCancelPage) return <CancelPage token={cancelToken} />;
  if (isPortalPage) return <ClientPortal email={portalEmail} token={portalToken} />;
  if (isSuccessPage) return <BookingSuccess params={params} />;

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
