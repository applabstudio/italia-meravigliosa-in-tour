// @ts-nocheck

import React from "react"
import Event from "../../components/Event"
import { firestore } from "../../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"

const Provincia = ({ slug }: { slug: string }) => {
  const [listaEventi, listaEventiLoading, listaEventiError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const eventi = listaEventi?.docs?.filter((doc) => doc?.data()?.luogo === slug)

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <main className="flex w-full flex-col px-4">
        <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
          Eventi a {slug}
        </h4>

        <br />

        {eventi?.length > 0 ? (
          <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {eventi?.map((evento) => (
              <React.Fragment key={evento?.data()?.id}>
                <Event
                  image={evento?.data()?.copertina}
                  heading={evento?.data()?.titolo}
                  location={evento?.data()?.luogo}
                  btnText="Scopri di più"
                  to={`/eventi/${evento?.data()?.slug}`}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="font-semibold text-gray-500">
            Al momento non sono presenti eventi in questa provincia
          </p>
        )}
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

export default Provincia
