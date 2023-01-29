import React from "react";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
export default function FullWidthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className='content'>{children}</main>
      <Footer />
    </>
  );
}
