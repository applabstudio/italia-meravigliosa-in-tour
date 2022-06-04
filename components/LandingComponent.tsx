// @ts-nocheck

import Image from "next/image"
import type { NextPage } from "next"
import { SearchBar } from "../components/common/SearchBar"
import Event from "../components/Event"
import React, { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"
import Contatti from "./Contatti"
import { FaAngleDown } from "react-icons/fa"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "react-perfect-scrollbar/dist/css/styles.css"
import Link from "next/link"
import Input from "./common/Input"
import PopupOptin from "./PopupOptin"
import Script from "next/script"

const Section = ({
  titolo,
  slug,
  eventi,
}: {
  titolo: string
  slug: string
  eventi: any
}) => (
  <div className="col-span-12 px-4">
    <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
      {titolo}
    </h4>

    <br />

    <Swiper
      slidesPerView={1}
      breakpoints={{
        968: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={30}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {eventi
        ?.filter((doc) => doc?.luogo === slug)
        ?.map((doc) => (
          <SwiperSlide key={doc?.id} className="mb-8">
            <Event
              image={doc?.copertina}
              heading={doc?.titolo}
              location={doc?.luogo}
              btnText="Scopri di più"
              to={`/eventi/${doc?.slug}`}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  </div>
)

const LandingComponent = ({ slug }: { slug: any }) => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [listaEventi, setListaEventi] = useState<any[]>([])
  const [categorie, setCategorie] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento"
        ? setListaEventi((listaEventi) => [...listaEventi, d.data()])
        : setCategorie((categorie) => [...categorie, d.data()])
    })
  }, [data])

  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})

    const mapScript = document.createElement("script")
    const countryScript = document.createElement("script")
    // const clickScript = document.createElement("script")

    mapScript.src = "/scripts/mapdata.js"
    countryScript.src = "/scripts/countrymap.js"
    mapScript.async = true
    countryScript.async = true

    // clickScript.type = "text/javascript"
    // clickScript.innerHTML = `simplemaps_worldmap.hooks.zoomable_click_region = function(id){
    //       alert(simplemaps_worldmap_mapdata.state_specific[id].name);
    //     }`

    document.body.appendChild(mapScript)
    document.body.appendChild(countryScript)
    // document.body.appendChild(clickScript);

    return () => {
      document.body.removeChild(mapScript)
      document.body.removeChild(countryScript)
      // document.body.removeChild(clickScript);
    }
  }, [])

  console.log("These are the events ", listaEventi)

  return (
    <>
      <PopupOptin />
      <div className="mx-auto max-w-6xl">
        <main className="grid w-full grid-cols-12 space-y-12 space-x-4">
          <div className="xl:col-span-3"></div>
          <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-6">
            <h2 className="text-center text-4xl font-bold">
              Il portale delle meraviglie
            </h2>
            <br />
            <br />
            <br />
            <div className="col-span-12 space-y-10 xl:col-span-6">
              <div id="map" className="w-full" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -30,
                }}
              >
                <Image
                  src="/images/hand1.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={100}
                  height={100}
                  alt="hand"
                />
              </div>
            </div>
          </div>
          <div className="xl:col-span-3"></div>
          {listaEventi.filter((doc) => doc?.luogo === slug).length == 0 && (
            <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
              <p
                className="text-center"
                style={{ fontWeight: "700", fontSize: 18 }}
              >
                Clicca su una <span style={{ color: "red" }}>regione</span> che
                vuoi esplorare
              </p>
              <p
                className="text-center"
                style={{ fontWeight: "600", fontSize: 36 }}
              >
                Guida alla scoperta del Bel Paese
              </p>
              <p
                className="text-center"
                style={{ fontWeight: "700", fontSize: 80 }}
              >
                ITALIA MERAVIGLIOSA
              </p>
              <p
                className="text-center"
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  fontFamily: "roboto",
                }}
              >
                Siamo partiti dalla nostra pagina Facebook a Gennaio del 2020,
                con l’intenzione di mostrarvi le meraviglie nascoste del nostro
                paese
              </p>
              <p
                className="text-center"
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  fontFamily: "roboto",
                }}
              >
                Oggi con oltre 250 mila follower e tante foto di località
                pubblicate e milioni di visualizzazioni, abbiamo deciso di
                creare una redazione di “Italia Meravigliosa” e di creare questo
                portale, perchè possa guidarvi in luoghi meravigliosi da
                esplorare, buon viaggio a tutti voi.
              </p>
            </div>
          )}
          {listaEventi.filter((doc) => doc?.luogo === slug).length > 0 && (
            <Section
              titolo={`Eventi a ${slug}`}
              slug={slug}
              eventi={listaEventi}
            />
          )}
          <div className="col-span-12 flex flex-col px-4">
            <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
              Categorie
            </h4>

            <br />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
              {categorie?.length > 0 &&
                categorie?.map((categoria) => (
                  <p
                    key={categoria?.titolo}
                    className="w-full rounded-md bg-primary-100 px-2 text-center text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
                  >
                    <Link href={`/categoria/${categoria?.titolo}`}>
                      <span className="flex cursor-pointer items-center justify-center space-x-2">
                        <img
                          className="h-4 w-4"
                          src={categoria?.icona}
                          alt=""
                        />
                        <p>{categoria?.titolo}</p>
                      </span>
                    </Link>
                  </p>
                ))}
            </div>
          </div>
          <div className="xl:col-span-5" style={{ alignSelf: "center" }}>
            <p
              className="text"
              style={{ fontWeight: "600", fontSize: 33, width: "66%" }}
            >
              SEGUICI SU FACEBOOK, SIAMO OLTRE 250 MILA
            </p>
            <div style={{ display: "flex" }}>
              <Image
                src="/images/fb.png"
                objectFit="contain"
                layout="intrinsic"
                width={25}
                height={25}
                alt="hand"
              />
              <p style={{ fontSize: 16, color: "#656464", marginLeft: 10 }}>
                https://www.facebook.com/istagram.paoloartista1/
              </p>
            </div>
          </div>
          <div className="xl:col-span-1"></div>
          <div className="xl:col-span-6">
            <div className="grid w-full grid-cols-12 space-x-4">
              <div
                className="xl:col-span-7 text-right"
                style={{ alignSelf: "center" }}
              >
                <Image
                  src="/images/image1.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={250}
                  height={300}
                  alt="hand"
                />
              </div>
              <div className="xl:col-span-5">
                <Image
                  src="/images/image2.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={300}
                  height={300}
                  alt="hand"
                />
                <Image
                  src="/images/image3.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={300}
                  height={300}
                  alt="hand"
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
            <p
              className="text-center"
              style={{ fontWeight: "700", fontSize: 80 }}
            >
              1M+ Utenti Giornalieri
            </p>
          </div>
          <div className="xl:col-span-3 infoBox" style={{ borderLeft: "none" }}>
            <p className="text-center infoGray">FOTO</p>
            <p className="text-center">+50K</p>
          </div>
          <div className="xl:col-span-3 infoBox">
            <p className="text-center infoGray">INTERAZIONI</p>
            <p className="text-center">+15M</p>
          </div>
          <div className="xl:col-span-3 infoBox">
            <p className="text-center infoGray" style={{ width: "50%" }}>
              LUOGHI MERAVIGLIOSI
            </p>
            <p className="text-center">+1000</p>
          </div>
          <div
            className="xl:col-span-3 infoBox"
            style={{ borderRight: "none" }}
          >
            <p className="text-center infoGray">COLLABORAZIONI</p>
            <p className="text-center">+50</p>
          </div>
        </main>
      </div>
      <div
        className="mx-auto max-w-7xl"
        style={{
          width: "100%",
          background: "black",
          height: 350,
          maxWidth: "85rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="text-center"
      >
        <p
          style={{
            color: "white",
            fontSize: 40,
            paddingTop: 50,
            paddingBottom: 10,
          }}
        >
          MISSION
        </p>
        <p
          className="infoGray"
          style={{
            width: "80%",
            textAlign: "justify",
            fontFamily: "Inter",
            fontSize: 22,
            fontStyle: "italic",
          }}
        >
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.”
        </p>
        <p
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "Lato",
          }}
        >
          Paolo Artista
        </p>
        <p
          className="infoGray"
          style={{ fontSize: 16, fontWeight: "500", fontFamily: "Inter" }}
        >
          CEO & Founder Italia Meravigliosa
        </p>
      </div>
      <div className="mx-auto max-w-7xl">
        <main className="grid w-full grid-cols-12 space-y-12 space-x-4">
          {/* <div className="col-span-12 box-border flex flex-col px-8">
            <div className="h-52 w-full overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-100 xl:h-80">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)) , url('https://siviaggia.it/wp-content/uploads/sites/2/2021/04/malcesine-passeggiate-italia.jpg')",
                }}
                className="relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
              >
                <h1 className="mb-2 text-xl font-extrabold text-white xl:text-5xl">
                  Italia Meravigliosa in Tour
                </h1>

                <p className="px-4 text-center text-gray-200 xl:text-lg">
                  Dove vuoi andare oggi? Scorri in Basso per scoprire nuovi
                  eventi!
                </p>

                <FaAngleDown className="absolute bottom-10 text-2xl text-white" />
              </div>
            </div>
          </div> */}

          {/* <div className="col-span-12 bg-gray-100">
            <p className="mt-2 ml-2 rounded-lg text-gray-500">Pubblicità</p>

            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-1708355893696705"
              data-ad-slot="9487119343"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div> */}

          {/* <Section titolo="Eventi a Siena" slug="siena" eventi={listaEventi} />
          <Section
            titolo="Eventi a Venezia"
            slug="venezia"
            eventi={listaEventi}
          />
          <Section titolo="Eventi a Roma" slug="roma" eventi={listaEventi} />

          <div className="col-span-12 bg-gray-100">
            <p className="mt-2 ml-2 rounded-lg text-gray-500">Pubblicità</p>

            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-1708355893696705"
              data-ad-slot="3464636478"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div> */}

          <div className="col-span-12 px-4">
            <h4
              className="text-center text-4xl font-bold text-gray-800 md:text-left"
              style={{color:'black', fontStyle: "normal" }}
            >
              Contatti
            </h4>

            <br />

            <Contatti />
          </div>

          <div className="col-span-12 rounded-lg bg-secondary-500 p-6">
            <h4 className="text-center text-xl font-bold text-white md:text-left lg:text-3xl">
              Vuoi ricevere più informazioni?
              <br />
              Iscriviti alla Newsletter:
            </h4>

            <br />

            <div className="flex w-full flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
              <Input
                id="newsletter"
                label="Newsletter"
                type="text"
                placeholder="La tua email..."
                showLabel={false}
                className="w-full lg:w-1/3"
              />

              <button
                type="submit"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border-2 border-white p-4 px-6 py-3 font-medium text-white shadow-md outline-none ring-secondary-500 ring-offset-4 transition duration-300 ease-out focus:ring-2 lg:w-fit"
              >
                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-white text-secondary-500 duration-300 group-hover:translate-x-0">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="ease absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">
                  Iscriviti
                </span>
                <span className="invisible relative">Iscriviti</span>
              </button>
            </div>
          </div>

          <br />
          <br />
        </main>
      </div>
    </>
  )
}

export default LandingComponent