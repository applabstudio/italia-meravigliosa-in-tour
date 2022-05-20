// @ts-nocheck

import type { NextPage } from "next"
import { SearchBar } from "../components/common/SearchBar"
import Event from "../components/Event"
import React, { useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"
import Contatti from "../components/Contatti"
import { FaAngleDown } from "react-icons/fa"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "react-perfect-scrollbar/dist/css/styles.css"
import Link from "next/link"
import Input from "../components/common/Input"

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
          slidesPerView: 2,
        },
      }}
      spaceBetween={30}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {eventi?.docs
        ?.filter((doc) => doc?.data()?.luogo === slug)
        ?.map((doc) => (
          <SwiperSlide key={doc?.id} className="mb-8">
            <Event
              image={doc?.data()?.copertina}
              heading={doc?.data()?.titolo}
              location={doc?.data()?.luogo}
              btnText="Scopri di più"
              to={`/eventi/${doc?.data()?.slug}`}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  </div>
)

const Home: NextPage = () => {
  const [listaEventi, listaEventiLoading, listaEventiError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const categorie = []

  listaEventi?.docs?.map((doc) =>
    doc
      ?.data()
      ?.categorie?.split(",")
      .map((el) => {
        if (!categorie.includes(el.replace(/\s/g, "").toLowerCase())) {
          categorie.push(el.replace(/\s/g, "").toLowerCase())
        }
      })
  )

  useEffect(() => {
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

  return (
    <>
      <div className="mx-auto mt-8 max-w-6xl">
        <main className="grid w-full grid-cols-12 space-y-12 space-x-4">
          <div className="col-span-12 box-border flex flex-col px-8">
            <div className="h-52 w-full overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-100 xl:h-80">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)) , url('https://siviaggia.it/wp-content/uploads/sites/2/2021/04/malcesine-passeggiate-italia.jpg')",
                }}
                className="relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
              >
                <h1 className="mb-2 text-2xl font-extrabold text-white xl:text-5xl">
                  Italia Meravigliosa in Tour
                </h1>

                <p className="px-4 text-center text-gray-200 xl:text-lg">
                  Dove vuoi andare oggi? Scorri in Basso per scoprire nuovi
                  eventi!
                </p>

                <FaAngleDown className="absolute bottom-10 text-2xl text-white" />
              </div>
            </div>
          </div>

          <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-6">
            <div className="rounded-lg border-2 border-gray-100 bg-secondary-500 p-6 shadow-lg shadow-gray-100">
              <h4 className="text-center text-4xl font-bold text-white md:text-left">
                Cerca un Evento
              </h4>
              <br />
              <SearchBar />
            </div>
            <br />
            <hr />
            <br />

            <div className="h-[37rem] rounded-lg border-2 border-gray-100 shadow-lg shadow-gray-100">
              <PerfectScrollbar className="p-6">
                <h4 className="mb-4 text-center text-4xl font-bold text-gray-800 md:text-left">
                  Ultimi Eventi
                </h4>
                {listaEventi?.docs?.slice(0, 6)?.map((doc) => (
                  <React.Fragment key={doc?.id}>
                    <Event
                      image={doc?.data()?.copertina}
                      heading={doc?.data()?.titolo}
                      location={doc?.data()?.luogo}
                      btnText="Scopri di più"
                      to={`/eventi/${doc?.data()?.slug}`}
                    />
                  </React.Fragment>
                ))}
              </PerfectScrollbar>
            </div>
          </div>

          <div className="col-span-12 space-y-10 xl:col-span-6">
            <ul className="list-disc px-10">
              <li className="text-sm text-gray-500">
                Sposta il mouse sulle regioni per <strong>ingrandirle</strong>
              </li>
              <li className="text-sm text-gray-500">
                <strong>Clicca sulle province</strong> per maggiori informazioni
              </li>
            </ul>
            <div id="map" className="w-full" />
          </div>

          <Section titolo="Eventi a Siena" slug="siena" eventi={listaEventi} />
          <Section
            titolo="Eventi a Venezia"
            slug="venezia"
            eventi={listaEventi}
          />
          <Section titolo="Eventi a Roma" slug="roma" eventi={listaEventi} />

          <div className="col-span-12 flex flex-col px-4">
            <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
              Categorie
            </h4>

            <br />
            <div className="grid grid-cols-3 gap-4 xl:grid-cols-6">
              {categorie.length > 0 &&
                categorie.map((categoria) => (
                  <p
                    key={categoria}
                    className="w-full rounded-md bg-primary-100 px-2 text-center text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
                  >
                    <Link href={`/categoria/${categoria}`}>{categoria}</Link>
                  </p>
                ))}
            </div>
          </div>

          <div className="col-span-12 px-4">
            <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
              Contatti
            </h4>

            <br />

            <Contatti />
          </div>

          <div className="col-span-12 rounded-lg bg-secondary-500 p-6">
            <h4 className="text-center text-3xl font-bold text-white md:text-left">
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

export default Home
