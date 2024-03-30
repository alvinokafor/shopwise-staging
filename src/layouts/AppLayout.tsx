import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Footer } from "../partials";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <main className=" min-h-screen">
      {!location.pathname.includes("login") && <Navbar />}
      {children}

      {!location.pathname.includes("login") && <Footer />}
    </main>
  );
}
