import React from "react";
import { Container } from "@chakra-ui/react";
import { NavBar } from "./NavBar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="container">
        <Container maxW="6xl">{children}</Container>
      </main>
      <footer>Footer</footer>
    </>
  );
}
