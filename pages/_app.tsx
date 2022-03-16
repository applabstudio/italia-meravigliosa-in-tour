import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Navbar from "../components/Navbar"
import NextNProgress from "nextjs-progressbar"
import Footer from "../components/Footer"
import { NextSeo } from "next-seo"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Italia in Tour - Trova Eventi"
        description="Trova eventi meravigliosi in tutta Italia alla portata di un click."
      />

      <NextNProgress
        color="#f87171"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />

      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen selection:bg-primary-400 selection:text-white">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  )
}

export default MyApp
