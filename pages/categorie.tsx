// @ts-nocheck

import React, { useEffect, useState } from "react"
import { firestore } from "../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import Link from "next/link"

const Categorie = () => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [categorie, setCategorie] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "categoria" &&
        setCategorie((categorie) => [...categorie, d.data()])
    })
  }, [data])

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <main className="flex w-full flex-col px-4">
        <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
          Lista delle categorie
        </h4>

        <br />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {categorie.length > 0 &&
            categorie.map((categoria) => (
              <p
                key={categoria?.titolo}
                className="w-full rounded-md bg-primary-100 px-2 text-center text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
              >
                <Link href={`/categoria/${categoria?.titolo}`}>
                  <span className="flex cursor-pointer items-center justify-center space-x-2">
                    <img className="h-4 w-4" src={categoria?.icona} alt="" />
                    <p>{categoria?.titolo}</p>
                  </span>
                </Link>
              </p>
            ))}
        </div>

        <br />
        <br />

        <div className="w-full bg-gray-100">
          <p className="mt-2 ml-2 rounded-lg text-gray-500">Pubblicità</p>

          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1708355893696705"
            data-ad-slot="9487119343"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </main>
    </div>
  )
}

export default Categorie
