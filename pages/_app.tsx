import { useState, useEffect, useRef } from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Image from "next/image"
import Navbar from "../components/Navbar"
import { SearchBar } from "../components/common/SearchBar";
import NextNProgress from "nextjs-progressbar"
import Footer from "../components/Footer"
import { NextSeo } from "next-seo"
import WishContext, {
  WishContextProps,
  EventProps,
} from "../components/context/WishContext"
import _ from "lodash"

import TabBar from "../components/TabBar/";

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  const [items, setItems] = useState<EventProps[]>([])

  const remove = (id: string) => {
    let i = _.reject(items, (item) => {
      return item.id === id
    })
    setItems(i)
  }

  const add = (event: EventProps) => {
    let i = _.union(items, [event])
    setItems(i)
  }

  const wishContext: WishContextProps = {
    items: items,
    add: add,
    remove: remove,
  }

  return (
    <WishContext.Provider value={wishContext}>
      <NextSeo
        title="Italia Meravigliosa in tour"
        description="Trova luoghi meravigliosi in tutta Italia alla portata di un click."
      />

      {/* <Script
        id="Adsense-id"
        data-ad-client="ca-pub-1708355893696705"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      /> */}

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

      <div className="selection:bg-primary-400 selection:text-white">
        <div className="min-h-screen"
          style={{
            minHeight: 'calc(100vh - 90px)',
            maxHeight: 'calc(100vh - 220px)',
            paddingBottom: 90
          }}>
          <Navbar />


          {/* <div className="items-center space-x-8 search-bar w-full">
            <SearchBar />
          </div> */}


          <Component {...pageProps} />

        </div>

        <TabBar />

      </div>
    </WishContext.Provider>
  )
}

export default MyApp
