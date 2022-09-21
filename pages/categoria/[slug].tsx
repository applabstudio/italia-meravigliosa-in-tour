// @ts-nocheck
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { NextPage } from "next"
import Event from "../../components/Event"
import { firestore } from "../../firebase/clientApp"
import BannerAds from "../../components/layout/BannerAds"
import SeoHead from "../../components/Seo/SeoHead"

const Categoria: NextPage = ({ slug }: { slug: string }) => {
  const router = useRouter()
  slug = router.query.slug
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [page, setPage] = useState(1)
  const [listaEventi, setListaEventi] = useState<any[]>([])
  const [categorie, setCategorie] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento"
        ? setListaEventi((listaEventi) => [...listaEventi, d.data()])
        : setCategorie((categorie) => [...categorie, d.data()])
    })
  }, [data])

  const categoria = categorie?.find(
    (el) => el.titolo.toLowerCase() === slug.toLowerCase()
  )

  const eventi = listaEventi?.filter((doc) =>
    doc?.categorie
      .map((el) => el.id.replace("/fl_content", ""))
      .includes(categoria?.id)
  )

  const ADSENSE_PUBLISHER_KEY = "ca-pub-2997320138881950"
  const ADSENSE_SLOT = "7610040244"

  return (
    <div className="mx-auto mt-32 max-w-6xl">
      <meta name="description" content="this is categoria page." />
      <meta property="og:image" itemProp="image" content="/apple-touch-icon.png" />

      <meta property="og:type" content="website" />
      <meta property="og:image:type" content="image/png" />

      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />

      <meta property="og:url" content="https://www.italiameravigliosaintour.it" />
      <SeoHead title="categoria" imageUrl="/apple-touch-icon.png" />

      
      <main className="flex w-full flex-col px-4">
        {/* <div className="w-full bg-gray-100">
          <p className="mt-2 ml-2 rounded-lg text-gray-500">Pubblicità</p>

          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1708355893696705"
            data-ad-slot="9487119343"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div> */}

        <br />

        <h4 className="text-center text-4xl font-bold leading-[3.5rem] md:text-left">
          Luoghi con categoria:{" "}
          <span className="rounded-md bg-primary-100 px-2 text-primary-600">
            {slug}
          </span>
        </h4>

        <br />

        {eventi?.length > 0 ? (
          <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {eventi?.slice(9 * page - 9, 9 * page).map((evento) => (
              <React.Fragment key={evento?.id}>
                <Event
                  image={evento?.copertina}
                  heading={evento?.titolo}
                  icon={categoria?.id}
                  location={evento?.luogo}
                  btnText="Scopri di più"
                  to={`/eventi/${evento?.slug}`}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="font-semibold text-gray-500">
            {/* Attendere... Al momento non sono presenti luoghi con questa categoria */}
            Caricamento...
          </p>
        )}

        <br />
        <br />

        <div className="mx-auto flex space-x-2">
          {Array.from(Array(Math.round(eventi.length / 9)).keys()).map((el) => (
            <div
              onClick={() => setPage(el + 1)}
              className={`${
                page === el + 1
                  ? "border-primary-500 text-primary-500"
                  : "border-gray-300"
              } flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 text-lg font-semibold`}
            >
              <span>{el + 1}</span>
            </div>
          ))}
        </div>

        <br />
        <br />

        <div
          className="col-span-12 !m-0"
          style={{
            width: "100%",
          }}
        >
          <div
            className="mx-auto max-w-7xl"
            style={{
              width: "100%",
              display: "flex",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="text-center"
          >
            <div>
              <ins
                className="adsbygoogle"
                style={{ display: "block", textAlign: "center" }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client={ADSENSE_PUBLISHER_KEY}
                data-ad-slot={ADSENSE_SLOT}
              ></ins>
            </div>
            <BannerAds />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Categoria
