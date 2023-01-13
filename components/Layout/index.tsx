import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>Navbar</nav>
      <main className="container">{children}</main>
      <footer>Footer</footer>
    </>
  );
}
