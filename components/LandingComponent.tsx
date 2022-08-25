// @ts-nocheck
import Image from "next/image"
import Event from "../components/Event"
import React, { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"

import { FaEye } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"

import { useIsMounted } from "../services/useIsMounted"

import "swiper/css"
import "swiper/css/pagination"
import "react-perfect-scrollbar/dist/css/styles.css"
import Link from "next/link"

import PopupOptin from "./PopupOptin"

import WelcomeSection from "./layout/WelcomeSection"

import { useRouter } from "next/router"

const regions = {
  "0": {
    states: ["ITA5418", "ITA5419", "ITA5420", "ITA5421"],
    name: "Abruzzo",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "abruzzo",
  },
  "1": {
    states: ["ITA5389", "ITA5390"],
    name: "Basilicata",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "basilicata",
  },
  "2": {
    states: ["ITA5391", "ITA5392", "ITA5393", "ITA5394", "ITA5395"],
    name: "Calabria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "calabria",
  },
  "3": {
    states: ["ITA5396", "ITA5397", "ITA5398", "ITA5399", "ITA5400"],
    name: "Campania",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "campania",
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
    slug: "emilia-romagna",
  },
  "5": {
    states: ["ITA5455", "ITA5456", "ITA5457", "ITA5458"],
    name: "Friuli-Venezia Giulia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "friuli-venezia-giulia",
  },
  "6": {
    states: ["ITA5422", "ITA5423", "ITA5424", "ITA5425", "ITA5426"],
    name: "Lazio",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "lazio",
    slug: "lazio",
  },
  "7": {
    states: ["ITA5367", "ITA5368", "ITA5369", "ITA5370"],
    name: "Liguria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "liguria",
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
    slug: "lombardia",
  },
  "9": {
    states: ["ITA5427", "ITA5428", "ITA5429", "ITA5430", "ITA5431"],
    name: "Marche",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "marche",
  },
  "10": {
    states: ["ITA5401", "ITA5402"],
    name: "Molise",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "molise",
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
    slug: "piemonte",
  },
  "12": {
    states: ["ITA5403", "ITA5404", "ITA5405", "ITA5406", "ITA5407", "ITA5408"],
    name: "Puglia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "puglia",
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
    slug: "sardegna",
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
    slug: "sicilia",
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
    slug: "toscana",
  },
  "16": {
    states: ["ITA5459", "ITA5460"],
    name: "Trentino-Alto Adige",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "trentino-alto-adige",
  },
  "17": {
    states: ["ITA5432", "ITA5433"],
    name: "Umbria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "umbria",
  },
  "18": {
    states: ["ITA5442"],
    name: "Valle d'Aosta",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "valle-d-aosta",
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
    slug: "veneto",
  },
}

const Section = ({
  titolo,
  slug,
  eventi,
  region,
  id,
}: {
  titolo: string
  slug: string
  eventi: any
  region: string
  id: string
}) => {
  console.log(
    "THis is the filtered region",
    eventi?.filter((doc) => doc?.luogo === slug || doc?.region === region)
  )
  return (
    <div className="col-span-12 px-4" id={id}>
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
                icon={doc?.categorie?.at(0)?.id}
                btnText="Scopri di più"
                to={`/eventi/${doc?.slug}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
const LandingComponent: React.FC<{ slug: string }> = ({ slug }) => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [listaEventi, setListaEventi] = useState<any[]>([])
  const [categorie, setCategorie] = useState<any[]>([])
  const [region, setRegion] = useState<string>(null)
  const [regionSlug, setRegionSlug] = useState("")
  const [slugProvincia, setSlugProvincia] = useState("")
  const [nomeProvincia, setNomeProvincia] = useState("")

  const isMounted = useIsMounted()
  const router = useRouter()

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
  }, [slugProvincia])

  // console.log("These are the events ", listaEventi)

  return (
    <>
      <PopupOptin />

      <div className="mx-auto max-w-6xl" id="top-section">
        <main className="mt-0 grid w-full grid-cols-12 space-y-12 space-x-4">
          <div className="xl:col-span-3"></div>
          <div className="welcome-map col-span-12 box-border flex flex-col px-4 xl:col-span-6">
            <h2 className="first-title text-center text-3xl font-bold">
              Il portale delle meraviglie
            </h2>

            {listaEventi.filter((doc) => doc?.luogo === slug).length == 0 && (
              <div className="col-span-12 !mt-4 box-border flex flex-col px-4 xl:col-span-12">
                <p
                  className="info_title text-center"
                  style={{ fontWeight: "700", fontSize: 16 }}
                >
                  <Image
                    src="/images/hand1.png"
                    objectFit="contain"
                    layout="intrinsic"
                    width={46}
                    height={46}
                    alt="hand"
                    className="hand1"
                  />
                  Clicca su una{" "}
                  <span className="text-secondary-500">regione</span> che vuoi
                  esplorare
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 12,
                      padding: 20,
                    }}
                    className="tutorialWrapper"
                  >
                    <br />
                    <Image
                      src="/images/trovaluoghi.png"
                      objectFit="contain"
                      layout="intrinsic"
                      width={48}
                      height={48}
                      alt="hand"
                      className="trovaluoghi_icon"
                    />
                    E scopri luoghi meravigliosi dentro le province
                  </span>
                </p>
              </div>
            )}
            {listaEventi.filter(
              (doc) => doc?.luogo === slug || doc?.region === region
            ).length > 0 && (
              <Section
                titolo={`Luoghi in: ${slug || region}`}
                slug={slug}
                region={region}
                eventi={listaEventi}
                id="luoghi"
              />
            )}

            <div className="col-span-12 space-y-10 xl:col-span-6">
              <div
                id="map"
                onClick={(e) => {
                  for (const key in regions) {
                    if (
                      regions[key].states.includes(
                        e.target.className.baseVal.split("_")[2]
                      )
                    ) {
                      setSlugProvincia("")
                      setNomeProvincia("")
                      setRegion(regions[key].name)
                      setRegionSlug(regions[key].slug)
                    }
                  }
                }}
                className="w-full"
              />
            </div>
          </div>

          {region && (
            <div className="col-span-12 flex justify-center">
              <Link href={`/regione/${regionSlug}`} passHref>
                <a>
                  <button className="flex items-center space-x-2 rounded-full bg-red-500 py-3 px-8 font-bold text-white hover:bg-red-700">
                    <FaEye size={20} />
                    <span>Esplora la Regione</span>
                  </button>
                </a>
              </Link>
            </div>
          )}

          {slugProvincia && (
            <div className="col-span-12 px-4">
              <h4 className="text-center text-3xl font-bold md:text-left">
                Luoghi a: {nomeProvincia}
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
                {listaEventi
                  ?.filter((doc) => doc?.luogo === slugProvincia)
                  ?.map((doc) => (
                    <SwiperSlide key={doc?.id} className="mb-8">
                      <Event
                        image={doc?.copertina}
                        heading={doc?.titolo}
                        location={doc?.luogo}
                        icon={doc?.categorie?.at(0)?.id}
                        btnText="Scopri di più"
                        to={`/eventi/${doc?.slug}`}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}

          {/* CATEGORIE */}
          <div className="categywrapper col-span-12 flex flex-col px-4">
            <h4 className="my-4 text-center text-5xl font-semibold uppercase lg:text-7xl">
              Categorie
            </h4>

            <br />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
              {categorie?.length > 0 &&
                categorie?.slice(0, 6).map((categoria) => (
                  <div
                    key={categoria?.titolo}
                    className="iconWrapper w-full !rounded-full bg-primary-100 px-2 text-center text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
                  >
                    <Link href={`/categoria/${categoria?.titolo}`}>
                      <span className="flex cursor-pointer items-center justify-center space-x-2">
                        <img
                          className="iconCategory"
                          src={categoria?.icona}
                          alt=""
                        />
                        <span>{categoria?.titolo}</span>
                      </span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          <WelcomeSection />
        </main>
      </div>
    </>
  )
}

export default LandingComponent
