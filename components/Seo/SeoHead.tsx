import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

interface Props {
  title?: string
  description?: string
  imageUrl?: string
}

const SeoHead: React.FC<Props> = ({
  title,
  description,
  imageUrl,
}): JSX.Element => {
  const router = useRouter()
  const Seo = {
    title: title ? title : "italia meravigliosa in tour",
    siteName: "italia meravigliosa in tour",
    siteUrl:
      router.asPath === "/"
        ? "https://www.italiameravigliosaintour.it"
        : `https://www.italiameravigliosaintour.it${router.asPath}`,
    description: description ? description : "",
    imageUrl: imageUrl ? imageUrl : "",
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {/* General and Facebook and Twitter*/}
      {Seo.siteName && <meta itemProp="name" content={Seo.siteName} />}
      <meta property="og:type" content="website" />

      {/* Title */}
      {Seo.title && (
        <>
          <title>{Seo.title}</title>
          <meta property="og:site_name" content={Seo.title} />
          <meta property="og:title" content={Seo.title + "|" + Seo.siteName} />
          <meta name="twitter:title" content={Seo.title + "|" + Seo.siteName} />
        </>
      )}

      {/* site Url */}
      {Seo.siteUrl && (
        <>
          <meta itemProp="url" content={Seo.siteUrl} />
          <meta name="twitter:url" content={Seo.siteUrl} />
          <meta property="og:url" content={Seo.siteUrl} />
        </>
      )}

      {/* Seo Description */}
      {Seo.description && (
        <>
          <meta itemProp="description" content={Seo.description} />
          <meta property="og:description" content={Seo.description} />
          <meta name="twitter:description" content={Seo.description} />
        </>
      )}

      {/* Post Image */}
      {Seo.imageUrl && (
        <>
          <link rel="image_src" href={Seo.imageUrl} />
          <meta itemProp="image" content={Seo.imageUrl} />
          <meta itemProp="thumbnailUrl" content={Seo.imageUrl} />
          <meta property="og:image" content={Seo.imageUrl} />
          <meta name="twitter:card" content={Seo.imageUrl} />
          <meta name="twitter:image" content={Seo.imageUrl} />
        </>
      )}
    </Head>
  )
}

export default SeoHead
