// @ts-nocheck

import { collection } from "firebase/firestore"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa"
import { firestore } from "../../firebase/clientApp"
import Event from "../Event"
import { GoSettings } from "react-icons/go";

const useOutsideAlerter = (
  ref: any,
  setFocused: Function,
  setFiltered: Function
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setFocused(false)
        setFiltered(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

export const SearchBar = () => {
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

  const [searchValue, setSearchValue] = useState("")
  const [focused, setFocused] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [categoria, setCategoria] = useState("")

  const inputRef = useRef(null)
  useOutsideAlerter(inputRef, setFocused, setFiltered)

  return (
    <div ref={inputRef} className="relative z-40 w-full">
      <div className="group flex w-full items-center rounded-full bg-gray-100">
        <button
          onClick={() => focused && setFiltered(!filtered)}
          className={`flex h-12 w-16 items-center justify-center ${
            filtered ? "text-primary-400" : "text-gray-400"
          }`}
        >
          <GoSettings size={20} style={{transform:"rotate(90deg)"}} />
        </button>

        {categoria !== "" && (
          <button
            onClick={() => setCategoria("")}
            className="flex w-fit items-center space-x-1 rounded-md bg-primary-100 px-2 text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
          >
            <span>{categoria}</span>
            <FaTimes size={20} />
          </button>
        )}

        <input
          type="text"
          className="form-input h-full w-full border-0 bg-transparent px-4 py-3 text-gray-800 caret-primary-500 outline-none placeholder:text-gray-400 focus:border-0 focus:ring-0"
          placeholder="Cerca un luogo meraviglioso...."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setFocused(true)}
        />

        <span className="flex h-12 w-16 items-center justify-center text-gray-400">
          <FaSearch />
        </span>
      </div>

      <div
        className={`${
          (!searchValue || !focused) && "hidden"
        } absolute top-16 left-0 z-50 max-h-96 w-full overflow-y-scroll rounded-md bg-white py-4 px-4 shadow-md transition-all`}
      >
        <div className="grid grid-cols-2 gap-2">
          {categorie?.length > 0 &&
            filtered &&
            categorie?.map((cat) => (
              <button
                key={cat?.titolo}
                onClick={() => setCategoria(cat?.titolo)}
                className="w-full rounded-md bg-primary-100 px-2 text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
              >
                {cat?.titolo}
              </button>
            ))}
        </div>

        {listaEventi &&
        listaEventi?.filter((doc) => {
          let cats = []

          doc?.categorie?.forEach((c) => {
            cats.push(categorie?.filter((l) => l?.id === c?.id)[0]?.titolo)
          })

          return doc?.titolo?.match(new RegExp(searchValue, "i")) &&
            categoria === ""
            ? true
            : cats
                .map((el) => el.replace(/\s/g, "").toLowerCase())
                .includes(categoria)
        })?.length > 0 ? (
          listaEventi
            ?.filter((doc) => {
              let cats = []

              doc?.categorie?.forEach((c) => {
                cats.push(categorie?.filter((l) => l?.id === c?.id)[0]?.titolo)
              })

              return categoria !== ""
                ? doc?.titolo?.match(new RegExp(searchValue, "i")) &&
                    cats.includes(categoria)
                : doc?.titolo?.match(new RegExp(searchValue, "i")) ||
                    cats.includes(categoria)
            })
            .map((evento) => {
              return (
                <React.Fragment key={evento?.titolo}>
                  <Event
                    image={evento?.copertina}
                    heading={evento?.titolo}
                    location={evento?.luogo}
                    btnText="Scopri di più"
                    to={`/eventi/${evento?.slug}`}
                  />
                </React.Fragment>
              )
            })
        ) : (
          <p className="font-medium text-gray-500">Nessun risultato trovato</p>
        )}
      </div>
    </div>
  )
}
