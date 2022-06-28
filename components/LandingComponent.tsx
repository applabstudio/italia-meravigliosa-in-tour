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
import { FaArrowCircleRight, FaEnvelope, FaHome } from "react-icons/fa"
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
import Dilogbox from "./Dilogbox"

const regions = {
  "0": {
    states: ["ITA5418", "ITA5419", "ITA5420", "ITA5421"],
    name: "Abruzzo",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "1": {
    states: ["ITA5389", "ITA5390"],
    name: "Basilicata",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "2": {
    states: ["ITA5391", "ITA5392", "ITA5393", "ITA5394", "ITA5395"],
    name: "Calabria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "3": {
    states: ["ITA5396", "ITA5397", "ITA5398", "ITA5399", "ITA5400"],
    name: "Campania",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "4": {
    states: [
      "ITA5358",
      "ITA5359",
      "ITA5360",
      "ITA5361",
      "ITA5362",
      "ITA5363",
      "ITA5364",
      "ITA5365",
      "ITA5366",
    ],
    name: "Emilia-Romagna",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "5": {
    states: ["ITA5455", "ITA5456", "ITA5457", "ITA5458"],
    name: "Friuli-Venezia Giulia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "6": {
    states: ["ITA5422", "ITA5423", "ITA5424", "ITA5425", "ITA5426"],
    name: "Lazio",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "7": {
    states: ["ITA5367", "ITA5368", "ITA5369", "ITA5370"],
    name: "Liguria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "8": {
    states: [
      "ITA5443",
      "ITA5444",
      "ITA5445",
      "ITA5446",
      "ITA5447",
      "ITA5448",
      "ITA5449",
      "ITA5450",
      "ITA5451",
      "ITA5452",
      "ITA5453",
      "ITA5454",
    ],
    name: "Lombardia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "9": {
    states: ["ITA5427", "ITA5428", "ITA5429", "ITA5430", "ITA5431"],
    name: "Marche",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "10": {
    states: ["ITA5401", "ITA5402"],
    name: "Molise",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "11": {
    states: [
      "ITA5434",
      "ITA5435",
      "ITA5436",
      "ITA5437",
      "ITA5438",
      "ITA5439",
      "ITA5440",
      "ITA5441",
    ],
    name: "Piemonte",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "12": {
    states: ["ITA5403", "ITA5404", "ITA5405", "ITA5406", "ITA5407", "ITA5408"],
    name: "Puglia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "13": {
    states: [
      "ITA5371",
      "ITA5372",
      "ITA5373",
      "ITA5374",
      "ITA5375",
      "ITA5376",
      "ITA5377",
      "ITA5378",
    ],
    name: "Sardegna",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "14": {
    states: [
      "ITA5409",
      "ITA5410",
      "ITA5411",
      "ITA5412",
      "ITA5413",
      "ITA5414",
      "ITA5415",
      "ITA5416",
      "ITA5417",
    ],
    name: "Sicilia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "15": {
    states: [
      "ITA5379",
      "ITA5380",
      "ITA5381",
      "ITA5382",
      "ITA5383",
      "ITA5384",
      "ITA5385",
      "ITA5386",
      "ITA5387",
      "ITA5388",
    ],
    name: "Toscana",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "16": {
    states: ["ITA5459", "ITA5460"],
    name: "Trentino-Alto Adige",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "17": {
    states: ["ITA5432", "ITA5433"],
    name: "Umbria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "18": {
    states: ["ITA5442"],
    name: "Valle d'Aosta",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
  "19": {
    states: [
      "ITA5461",
      "ITA5462",
      "ITA5463",
      "ITA5464",
      "ITA5465",
      "ITA5466",
      "ITA5467",
    ],
    name: "Veneto",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
  },
}

const Section = ({
  titolo,
  slug,
  eventi,
  region,
}: {
  titolo: string
  slug: string
  eventi: any
  region: string
}) => {
  console.log(
    "THis is the filtered region",
    eventi?.filter((doc) => doc?.luogo === slug || doc?.region === region)
  )
  return (
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
          ?.filter((doc) => doc?.luogo === slug || doc?.region === region)
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
}
const LandingComponent = ({ slug }: { slug: any }) => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [listaEventi, setListaEventi] = useState<any[]>([])
  const [categorie, setCategorie] = useState<any[]>([])
  const [region, setRegion] = useState<string>(null)

  const isMounted = useIsMounted()

  useEffect(() => {
    if (isMounted) {
      const e = document.getElementById("map_inner")
      if (e) {
        e.getElementsByTagName("div")[0].remove()
      }
    }
  }, [isMounted])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento"
        ? setListaEventi((listaEventi) => [...listaEventi, d.data()])
        : setCategorie((categorie) => [...categorie, d.data()])
    })
  }, [data])

  useEffect(() => {
    // ;(window.adsbygoogle = window.adsbygoogle || []).push({})

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
      <div className=" ml-auto mr-auto w-11/12 " id="top-section">
        <main className="grid w-full grid-cols-12 space-y-12 space-x-4">
          <div className="xl:col-span-3"></div>
          <div className="welcome-map col-span-12 box-border flex flex-col px-4 xl:col-span-6">
            <h2 className="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
              Il portale delle meraviglie
            </h2>
            <br />
            <br />
            <br />
            <div className="col-span-12 space-y-10 xl:col-span-6">
              <div
                id="map"
                onClick={(e) => {
                  console.log(
                    "THis was clilcked",
                    e.target.className.baseVal.split("_")[2],
                    regions
                  )
                  for (const key in regions) {
                    if (
                      regions[key].states.includes(
                        e.target.className.baseVal.split("_")[2]
                      )
                    ) {
                      console.log(
                        `${key}: ${regions[key].states} :${regions[key].name}`
                      )
                      setRegion(regions[key].name)
                    }
                  }
                }}
                className="w-full"
              />
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
                  width={35}
                  height={35}
                  alt="hand"
                  className="hand1"
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
                {/* TODO insert tooltip inside span region with this label: Divertiti a trovare luoghi meravigliosi */}
                Clicca su una <span style={{ color: "red" }}>regione</span> che
                vuoi esplorare
              </p>
              <p
                className="welcome-subtitle text-center  text-primary-light "
                style={{ fontWeight: "600", fontSize: 36 }}
              >
                Guida alla scoperta del Bel Paese
              </p>
            </div>
          )}
          {listaEventi.filter(
            (doc) => doc?.luogo === slug || doc?.region === region
          ).length > 0 && (
            <Section
              titolo={`Eventi a ${slug || region}`}
              slug={slug}
              region={region}
              eventi={listaEventi}
            />
          )}
          <div className="col-span-12 flex flex-col px-4">
            <h4 className="f-bailjum-b mb-8    text-center text-5xl uppercase  text-primary-main md:text-center md:text-6xl lg:mb-12  lg:text-7xl">
              Categorie
            </h4>

            <div className="ml-auto mr-auto  w-11/12 md:w-10/12 lg:w-9/12">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {categorie?.length > 0 &&
                  categorie?.map((categoria) => (
                    <p
                      key={categoria?.titolo}
                      className="bg-primary-100 text-primary-600 hover:bg-primary-200 iconWrapper w-full rounded-md px-2 text-center text-lg font-medium transition duration-200"
                    >
                      <Link href={`/categoria/${categoria?.titolo}`}>
                        <span className="flex cursor-pointer items-center justify-center space-x-2 rounded-xl bg-green-main py-3 px-6  text-sm ">
                          <img
                            className="iconCategory"
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
          </div>
          <div
            className="col-span-12 box-border flex flex-col px-4 xl:col-span-12"
            id="who-we-are-section"
          >
            <h1 className=" f-bailjum-b  my-6 text-center text-4xl  md:text-5xl  lg:text-7xl">
              ITALIA MERAVIGLIOSA
            </h1>
            <p className="f-rboto-r text-center  text-lg  text-primary-accent md:text-2xl ">
              Siamo partiti dalla nostra pagina Facebook a Gennaio del 2020, con
              l’intenzione di mostrarvi le meraviglie nascoste del nostro paese
            </p>
            <p className="f-rboto-r     text-center  text-lg  text-primary-accent md:text-2xl ">
              Oggi con oltre 250 mila follower e tante foto di località
              pubblicate e milioni di visualizzazioni, abbiamo deciso di creare
              una redazione di “Italia Meravigliosa” e di creare questo portale,
              perchè possa guidarvi in luoghi meravigliosi da esplorare, buon
              viaggio a tutti voi.
            </p>
          </div>
        </main>
        <div className="grid-row mt-8 grid  grid-cols-12  content-center  gap-4 md:mt-16  ">
          <div className="col-span-12  md:col-span-10  lg:col-span-6    ">
            <div className="   overflow-y-hidden   lg:w-8/12 ">
              <p className="   f-inter-b md:mt-18  mt-0 text-center text-xl text-primary-dark sm:text-3xl  md:text-4xl lg:mt-24 lg:text-left  ">
                SEGUICI SU FACEBOOK, SIAMO OLTRE 250 MILA
              </p>
            </div>
            <ul className="   my-5 md:flex ">
              <li>
                {" "}
                <img
                  src="/images/fb.png"
                  objectFit="contain"
                  layout="intrinsic"
                  className="ml-auto mr-auto h-auto w-11  "
                  alt="hand"
                />{" "}
              </li>
              <li className="pt-3 sm:pl-4  ">
                <p className="text-center text-sm text-grey-main  md:text-left ">
                  https://www.facebook.com/istagram.paoloartista1/
                </p>
              </li>
            </ul>

            <ul className="f-inter-r flex  list-disc pl-8     text-blue-main   md:inline md:space-x-0   ">
              <li>Post spettacolari e unici</li>
              <li className="ml-8 md:ml-0 ">Community</li>
              <li className="ml-8 md:ml-0 ">Share</li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6  lg:col-span-3  ">
            <img
              src="/images/card1.jpg"
              objectFit="contain"
              layout="intrinsic"
              alt="hand"
              className="mt-20 h-auto w-full rounded-xl "
            />
          </div>
          <div className="col-span-12 mb-8   md:col-span-5  lg:col-span-3 lg:mb-0  ">
            <img
              src="/images/image2.png"
              objectFit="contain"
              layout="intrinsic"
              alt="hand"
              className="h-auto w-full rounded-xl "
            />
            <img
              src="/images/image3.png"
              objectFit="contain"
              layout="intrinsic"
              alt="hand"
              className="mt-5 h-auto w-full rounded-xl "
            />
          </div>
        </div>

        <div className="col-span-12 box-border flex flex-col xl:col-span-12">
          <div
            className="xl:col-span-5"
            style={{ alignSelf: "center", background: "red" }}
          ></div>
          <div className="xl:col-span-6"></div>
        </div>

        <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
          <p className=" f-bailjum-b my-10 text-center  text-3xl  sm:my-20 md:text-5xl lg:text-7xl ">
            1M+ Utenti Giornalieri
          </p>
        </div>
        <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
          <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-12">
            <div
              className="infoBox xl:col-span-3"
              style={{ borderLeft: "none" }}
            >
              <p className="infoGray text-center">FOTO</p>
              <p className="text-center">+50K</p>
            </div>
            <div className="infoBox xl:col-span-3">
              <p className="infoGray text-center">INTERAZIONI</p>
              <p className="text-center">+15M</p>
            </div>
            <div className="infoBox xl:col-span-3">
              <p className="infoGray text-center" style={{ width: "50%" }}>
                LUOGHI MERAVIGLIOSI
              </p>
              <p className="text-center">+1000</p>
            </div>
            <div
              className="infoBox xl:col-span-3"
              style={{ borderRight: "none" }}
            >
              <p className="infoGray text-center">COLLABORAZIONI</p>
              <p className="text-center">+50</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-black  py-20    ">
        <div className="ml-auto mr-auto w-10/12 lg:w-8/12  ">
          <p className="f-popins-m  text-center text-4xl text-white ">
            MISSION
          </p>
          <p
            className="infoGray  my-10  "
            style={{
              fontStyle: "italic",
            }}
          >
            “Guardare l'Italia con gli occhi dell'Artista, e trovare in ogni
            angolo del Bel Paese un luogo Meraviglioso. Guarda l'Italia con
            occhi nuovi con Italia Meravigliosa in Tour. ”
          </p>
          <p className=" f-lato-r mt-8 mb-2 text-center text-2xl  text-white ">
            Paolo Artista
          </p>
          <p className="infoGray  text-center ">
            CEO & Founder Italia Meravigliosa
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl" id="work-with-us-section">
        <main className="grid w-full grid-cols-12 space-y-12 space-x-4">
          <div className="col-span-12 px-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className=" f-bailjum-b mt-10 mb-8  text-center text-3xl text-black  sm:text-4xl lg:mt-20 lg:mb-10 lg:text-6xl  ">
                VUOI COLLABORARE CON NOI?
              </p>
              <div className="  ml-auto mr-auto w-11/12 sm:w-10/12 lg:w-7/12 ">
                <p className="Roboto-Regular text-center   text-grey-light ">
                  Italia Meravigliosa offre l’opportunità di collaborare con la
                  nostra redazione, se sei un fotografo, un videomaker oppure un
                  blogger di viaggio, contattaci ed entra a far parte del nostro
                  team, fai conoscere il tuo lavoro attraverso la nostra grande
                  e coesa community
                </p>
                <p className="my-4 text-center underline ">
                  info@italiameravigliosaintour.it{" "}
                </p>
              </div>
            </div>

            <h4
              className="text-center text-4xl font-bold text-gray-800 md:text-left"
              style={{
                color: "black",
                fontStyle: "normal",
                marginTop: 20,
                paddingTop: 48,
              }}
            >
              Contatti
            </h4>

            <br />

            <Contatti />
          </div>
          {/* TODO Fix responsive sections */}
          <div
            id="wish-list-section"
            className="col-span-12 px-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // maxWidth: "80rem",
            }}
          >
            <div
              style={{
                width: "95%",
                // height: 300,
                padding: 5,
                borderRadius: 40,
                backgroundImage: 'url("/images/gradient.png")',
                backgroundSize: "cover",
              }}
            >
              <p
                className="text-center  "
                style={{
                  fontSize: 40,
                  paddingTop: 50,
                  paddingBottom: 10,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Vuoi ricevere piu’ informazioni?
              </p>
              <p
                className="f-inter-r  text-center"
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                Iscriviti alla newsletter di italia meravigliosa
              </p>
              <div
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   background: "white",
              //   borderRadius: 50,
              //   height: 40,
              //   paddingLeft: 15,
              // }}
              >
                <form className="my-4 ml-auto mr-auto w-6/12 text-center ">
                  <label
                    for="default-search"
                    class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Search
                  </label>
                  <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <FaEnvelope color="gray" />{" "}
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      placeholder="La tua email"
                      class="block w-full rounded-3xl border border-gray-300  bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500  "
                      required
                    />
                  </div>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 20,
                      background: "#231A36",
                    }}
                    className="buttonNewsletter ml-auto  mr-auto rounded-full py-3 px-10 font-bold text-white hover:bg-red-700"
                  >
                    <span
                      style={{ marginRight: 5 }}
                      className=" f-inter-r text-sm"
                    >
                      Iscriviti
                    </span>{" "}
                    <FaArrowCircleRight />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="ml-auto mr-auto mt-10 mb-32 w-11/12  text-center   ">
        <img
          src="/images/logo.png"
          // objectFit="contain"
          // layout="intrinsic"
          width={80}
          height={80}
          alt="hand"
          className=" ml-auto mr-auto"
        />
        <Link href="https://www.facebook.com/istagram.paoloartista1/">
          <a>
            <Image
              src="/images/fblog.png"
              objectFit="contain"
              layout="intrinsic"
              width={170}
              height={170}
              alt="hand"
              className="fbicon"
            />
          </a>
        </Link>
        <p>
          Copyright © 2022 Italia Meravigliosa in Tour, Tutti i diritti sono
          riservati. | Powered by:
          <Link href="https://applabstudio.com/">
            <a>
              <Image
                src="/images/applab_logo.png"
                objectFit="contain"
                layout="intrinsic"
                width={80}
                height={20}
                alt="hand"
              />
              AppLab Studio
            </a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default LandingComponent

const useIsMounted = () => {
  const isMounted = React.useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted.current
}
