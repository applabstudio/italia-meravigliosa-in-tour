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
import Link from "next/link"
import './app.css'




function MyApp({ Component, pageProps }: AppProps) {
  const [items, setItems] = useState<EventProps[]>([])
  const [homeHover, setHomeHover] = useState<any>("home")
  const [infoHover, setInfoHover] = useState<any>("info")
  const [workHover, setWorkHover] = useState<any>("work")
  const [heartHover, setHeartHover] = useState<any>("heart")
  const [searchHover, setSearchHover] = useState<any>("search")

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
        description="Trova eventi meravigliosi in tutta Italia alla portata di un click."
      />

      {/* <Script
        id="Adsense-id"
        data-ad-client="ca-pub-1708355893696705"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      /> */}

      {/* TODO Scroll section iside landing when click tab icon bottom navbar */}

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
        <div className="min-h-screen"
          // style={{
          //   minHeight: 'calc(100vh - 90px)',
          //   maxHeight: 'calc(100vh - 220px)',
          //   paddingBottom: 90
          // }}
          
          >
          <Navbar />
          <Component {...pageProps} />

        </div>
        <div
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,

            backgroundColor: "#fff"
          }}
          className="col-span-12 box-border flex flex-col px-4 md:px-10 lg:px-14 xl:col-span-12 botton_navbar"
        >
          <div
            className="footer-grid xl:col-span-2"
            style={{ borderLeft: "none" }}
            onMouseEnter={
              () => {
                setHomeHover("home_hover")
              }
            }
            onMouseLeave={
              () => {
                setHomeHover("home")
              }
            }
          >

            <Image
              src={`/images/${homeHover}.png`}
              objectFit="contain"
              layout="intrinsic"
              width={34}
              height={34}
              alt="home"
              className="homeIcon"
            />
            <p className="text-center tabText" style={{ color: "#F56606" }}>
              Home
            </p>
          </div>

          <Link href="#who-we-are-section">
            <a>
              <div className="footer-grid xl:col-span-3"
                onMouseEnter={
                  () => {
                    setInfoHover("info_hover")
                  }
                }
                onMouseLeave={
                  () => {
                    setInfoHover("info")
                  }
                }
              >
                <Image
                  src={`/images/${infoHover}.png`}
                  objectFit="contain"
                  layout="intrinsic"
                  width={34}
                  height={34}
                  alt="info"
                  className="infoIcon"
                />
                <p className="text-center tabText">Chi siamo</p>
              </div>
            </a>
          </Link>


          <Link href="#work-with-us-section">
            <a>
              <div className="footer-grid xl:col-span-3"
                onMouseEnter={
                  () => {
                    setWorkHover("work_hover")
                  }
                }
                onMouseLeave={
                  () => {
                    setWorkHover("work")
                  }
                }
              >
                <Image
                  src={`/images/${workHover}.png`}
                  objectFit="contain"
                  layout="intrinsic"
                  width={34}
                  height={34}
                  alt="work"
                  className="workIcon"
                />
                <p className="text-center tabText">Lavora con noi</p>
              </div>
            </a>
          </Link>

          <Link href="#wish-list-section" >
            <a>

              <div className="footer-grid xl:col-span-2"
                onMouseEnter={
                  () => {
                    setHeartHover("heart_hover")
                  }
                }
                onMouseLeave={
                  () => {
                    setHeartHover("heart")
                  }
                }
              >
                <Image
                  src={`/images/${heartHover}.png`}
                  objectFit="contain"
                  layout="intrinsic"
                  width={34}
                  height={34}
                  alt="heart"
                  className="heartIcon"
                />
                <p className="text-center tabText">Wishlist</p>
              </div>

            </a>
          </Link>

          <Link href={"#top-section"}>
            <a>
              <div className="footer-grid xl:col-span-2"
                onMouseEnter={
                  () => {
                    setSearchHover("search_hover")
                  }
                }
                onMouseLeave={
                  () => {
                    setSearchHover("search")
                  }
                }
              >
                <Image
                  src={`/images/${searchHover}.png`}
                  objectFit="contain"
                  layout="intrinsic"
                  width={34}
                  height={34}
                  alt="search"
                  className="searchIcon"
                />
                <p className="text-center tabText">Cerca</p>
              </div>

            </a>
          </Link>
        </div>
        {/* <Footer /> */}


      </div>
    </WishContext.Provider>
  )
}

export default MyApp
