import React from "react";
import {Container} from "@chakra-ui/react";
import {NavBar} from "./NavBar";
import Footer from "./Footer";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <NavBar/>
            <main className="container content">
                <Container maxW="6xl" py={12}>{children}</Container>
            </main>
            <Footer/>
        </>
    );
}