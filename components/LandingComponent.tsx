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
import Mission from "./layout/Mission"
import Footer from './Footer'
import WelcomeSection from "./layout/WelcomeSection"
import Newsletter from "./Newsletter"
import FacebookSection from "./layout/FacebookSection"




const ADSENSE_PUBLISHER_KEY = 'ca-pub-7292810486004926';
const ADSENSE_SLOT = '7610040244';

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

  const isMounted = useIsMounted();


  useEffect(() => {

    if (isMounted) {
      const e = document.getElementById("map_inner");
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

    mapScript.src = "/scripts/mapdata.js"
    countryScript.src = "/scripts/countrymap.js"
    mapScript.async = true
    countryScript.async = true

    document.body.appendChild(mapScript)
    document.body.appendChild(countryScript)

    return () => {
      document.body.removeChild(mapScript)
      document.body.removeChild(countryScript)
    }
  }, [])

  // console.log("These are the events ", listaEventi)

  return (
    <>
      <PopupOptin />
      <div className="mx-auto max-w-6xl" id="top-section">
        <main className="grid w-full grid-cols-12 space-y-12 space-x-4">
          <div className="xl:col-span-3"></div>
          <div className="welcome-map col-span-12 box-border flex flex-col px-4 xl:col-span-6">
            <h2 className="text-center text-4xl font-bold text-gray-800">Il portale delle meraviglie</h2>
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
                className="w-full" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -30,
                }}>
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
              <p className="text-center" style={{ fontWeight: "700", fontSize: 18 }}>
                {/* TODO insert tooltip inside span region with this label: Divertiti a trovare luoghi meravigliosi */}
                Clicca su una <span style={{ color: "red" }}>regione</span> che
                vuoi esplorare
              </p>
              <p className="welcome-subtitle text-center" style={{ fontWeight: "600", fontSize: 36 }}>
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
            <h4 className="text-center text-4xl font-bold text-gray-800 md:text-center">
              CATEGORIE
            </h4>

            <br />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {categorie?.length > 0 &&
                categorie?.map((categoria) => (
                  <p
                    key={categoria?.titolo}
                    className="w-full rounded-md bg-primary-100 px-2 text-center text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200 iconWrapper">
                    <Link href={`/categoria/${categoria?.titolo}`}>
                      <span className="flex cursor-pointer items-center justify-center space-x-2">
                        <img
                          className="iconCategory"
                          src={categoria?.icona}
                          alt="" />
                        <p>{categoria?.titolo}</p>
                      </span>
                    </Link>
                  </p>
                ))}
            </div>
          </div>
          <WelcomeSection />
          <FacebookSection />
        </main>
      </div>

      <Mission />

      <div className="mx-auto max-w-7xl" id="work-with-us-section" >
        <main className="grid w-full grid-cols-12 space-y-12 space-x-4">
          <div className="col-span-12 px-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <p className="workwithus text-center"
                style={{
                  fontSize: 55,
                  paddingTop: 50,
                  paddingBottom: 10,
                  fontWeight: "700",
                }}>
                VUOI COLLABORARE CON NOI?
              </p>
              <p className="infoGray text-center"
                style={{
                  width: "80%",
                  textAlign: "justify",
                  fontFamily: "Inter",
                  fontSize: 22,
                  fontStyle: "italic",
                }}>
                Italia Meravigliosa offre l’opportunità di collaborare con la
                nostra redazione, se sei un fotografo, un videomaker oppure un
                blogger di viaggio, contattaci ed entra a far parte del nostro
                team, fai conoscere il tuo lavoro attraverso la nostra grande e
                coesa community
              </p>
            </div>
            <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left"
              style={{ color: "black", fontStyle: "normal", marginTop: 20, paddingTop: 48 }}>
              Contatti
            </h4>
            <Contatti />
          </div>
          <Newsletter />
          <div className="col-span-12 rounded-lg p-6"
            style={{ marginBottom: 20 }}></div>
          <div className="col-span-12"
            style={{
              width: "100%",
              background: "white",
            }}>
            <div className="mx-auto max-w-7xl"
              style={{
                width: "100%",
                background: "white",
                height: 300,
                maxWidth: "85rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className="text-center">

              <div style={{ minWidth: 300 }} >


                <ins className="adsbygoogle"
                  style={{ display: "block", textAlign: "center" }}
                  data-ad-layout="in-article"
                  data-ad-format="fluid"
                  data-ad-client={ADSENSE_PUBLISHER_KEY}
                  data-ad-slot={ADSENSE_SLOT}>

                </ins>

                {/* <AdSense.Google
                  client={ADSENSE_PUBLISHER_KEY}
                  slot={ADSENSE_SLOT}
                /> */}


              </div>

              <Footer />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default LandingComponent



const useIsMounted = () => {
  const isMounted = React.useRef(false);

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted.current;
}