// @ts-nocheck

import { collection } from "firebase/firestore"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa"
import { firestore } from "../../firebase/clientApp"
import Event from "../Event"
import { GoSettings } from "react-icons/go";
import axios from "axios"




// TODO finish modal button picker filter

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
  const [whishlistcard, setwhishlistcard] = useState(false)
  const [Collapsesetting, setCollapsesetting] = useState({
    collapse1:false,
    collapse2:false,
    collapse3:false,
    collapse4:false,
  })
  const [provience, setprovience] = useState([])
  const [startDate, setStartDate] = useState(new Date());
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
    axios.get('https://comuni-ita.herokuapp.com/api/province')
    .then(function (response) {
      // handle success
      setprovience(response.data);
    })
    .catch(function (error) {
      
      console.log("there is an error in the api");
    })
  
  }, [])

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
          <GoSettings size={20} style={{transform:"rotate(90deg)"}}  onClick={()=>{ setwhishlistcard(true)  }} />
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

      {whishlistcard ?    
                  <> 
                <div className="background-dilog" > </div>
          <div  className="block  overflow-y-auto   overflow-x-hidden fixed top-0 right-0 left-0 md:top-24   md:left-1/3   z-index-card  md:inset-0 h-modal md:h-full">
    <div className="relative p-4 w-full max-w-lg h-full md:h-auto  ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button"  onClick={()=>{ setwhishlistcard(false)  }} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
            </button>
            <div className="p-8 ">
                 {/*  collapse data started  */}
                 <div id="accordion-collapse" data-accordion="collapse">
  <h2 id="accordion-collapse-heading-1">
    <button type="button" onClick={()=> setCollapsesetting({...Collapsesetting, collapse1:!Collapsesetting.collapse1 }) }  className="flex  items-center p-5 w-full f-inter-b justify-center text-black rounded-t-xl border border-b-0 " data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>Regioni</span>
      <svg data-accordion-icon className={`w-6 h-6 ${ Collapsesetting.collapse1 ? "rotate-180" : "" }  shrink-0` }  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-1"    className={`${ Collapsesetting.collapse1 ? "block" : "hidden" }` } aria-labelledby="accordion-collapse-heading-1">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
     <button className="bg-green-main  py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " > Abruzzo</li>
       </ul>
       </button>
       <button className="bg-green-main mt-3 py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " > Basilicata</li>
       </ul>
       </button>
       <button className="bg-green-main mt-3 py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " > Basilicata</li>
       </ul>
       </button>
       <button className="bg-green-main mt-3 py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " > Campania</li>
       </ul>
       </button>
       <button className="bg-green-main mt-3 py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " > Emilia-Romagna</li>
       </ul>
       </button>
       <button className="bg-green-main mt-3 py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " >Friuli Venezia Giulia</li>
       </ul>
       </button>
       <button className="bg-green-main mt-3 py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " >Lazio</li>
       </ul>
       </button>

     
    </div>
  </div>
  <h2 id="accordion-collapse-heading-2">
  <button type="button" onClick={()=> setCollapsesetting({...Collapsesetting, collapse2:!Collapsesetting.collapse2 }) }  className="flex  items-center p-5 w-full f-inter-b justify-center text-black  border border-b-0 " data-accordion-target="#accordion-collapse-heading-2" aria-expanded="true" aria-controls="accordion-collapse-heading-2">
      <span>Province</span>
      <svg data-accordion-icon className={`w-6 h-6 ${ Collapsesetting.collapse2 ? "rotate-180" : "" }  shrink-0` } fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-heading-2" className={`${ Collapsesetting.collapse2 ? "block" : "hidden" }` } aria-labelledby="accordion-collapse-heading-2">
  <div className="p-5 border h-52 overflow-y-scroll  border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
    { provience.map((data)=>{
          return <>
          <button className="bg-green-main mt-3 py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
      {data.nome} {data.regione}
       </button>
          </>
    })}
    

    
     
    </div>
  </div>
  <h2 id="accordion-collapse-heading-2">
  <button type="button" onClick={()=> setCollapsesetting({...Collapsesetting, collapse3:!Collapsesetting.collapse3 }) }  className="flex  items-center p-5 w-full f-inter-b justify-center   text-black    border border-b-0 " data-accordion-target="#accordion-collapse-heading-2" aria-expanded="true" aria-controls="accordion-collapse-heading-2">
      <span>Categorie</span>
      <svg data-accordion-icon className={`w-6 h-6 ${ Collapsesetting.collapse3 ? "rotate-180" : "" }  shrink-0` } fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-heading-2" className={`${ Collapsesetting.collapse3 ? "block" : "hidden" }` } aria-labelledby="accordion-collapse-heading-2">
  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
     <button className="bg-green-main  py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " >  Nature</li>
       </ul>
       </button>
       <button className="bg-green-main mt-3 py-2 w-full rounded-lg  text-green-dark text-sm f-inter-b "  >
       <ul className="flex justify-center" >
        <li> <img src="/images/abruzzo.png"  height="32px" width="42px" />  </li>
        <li className=" pt-2  " > Water</li>
       </ul>
       </button>
     
    </div>
  </div>
  <h2 id="accordion-collapse-heading-2">
  <button type="button" onClick={()=> setCollapsesetting({...Collapsesetting, collapse4:!Collapsesetting.collapse4 }) }  className="flex  items-center p-5 w-full f-inter-b justify-center   text-black        border  " data-accordion-target="#accordion-collapse-heading-2" aria-expanded="true" aria-controls="accordion-collapse-heading-2">
      <span>Data</span>
      <svg data-accordion-icon className={`w-6 h-6 ${ Collapsesetting.collapse4 ? "rotate-180" : "" }  shrink-0` } fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-heading-2" className={`${ Collapsesetting.collapse4 ? "block" : "hidden" }` } aria-labelledby="accordion-collapse-heading-2">
  <div className="p-5 border border-t-0  border-gray-200 dark:border-gray-700 dark:bg-gray-900">


  <input type="date" id="start" name="trip-start"
       value="2022-07-22"
       min="2018-01-01" max="2022-12-31" className="w-full border-gray-200 " autofocus  />

      
     
    </div>
  </div>
</div>
                 {/*  collapse data ended  */}
            </div>
        </div>
    </div>
</div>
</>  : "" } 
    </div>
  )
}
