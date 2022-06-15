// @ts-nocheck

import Image from "next/image"
import type { NextPage } from "next"
import { SearchBar } from "../components/common/SearchBar"
import Event from "../components/Event"
import React, { useEffect, useState } from "react"
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
import PopupOptin from "../components/PopupOptin"
import Script from "next/script"
import LandingComponent from "../components/LandingComponent"

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

const Home: NextPage = () => {
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
    <div>
    <LandingComponent eventi={listaEventi} categorie={categorie}></LandingComponent>
    </div>
  
    </>
  )
}

export default Home
