// @ts-nocheck
import { collection } from "firebase/firestore"
import React, { useEffect, useRef, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { FaAngleDown, FaAngleUp, FaSearch, FaTimes } from "react-icons/fa"
import { firestore } from "../../firebase/clientApp"
import Event from "../Event"
import { GoSettings } from "react-icons/go"

const regions = [
  {
    name: "Abruzzo",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "abruzzo",
  },
  {
    name: "Basilicata",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "basilicata",
  },
  {
    name: "Calabria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "calabria",
  },
  {
    name: "Campania",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "campania",
  },
  {
    name: "Emilia-Romagna",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "emilia-romagna",
  },
  {
    name: "Friuli-Venezia Giulia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "friuli-venezia-giulia",
  },
  {
    name: "Lazio",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "lazio",
    slug: "lazio",
  },
  {
    name: "Liguria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "liguria",
  },
  {
    name: "Lombardia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "lombardia",
  },
  {
    name: "Marche",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "marche",
  },
  {
    name: "Molise",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "molise",
  },
  {
    name: "Piemonte",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "piemonte",
  },
  {
    name: "Puglia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "puglia",
  },
  {
    name: "Sardegna",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "sardegna",
  },
  {
    name: "Sicilia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "sicilia",
  },
  {
    name: "Toscana",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "toscana",
  },
  {
    name: "Trentino-Alto Adige",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "trentino-alto-adige",
  },
  {
    name: "Umbria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "umbria",
  },
  {
    name: "Valle d'Aosta",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "valle-d-aosta",
  },
  {
    name: "Veneto",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "veneto",
  },
]

// TODO finish modal button picker filter
interface Props {
  ref: any
  setFocused: Function
  setFiltered: Function
}
const useOutsideAlerter: React.FC<Props> = (ref, setFocused, setFiltered) => {
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
  const [province, setProvince] = useState<any[]>([])

  const [regioniOpen, setRegioniOpen] = useState(false)
  const [provinceOpen, setProvinceOpen] = useState(false)
  const [categorieOpen, setCategorieOpen] = useState(false)

  useEffect(() => {
    data?.docs.forEach((d) => {
      if (d.data()._fl_meta_.schema === "evento") {
        setListaEventi((listaEventi) => [...listaEventi, d.data()])

        if (!province.includes(d.data().luogo)) {
          setProvince((province) => [...province, d.data().luogo])
        }
      } else {
        setCategorie((categorie) => [...categorie, d.data()])
      }
    })
  }, [data])

  const [searchValue, setSearchValue] = useState("")
  const [focused, setFocused] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [categoria, setCategoria] = useState("")
  const [region, setRegion] = useState("")
  const [provincia, setProvincia] = useState("")

  const inputRef = useRef(null)
  useOutsideAlerter(inputRef, setFocused, setFiltered)

  return (
    <div ref={inputRef} className="relative z-40 w-full">
      <div className="searchInput group flex w-full items-center rounded-full">
        {/* <button
          onClick={() => focused && setFiltered(!filtered)}
          className={`flex h-12 w-16 items-center justify-center ${
            filtered ? "text-primary-400" : "text-gray-400"
          }`}
        >
          <GoSettings size={20} style={{ transform: "rotate(90deg)" }} />
        </button> */}

        {categoria !== "" && (
          <button
            onClick={() => setCategoria("")}
            className="flex w-fit items-center space-x-1 rounded-md bg-primary-100 px-2 text-sm font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
          >
            <span>{categoria}</span>
            <FaTimes size={20} />
          </button>
        )}

        {region !== "" && (
          <button
            onClick={() => setRegion("")}
            className="flex w-fit items-center space-x-1 rounded-md bg-primary-100 px-2 text-sm font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
          >
            <span>{region}</span>
            <FaTimes size={20} />
          </button>
        )}

        {provincia !== "" && (
          <button
            onClick={() => setProvincia("")}
            className="flex w-fit items-center space-x-1 rounded-md bg-primary-100 px-2 text-sm font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
          >
            <span>{provincia}</span>
            <FaTimes size={20} />
          </button>
        )}

        <input
          type="text"
          className="form-input h-full w-full border-0 bg-transparent px-4 py-3 caret-primary-500 outline-none placeholder:text-gray-400 focus:border-0 focus:ring-0"
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
        <div className="space-y-3">
          {filtered && (
            <div
              className="grid grid-cols-1 gap-2"
              onClick={() => setRegioniOpen(!regioniOpen)}
            >
              <div className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-gray-100 py-3 text-lg font-medium hover:bg-gray-200">
                <span>Regioni</span>{" "}
                {regioniOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {regioniOpen &&
                regions?.map((el) => (
                  <button
                    key={el?.name}
                    onClick={() => setRegion(el?.name)}
                    className="w-full rounded-md bg-primary-100 py-1 px-2 text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
                  >
                    {el?.name}
                  </button>
                ))}
            </div>
          )}

          {categorie?.length > 0 && filtered && (
            <div
              className="grid grid-cols-1 gap-2"
              onClick={() => setProvinceOpen(!provinceOpen)}
            >
              <div className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-gray-100 py-3 text-lg font-medium hover:bg-gray-200">
                <span>Province</span>{" "}
                {provinceOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {provinceOpen &&
                province?.map((el) => (
                  <button
                    key={el}
                    onClick={() => setProvincia(el)}
                    className="w-full rounded-md bg-primary-100 py-1 px-2 text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
                  >
                    {el}
                  </button>
                ))}
            </div>
          )}

          {categorie?.length > 0 && filtered && (
            <div
              className="grid grid-cols-1 gap-2"
              onClick={() => setCategorieOpen(!categorieOpen)}
            >
              <div className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-gray-100 py-3 text-lg font-medium hover:bg-gray-200">
                <span>Categorie</span>{" "}
                {categorieOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {categorieOpen &&
                categorie?.map((cat) => (
                  <button
                    key={cat?.titolo}
                    onClick={() => setCategoria(cat?.titolo.toLowerCase())}
                    className="w-full rounded-md bg-primary-100 py-1 px-2 text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
                  >
                    {cat?.titolo}
                  </button>
                ))}
            </div>
          )}
        </div>

        {listaEventi &&
        listaEventi?.filter((doc) => {
          let cats = []

          doc?.categorie?.forEach((c) => {
            cats.push(
              categorie?.filter((l) => l?.id === c?.id)[0]?.titolo.toLowerCase()
            )
          })

          return doc?.titolo
            ?.toLowerCase()
            .match(new RegExp(searchValue, "i")) &&
            categoria === "" &&
            region === "" &&
            provincia === ""
            ? true
            : cats
                .map((el) => el.replace(/\s/g, "").toLowerCase())
                .includes(categoria) ||
                doc.region === region ||
                doc.luogo === provincia
        })?.length > 0 ? (
          listaEventi
            ?.filter((doc) => {
              let cats = []

              doc?.categorie?.forEach((c) => {
                cats.push(
                  categorie
                    ?.filter((l) => l?.id === c?.id)[0]
                    ?.titolo.toLowerCase()
                )
              })

              return categoria !== "" && region === "" && provincia === ""
                ? doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) &&
                    cats.includes(categoria)
                : categoria !== "" && region !== "" && provincia !== ""
                ? doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) &&
                  cats.includes(categoria) &&
                  doc.region === region &&
                  doc.luogo === provincia
                : categoria !== "" && region !== "" && provincia === ""
                ? doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) &&
                  cats.includes(categoria) &&
                  doc.region === region
                : categoria === "" && region !== "" && provincia !== ""
                ? doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) &&
                  doc.region === region &&
                  doc.luogo === provincia
                : categoria === "" && region !== "" && provincia === ""
                ? doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) &&
                  doc.region === region
                : categoria !== "" && region === "" && provincia !== ""
                ? doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) &&
                  cats.includes(categoria) &&
                  doc.luogo === provincia
                : categoria !== "" && region === "" && provincia === ""
                ? doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) &&
                  cats.includes(categoria)
                : categoria === "" && region === "" && provincia !== ""
                ? doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) &&
                  doc.luogo === provincia
                : doc?.titolo
                    ?.toLowerCase()
                    .match(new RegExp(searchValue, "i")) ||
                  cats.includes(categoria)
            })
            .map((evento) => {
              return (
                <React.Fragment key={evento?.titolo}>
                  <Event
                    image={evento?.copertina}
                    heading={evento?.titolo}
                    location={evento?.luogo}
                    icon={evento?.categorie?.at(0)?.id}
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
