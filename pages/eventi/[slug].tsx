//@ts-nocheck

import { FaHeart, FaMapMarkerAlt, FaPlus } from "react-icons/fa"
import { useRouter } from "next/router";
import Comment from "../../components/common/Comment"
import { firestore } from "../../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { addDoc, collection } from "firebase/firestore"
import React, { useState, useContext, useEffect } from "react"
import WishContext, { EventProps } from "../../components/context/WishContext"
import DOMPurify from "isomorphic-dompurify"

const Evento = ({ slug }: { slug: string }) => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [eventi, setEventi] = useState<any[]>([])
  const [categorie, setCategorie] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento"
        ? setEventi((eventi) => [...eventi, d.data()])
        : setCategorie((categorie) => [...categorie, d.data()])
    })
  }, [data])

  const [listaCommenti, listaCommentiLoading, listaCommentiError] =
    useCollection(collection(firestore, "commenti"), {})

  const [nome, setNome] = useState("")
  const [commento, setCommento] = useState("")

  const evento = eventi?.filter((doc) => doc.slug === slug)[0]

  const listaCategorie = categorie?.filter((el) =>
    evento?.categorie.some((p) => p.id === el.id)
  )

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
  const router = useRouter();
  slug = router.query.slug;
  console.log("This is props", router.query);
  return (
    <div style={{marginTop:100}}>
      <div className="mx-auto my-8 max-w-6xl">
      {console.log(listaCategorie)}
      <main className="flex w-full flex-col xl:flex-row">
        <div className="flex w-full flex-col px-4">
          <div className="relative h-40 w-full">
            <img
              src={evento?.copertina}
              className="bannerImage h-full w-full object-cover"
              alt={evento?.titolo}
            />
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
          <br />
          <br />
          <div className="flex flex-col items-center lg:flex-row lg:space-x-12">
            <h4 className="mb-3 text-center text-5xl font-bold text-secondary-500 md:text-left">
              {evento?.titolo}
            </h4>

            <button
              onClick={() =>
                addToWish({
                  id: evento?.id,
                  image: evento?.copertina,
                  heading: evento?.titolo,
                  location: evento?.luogo,
                  to: `/eventi/${evento?.slug}`,
                })
              }
              className="flex items-center space-x-1 rounded-md bg-secondary-100 px-4 py-2 font-semibold text-secondary-500 outline-none ring-secondary-200 ring-offset-2 transition duration-200 hover:bg-secondary-200 focus:ring-2"
            >
              <FaHeart /> <span>Wishlist</span>
            </button>
          </div>
          <p className="mb-2 flex items-center space-x-1 text-sm text-gray-500">
            <FaMapMarkerAlt /> <span>{evento?.luogo}</span>
          </p>
          <p className="text-center text-lg font-semibold text-gray-800 md:text-left">
            {evento?.data}
          </p>
          <div className="mt-2 flex justify-center space-x-2 md:justify-start">
            {listaCategorie.map((categoria) => (
              <p className="rounded-sm bg-primary-100 px-2 font-medium text-primary-600">
                {categoria?.titolo.toLowerCase()}
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
                  __html: DOMPurify.sanitize(evento?.descrizione),
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
    </div>
    
  )
}

export default Evento
