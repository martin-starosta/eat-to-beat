import "../styles/globals.css";
import type {ReactElement, ReactNode} from "react";
import type {NextPage} from "next";
import type {AppProps} from "next/app";
import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "../styles/theme";
import Layout from "../components/Layout";
import "@fontsource/dancing-script/700.css";
import {QueryClient, QueryClientProvider} from "react-query";
import {SessionProvider} from "next-auth/react"

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({
                                Component, pageProps: {
        session, ...pageProps
    }
                            }: AppPropsWithLayout) {
    const renderWithLayout =
        Component.getLayout ||
        function (page) {
            return <SessionProvider session={pageProps.session}><Layout>{page}</Layout></SessionProvider>;
        };

    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    {renderWithLayout(<Component {...pageProps} />)}
                </ChakraProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
