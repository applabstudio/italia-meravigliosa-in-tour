//@ts-nocheck

import { FaHeart, FaMapMarkerAlt, FaPlus } from "react-icons/fa"
import Comment from "../../components/common/Comment"
import { firestore } from "../../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { addDoc, collection } from "firebase/firestore"
import React, { useState, useContext } from "react"
import WishContext, { EventProps } from "../../components/context/WishContext"
import DOMPurify from "isomorphic-dompurify"

const Evento = ({ slug }: { slug: string }) => {
  const [eventi, eventiLoading, eventiError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [listaCommenti, listaCommentiLoading, listaCommentiError] =
    useCollection(collection(firestore, "commenti"), {})

  const [nome, setNome] = useState("")
  const [commento, setCommento] = useState("")

  const evento = eventi?.docs?.filter((doc) => doc.data().slug === slug)[0]
  const commenti = listaCommenti?.docs?.filter(
    (doc) => doc.data().slug === slug
  )

  const uploadComment = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (commento != "" && nome != "") {
      addDoc(collection(firestore, "commenti"), {
        slug: slug,
        nome: nome,
        testo: commento,
      }).then(() => {
        setNome("")
        setCommento("")
      })
    }
  }

  const { add } = useContext(WishContext)

  const addToWish = (event: EventProps) => {
    if (add) {
      add(event)
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <main className="flex w-full flex-col xl:flex-row">
        <div className="flex w-full flex-col px-4">
          <div className="relative h-40 w-full">
            <img
              src={evento?.data()?.copertina}
              className="bannerImage h-full w-full object-cover"
              alt={evento?.data()?.titolo}
            />
          </div>
          <br />
          <br />

          <div className="flex flex-col items-center lg:flex-row lg:space-x-12">
            <h4 className="mb-3 text-center text-5xl font-bold text-secondary-500 md:text-left">
              {evento?.data()?.titolo}
            </h4>

            <button
              onClick={() =>
                addToWish({
                  id: evento?.data().id,
                  image: evento?.data().copertina,
                  heading: evento?.data().titolo,
                  location: evento?.data().luogo,
                  to: `/eventi/${evento?.data()?.slug}`,
                })
              }
              className="flex items-center space-x-1 rounded-md bg-secondary-100 px-4 py-2 font-semibold text-secondary-500 outline-none ring-secondary-200 ring-offset-2 transition duration-200 hover:bg-secondary-200 focus:ring-2"
            >
              <FaHeart /> <span>Wishlist</span>
            </button>
          </div>

          <p className="mb-2 flex items-center space-x-1 text-sm text-gray-500">
            <FaMapMarkerAlt /> <span>{evento?.data()?.luogo}</span>
          </p>

          <p className="text-center text-lg font-semibold text-gray-800 md:text-left">
            {evento?.data().data}
          </p>

          <div className="mt-2 flex justify-center space-x-2 md:justify-start">
            {evento
              ?.data()
              .categorie.split(",")
              .map((categoria) => (
                <p className="rounded-sm bg-primary-100 px-2 font-medium text-primary-600">
                  {categoria.toLowerCase()}
                </p>
              ))}
          </div>

          <br />
          <hr />
          <br />

          <div className="grid grid-cols-1 space-y-20 lg:grid-cols-12 lg:space-y-0">
            <div className="col-span-6 flex w-full flex-col">
              <p
                className="prose prose-red"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(evento?.data()?.descrizione),
                }}
              />
            </div>

            <div className="col-span-5 w-full lg:ml-20">
              <h4 className="mb-4 text-xl font-semibold text-gray-800">
                {commenti?.length < 2
                  ? `${commenti?.length} commento`
                  : commenti?.length < 1 || commenti?.length === undefined
                  ? `0 commenti`
                  : `${commenti?.length} commenti`}
              </h4>

              {commenti?.map((commento, i: number) => (
                <React.Fragment key={commento.data().nome + i}>
                  <Comment
                    user={commento.data().nome}
                    text={commento.data().testo}
                  />
                </React.Fragment>
              ))}

              <br />

              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-500">
                  Lascia un commento
                </p>
                <form>
                  <input
                    className="form-input mb-4 w-full rounded-lg border-gray-400 py-1 text-gray-800 caret-secondary-500 outline-none placeholder:text-gray-400 focus:border-secondary-500 focus:ring-0"
                    type="text"
                    placeholder="nome..."
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />

                  <textarea
                    rows={4}
                    className="form-textarea mb-4 w-full rounded-lg border-gray-400 py-1 text-gray-800 caret-secondary-500 outline-none placeholder:text-gray-400 focus:border-secondary-500 focus:ring-0"
                    placeholder="commento..."
                    value={commento}
                    onChange={(e) => setCommento(e.target.value)}
                  />

                  <button
                    onClick={uploadComment}
                    className="group relative inline-block overflow-hidden rounded bg-purple-50 px-5 py-2.5 font-medium text-secondary-500 outline-none ring-secondary-500 ring-offset-2 transition-all duration-200 focus:ring-2"
                    type="submit"
                  >
                    <span className="absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform bg-secondary-500 opacity-90 transition-all duration-200 ease-out group-hover:h-full"></span>
                    <span className="relative group-hover:text-white">
                      Invia
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
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

export default Evento
