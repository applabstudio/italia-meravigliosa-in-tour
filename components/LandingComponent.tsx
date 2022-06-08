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


const regions = {
  "0": {
    states: [
      "ITA5418",
      "ITA5419",
      "ITA5420",
      "ITA5421"
    ],
    name: "Abruzzo",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "1": {
    states: [
      "ITA5389",
      "ITA5390"
    ],
    name: "Basilicata",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "2": {
    states: [
      "ITA5391",
      "ITA5392",
      "ITA5393",
      "ITA5394",
      "ITA5395"
    ],
    name: "Calabria",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "3": {
    states: [
      "ITA5396",
      "ITA5397",
      "ITA5398",
      "ITA5399",
      "ITA5400"
    ],
    name: "Campania",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
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
      "ITA5366"
    ],
    name: "Emilia-Romagna",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "5": {
    states: [
      "ITA5455",
      "ITA5456",
      "ITA5457",
      "ITA5458"
    ],
    name: "Friuli-Venezia Giulia",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "6": {
    states: [
      "ITA5422",
      "ITA5423",
      "ITA5424",
      "ITA5425",
      "ITA5426"
    ],
    name: "Lazio",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "7": {
    states: [
      "ITA5367",
      "ITA5368",
      "ITA5369",
      "ITA5370"
    ],
    name: "Liguria",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
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
      "ITA5454"
    ],
    name: "Lombardia",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "9": {
    states: [
      "ITA5427",
      "ITA5428",
      "ITA5429",
      "ITA5430",
      "ITA5431"
    ],
    name: "Marche",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "10": {
    states: [
      "ITA5401",
      "ITA5402"
    ],
    name: "Molise",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
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
      "ITA5441"
    ],
    name: "Piemonte",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "12": {
    states: [
      "ITA5403",
      "ITA5404",
      "ITA5405",
      "ITA5406",
      "ITA5407",
      "ITA5408"
    ],
    name: "Puglia",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
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
      "ITA5378"
    ],
    name: "Sardegna",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
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
      "ITA5417"
    ],
    name: "Sicilia",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
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
      "ITA5388"
    ],
    name: "Toscana",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "16": {
    states: [
      "ITA5459",
      "ITA5460"
    ],
    name: "Trentino-Alto Adige",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "17": {
    states: [
      "ITA5432",
      "ITA5433"
    ],
    name: "Umbria",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "18": {
    states: [
      "ITA5442"
    ],
    name: "Valle d'Aosta",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  },
  "19": {
    states: [
      "ITA5461",
      "ITA5462",
      "ITA5463",
      "ITA5464",
      "ITA5465",
      "ITA5466",
      "ITA5467"
    ],
    name: "Veneto",
    color: "#d1d5db",
    hover_color: "#6ee7b7"
  }
}

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
              <div id="map" onClick={(e)=>{
                console.log("THis was clilcked", e.target.className.baseVal.split("_")[2] ,regions)
                for (const key in regions) {
                  if(regions[key].states.includes(e.target.className.baseVal.split("_")[2]))
                  {
                    console.log(`${key}: ${regions[key].states} :${regions[key].name}`);
                  }
                  
              }
              }} className="w-full" />
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
                className="text-right xl:col-span-7"
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
          <div className="infoBox xl:col-span-3" style={{ borderLeft: "none" }}>
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
        </main>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="mx-auto max-w-7xl"
          style={{
            width: "100%",
            background: "black",
            height: 380,
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
            “Guardare l'Italia con gli occhi dell'Artista, e trovare in ogni angolo del Bel Paese un luogo Meraviglioso. Guarda l'Italia con occhi nuovi con Italia Meravigliosa in Tour.
”
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                className="text-center"
                style={{
                  fontSize: 55,
                  paddingTop: 50,
                  paddingBottom: 10,
                  fontWeight: "700",
                }}
              >
                VUOI COLLABORARE CON NOI?
              </p>
              <p
                className="infoGray text-center"
                style={{
                  width: "80%",
                  textAlign: "justify",
                  fontFamily: "Inter",
                  fontSize: 22,
                  fontStyle: "italic",
                }}
              >
                Italia Meravigliosa offre l’opportunità di collaborare con la
                nostra redazione, se sei un fotografo, un videomaker oppure un
                blogger di viaggio, contattaci ed entra a far parte del nostro
                team, fai conoscere il tuo lavoro attraverso la nostra grande e
                coesa community
              </p>
            </div>

            <h4
              className="text-center text-4xl font-bold text-gray-800 md:text-left"
              style={{ color: "black", fontStyle: "normal", marginTop: 20 }}
            >
              Contatti
            </h4>

            <br />

            <Contatti />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80rem",
            }}
          >
            <div
              style={{
                width: "75%",
                height: 300,
                backgroundImage: 'url("/images/gradient.png")',
                backgroundSize: "cover",
              }}
            >
              <p
                className="text-center"
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
                className="text-center"
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                Iscriviti alla newsletter di italia meravigliosa
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    borderRadius: 50,
                    height: 40,
                    paddingLeft: 15,
                  }}
                >
                  <FaEnvelope color="gray" />{" "}
                  <input
                    placeholder="La tua email"
                    style={{ border: "none", width: "80%", marginLeft: 5 }}
                  ></input>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                    background: "#231A36",
                  }}
                  className="rounded-full bg-red-500 py-2 px-6 font-bold text-white hover:bg-red-700"
                >
                  <span style={{ marginRight: 5 }}>Iscriviti</span>{" "}
                  <FaArrowCircleRight />
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-span-12 rounded-lg p-6"
            style={{ marginBottom: 20 }}
          >
            <div className="grid w-full grid-cols-12 space-x-4">
              <div className="xl:col-span-2">
                <Image
                  src="/images/chase.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={100}
                  height={100}
                  alt="hand"
                />
              </div>
              <div className="xl:col-span-2">
                <Image
                  src="/images/asana.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={100}
                  height={100}
                  alt="hand"
                />
              </div>
              <div className="xl:col-span-2">
                <Image
                  src="/images/google.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={100}
                  height={100}
                  alt="hand"
                />
              </div>
              <div className="xl:col-span-2">
                <Image
                  src="/images/buzzfeed.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={100}
                  height={100}
                  alt="hand"
                />
              </div>
              <div className="xl:col-span-2">
                <Image
                  src="/images/toggl.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={100}
                  height={100}
                  alt="hand"
                />
              </div>
              <div className="xl:col-span-2">
                <Image
                  src="/images/walmart.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={100}
                  height={100}
                  alt="hand"
                />
              </div>
            </div>
          </div>

          <div
            className="mx-auto max-w-7xl"
            style={{
              width: "80rem",
              background: "#F3F4F6",
              height: 300,
              maxWidth: "85rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="text-center"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/images/logo.png"
                objectFit="contain"
                layout="intrinsic"
                width={80}
                height={80}
                alt="hand"
              />
              <Image
                src="/images/fblog.png"
                objectFit="contain"
                layout="intrinsic"
                width={170}
                height={170}
                alt="hand"
              />
            </div>
            <div style={{ display: "flex", height: 50, width: "85%" }}>
              <div style={{ height: 50, width: "80%" }}>
                <p style={{ width: "100%", textAlign: "center" }}>
                  Copyright © 2022 Italia Meravigliosa in Tour, Tutti i diritti
                  sono riservati. | Powered by:{" "}
                  <Image
                    src="/images/applab.png"
                    objectFit="contain"
                    layout="intrinsic"
                    width={80}
                    height={20}
                    alt="hand"
                  />
                  p.Iva000000000000{" "}
                </p>
              </div>
              <div style={{ height: 50, width: "20%", }}>
                <Image
                  src="/images/privacy.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={80}
                  height={80}
                  alt="hand"
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12"></div>
          <div
            className="footer-grid xl:col-span-2"
            style={{ borderLeft: "none" }}
          >
            <Image
              src="/images/home.png"
              objectFit="contain"
              layout="intrinsic"
              width={80}
              height={80}
              alt="hand"
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
              width={80}
              height={80}
              alt="hand"
            />
            <p className="text-center">Chi siamo</p>
          </div>
          <div className="footer-grid xl:col-span-3">
            <Image
              src="/images/work.png"
              objectFit="contain"
              layout="intrinsic"
              width={80}
              height={80}
              alt="hand"
            />
            <p className="text-center">Lavora con noi</p>
          </div>
          <div className="footer-grid xl:col-span-2">
            <Image
              src="/images/heart.png"
              objectFit="contain"
              layout="intrinsic"
              width={80}
              height={80}
              alt="hand"
            />
            <p className="text-center">Wishlist</p>
          </div>
          <div className="footer-grid xl:col-span-2">
            <Image
              src="/images/search.png"
              objectFit="contain"
              layout="intrinsic"
              width={80}
              height={80}
              alt="hand"
            />
            <p className="text-center">Cerca</p>
          </div>
        </main>
      </div>
    </>
  )
}

export default LandingComponent
