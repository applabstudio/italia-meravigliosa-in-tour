import { useRouter } from "next/router"
import React from "react"
import { NextSeo } from "next-seo"
import { useState } from "react"

interface Props {
  title?: string
  description?: string
  imageUrl?: string
}

const SeoHead: React.FC<Props> = ({ title, description, imageUrl }) => {
  const [preview, setPreview] = useState()
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
    <NextSeo
      title={Seo.title}
      description={Seo.description}
      canonical={Seo.siteUrl}
      openGraph={{
        url: `${Seo.siteUrl}`,
        title: `${Seo.title}`,
        description: `${Seo.description}`,
        images: [
          {
            url: `${Seo.imageUrl}`,
            width: 800,
            height: 600,
            alt: `${Seo.title}`,
            type: "image/jpeg",
          },
        ],
        site_name: `${Seo.siteName}`,
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  )
}

export default SeoHead
