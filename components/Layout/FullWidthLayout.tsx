import React from "react";
import { NavBar } from "./NavBar";
export default function FullWidthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}
