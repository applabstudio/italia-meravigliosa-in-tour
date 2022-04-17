// @ts-nocheck

import React from "react"
import { firestore } from "../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import Link from "next/link"

const Categorie = () => {
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

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <main className="flex w-full flex-col px-4">
        <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
          Lista delle categorie
        </h4>

        <br />
        <div className="flex flex-row space-x-2">
          {categorie.length > 0 &&
            categorie.map((categoria) => (
              <p className="w-fit rounded-md bg-primary-100 px-2 text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200">
                <Link href={`/categoria/${categoria}`}>{categoria}</Link>
              </p>
            ))}
        </div>
      </main>
    </div>
  )
}

export default Categorie
