import Image from "next/image"
import Link from "next/link"

const BannerAds = (): JSX.Element => {
  return (
    <>
      <div className="adscustom">
        <Link href="htts://mailto:info@italiameravigliosaintour.it">
          <a className="title-bannerads">Vorresti la tua pubblicita' qui?</a>
        </Link>

        <Image
          src="/images/Bullhorn.png"
          objectFit="contain"
          layout="intrinsic"
          width={100}
          height={100}
          alt="hand"
        />
        <Link href="htts://mailto:info@italiameravigliosaintour.it">
          <a className="btn-bannerads"> Contattaci</a>
        </Link>
      </div>
    </>
  )
}

export default BannerAds
