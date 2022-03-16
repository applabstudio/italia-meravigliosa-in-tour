// @ts-nocheck

import type { NextPage } from "next"
import { SearchBar } from "../components/common/SearchBar"
import Event from "../components/Event"
import React, { useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"

const Home: NextPage = () => {
  const [listaEventi, listaEventiLoading, listaEventiError] = useCollection(
    collection(firestore, "fl_content"),
    {}
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
        <main className="grid w-full grid-cols-1 space-y-12 space-x-4 xl:grid-cols-12">
          <div className="col-span-6 flex flex-col px-4">
            <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
              Ultimi Eventi
            </h4>
            <br />
            <SearchBar />
            <br />
            <hr />
            <br />

            {listaEventi?.docs?.slice(0, 4)?.map((doc) => (
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
          </div>

          <div className="col-span-6 space-y-10">
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
        </main>
      </div>
    </>
  )
}

export default Home
