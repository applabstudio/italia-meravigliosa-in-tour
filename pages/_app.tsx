import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Image from "next/image"
import Navbar from "../components/Navbar"
import NextNProgress from "nextjs-progressbar"
import Footer from "../components/Footer"
import { NextSeo } from "next-seo"
import WishContext, {
  WishContextProps,
  EventProps,
} from "../components/context/WishContext"
import _ from "lodash"
import { useState } from "react"
import Script from "next/script"
import PopupOptin from "../components/PopupOptin"

function MyApp({ Component, pageProps }: AppProps) {
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
        title="Italia in Tour - Trova Eventi"
        description="Trova eventi meravigliosi in tutta Italia alla portata di un click."
      />

      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-1708355893696705"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />

      <Script
        strategy="lazyOnload"
        src={"https://www.googletagmanager.com/gtag/js?id=G-BZ2LLF0XHC"}
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-BZ2LLF0XHC');
          `}
      </Script>

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
        <div className="min-h-screen">
          <Navbar />
          <Component {...pageProps} />
          <div style={{flexDirection:'row', justifyContent:'space-between'}} className="col-span-12 box-border flex flex-col px-4 xl:col-span-12 botton_navbar">
          <div
            className="footer-grid xl:col-span-2"
            style={{ borderLeft: "none" }}
          >
            <Image
              src="/images/home.png"
              objectFit="contain"
              layout="intrinsic"
              width={37}
              height={37}
              alt="hand"
              className="homeIcon"
            />
            <p className="text-center" style={{ color: "#F56606" }}>
              Home
            </p>
          </div>
          <div className="footer-grid xl:col-span-3">
            <Image
              src="/images/info.png"
              objectFit="contain"
              layout="intrinsic"
              width={34}
              height={34}
              alt="hand"
              className="infoIcon"
            />
            <p className="text-center">Chi siamo</p>
          </div>
          <div className="footer-grid xl:col-span-3">
            <Image
              src="/images/work.png"
              objectFit="contain"
              layout="intrinsic"
              width={34}
              height={34}
              alt="hand"
              className="workIcon"
            />
            <p className="text-center">Lavora con noi</p>
          </div>
          <div className="footer-grid xl:col-span-2">
            <Image
              src="/images/heart.png"
              objectFit="contain"
              layout="intrinsic"
              width={37}
              height={37}
              alt="hand"
              className="heartIcon"
            />
            <p className="text-center">Wishlist</p>
          </div>
          <div className="footer-grid xl:col-span-2">
            <Image
              src="/images/search.png"
              objectFit="contain"
              layout="intrinsic"
              width={37}
              height={37}
              alt="hand"
              className="searchIcon"
            />
            <p className="text-center">Cerca</p>
          </div>
          </div>
        </div>
        {/* <Footer /> */}
    
 
      </div>
    </WishContext.Provider>
  )
}

export default MyApp
