// @ts-nocheck

import React, { useEffect, useState } from "react"
import Event from "../../components/Event"
import { firestore } from "../../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"

const Categoria = ({ slug }: { slug: string }) => {
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

  const categoria = categorie?.find((el) => el.titolo === slug.toLowerCase())

  const eventi = listaEventi?.filter((doc) =>
    doc?.categorie
      .map((el) => el.id.replace("/fl_content", ""))
      .includes(categoria?.id)
  )

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <main className="flex w-full flex-col px-4">
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

        <br />

        <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
          Eventi con categoria:{" "}
          <span className="rounded-md bg-primary-100 px-2 text-primary-600">
            {slug}
          </span>
        </h4>

        <br />

        {eventi?.length > 0 ? (
          <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {eventi?.map((evento) => (
              <React.Fragment key={evento?.id}>
                <Event
                  image={evento?.copertina}
                  heading={evento?.titolo}
                  location={evento?.luogo}
                  btnText="Scopri di più"
                  to={`/eventi/${evento?.slug}`}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="font-semibold text-gray-500">
            Al momento non sono presenti eventi con questa categoria
          </p>
        )}

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

export async function getServerSideProps(context: any) {
  const { slug } = context.params

  return {
    props: {
      slug,
    },
  }
}

export default Categoria
