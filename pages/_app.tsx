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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";


function MyApp({ Component, pageProps }: AppProps) {
  const [items, setItems] = useState<EventProps[]>([])
  const [homeHover, setHomeHover] = useState<any>("home")
  const [infoHover, setInfoHover] = useState<any>("info")
  const [workHover, setWorkHover] = useState<any>("work")
  const [heartHover, setHeartHover] = useState<any>("heart")
  const [searchHover, setSearchHover] = useState<any>("search")

const [whishlistcard, setwhishlistcard] = useState(false)

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
  
           <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.7/dist/flowbite.min.css" />
          <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
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

          <Link  href=""  >
            <a>

              <div   onClick={()=>{ setwhishlistcard(true)  }} className="footer-grid xl:col-span-2"
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
                <p className="text-center tabText"    >Wishlist  </p>
              </div>

            </a>
          </Link>

                  {whishlistcard ?    
                  <> 
                <div className="background-dilog" > </div>
          <div  className="block  overflow-y-auto   overflow-x-hidden fixed top-0 right-0 left-0 md:top-1/3  md:left-1/3   z-index-card  md:inset-0 h-modal md:h-full">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto  ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button"  onClick={()=>{ setwhishlistcard(false)  }} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
            </button>
            <div className="p-6 ">
                    <h1 className="text-xl f-inter-sm pb-2 " > Wishlist </h1>
                <h3 className="mb-5 text-sm text-grey-main ">Ecco gli eventi che hai aggiunto alla wishlist</h3>
                <h3 className="mb-5 text-lg f-popins-m ">Non hai  aggiunto eventi alla Wishlist</h3>
                <button className=" bg-pink-light px-8 py-3 rounded-lg  text-pink-main f-inter-b " > Fatto </button>
            </div>
        </div>
    </div>
</div>
</>  : "" }

     

          <Link href={""}  >
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
