import NextAuthProvider from "@/components/NextAuthProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
