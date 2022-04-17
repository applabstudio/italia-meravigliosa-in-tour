// @ts-nocheck

import { collection } from "firebase/firestore"
import React, { useEffect, useRef, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { FaSearch } from "react-icons/fa"
import { firestore } from "../../firebase/clientApp"
import Event from "../Event"

const useOutsideAlerter = (ref: any, setFocused: Function) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

export const SearchBar = () => {
  const [listaEventi, listaEventiLoading, listaEventiError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [searchValue, setSearchValue] = useState("")
  const [focused, setFocused] = useState(false)

  const inputRef = useRef(null)
  useOutsideAlerter(inputRef, setFocused)

  return (
    <div ref={inputRef} className="relative z-40">
      <div className="group flex w-full items-center rounded-full bg-gray-100">
        <input
          type="text"
          className="form-input h-full w-full border-0 bg-transparent px-4 py-3 text-gray-800 caret-primary-500 outline-none placeholder:text-gray-400 focus:border-0 focus:ring-0"
          placeholder="Cerca un Evento..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setFocused(true)}
        />

        <button className="flex h-12 w-24 items-center justify-center rounded-full bg-primary-400 text-white outline-none ring-primary-200 ring-offset-2 transition duration-200 hover:scale-105 hover:bg-primary-500 focus:ring-2">
          <FaSearch />
        </button>
      </div>

      <div
        className={`${
          (!searchValue || !focused) && "hidden"
        } absolute top-16 left-0 z-50 max-h-96 w-full overflow-y-scroll rounded-md bg-white py-4 px-4 shadow-md transition-all`}
      >
        {listaEventi &&
        listaEventi?.docs?.filter((doc) =>
          doc?.data()?.titolo?.match(new RegExp(searchValue, "i"))
        )?.length > 0 ? (
          listaEventi?.docs
            ?.filter((doc) =>
              doc?.data()?.titolo?.match(new RegExp(searchValue, "i"))
            )
            .map((evento) => {
              return (
                <React.Fragment key={evento?.data()?.titolo}>
                  <Event
                    image={evento?.data()?.copertina}
                    heading={evento?.data()?.titolo}
                    location={evento?.data()?.luogo}
                    btnText="Scopri di più"
                    to={`/eventi/${evento?.data()?.slug}`}
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
