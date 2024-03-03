import Layout from "@/components/Layout";
import FavoriteMealsProvider from "@/providers/FavoriteMealsProvider";
import PreviousResultProvider from "@/providers/PreviousResultProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => (
  <PreviousResultProvider>
    <FavoriteMealsProvider>{children}</FavoriteMealsProvider>
  </PreviousResultProvider>
);
