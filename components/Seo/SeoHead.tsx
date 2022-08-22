import Head from "next/head"
import { useRouter } from "next/router"

interface Props {
  title?: string
  description?: string
  imageUrl?: string
}

const SeoHead = ({ title, description, imageUrl }: Props) => {
  const router = useRouter()
  const Seo = {
    title: title ? title : "",
    siteName: "italia meravigliosa in tour",
    siteUrl:router.asPath === '/'? "https://www.italiameravigliosaintour.it/":`https://www.italiameravigliosaintour.it/${router.asPath}`,
    description: description ? description : "",
    imageUrl: imageUrl ? imageUrl : "",
  }

  return (
    <Head>
      {/* General */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <title>{Seo.title}</title>
      <meta itemProp="name" content={Seo.siteName} />
      <meta itemProp="url" content={Seo.siteUrl + } />
      <meta itemProp="description" content={Seo.description} />
      <link rel="image_src" href={Seo.imageUrl} />
      <meta itemProp="image" content={Seo.imageUrl} />
      <meta itemProp="thumbnailUrl" content={Seo.imageUrl} />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={Seo.title} />
      <meta property="og:title" content={Seo.title + "|" + Seo.siteName} />
      <meta property="og:url" content={Seo.siteUrl} />
      <meta property="og:description" content={Seo.description} />
      <meta property="og:image" content={Seo.imageUrl} />

      {/* twitter */}
      <meta name="twitter:card" content={Seo.imageUrl} />
      <meta name="twitter:title" content={Seo.title + "|" + Seo.siteName} />
      <meta name="twitter:image" content={Seo.imageUrl} />
      <meta name="twitter:url" content={Seo.siteUrl} />
      <meta name="twitter:description" content={Seo.description} />
    </Head>
  )
}

export default SeoHead
