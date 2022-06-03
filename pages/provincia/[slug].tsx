// @ts-nocheck

import React, { useEffect, useState } from "react"
import Event from "../../components/Event"
import { firestore } from "../../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import LandingComponent from "../../components/LandingComponent"

const Provincia = ({ slug }: { slug: string }) => {

  
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [listaEventi, setListaEventi] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento" &&
        setListaEventi((listaEventi) => [...listaEventi, d.data()])
    })
  }, [data])

  const eventi = listaEventi.filter((doc) => doc?.luogo === slug)

  return (
    <LandingComponent  eventi={eventi} slug={slug}></LandingComponent>
  )
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params

  return {
    props: {
      slug,
    },
  }
}

export default Provincia
