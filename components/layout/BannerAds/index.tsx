import * as React from "react"
import Image from "next/image"
import Link from "next/link"

const BannerAds = () => {
  return (
    <>
      <div className="adscustom">
        <p>Vorresti la tua pubblicita' qui?</p>
        <Image
          src="/images/Bullhorn.png"
          objectFit="contain"
          layout="intrinsic"
          width={100}
          height={100}
          alt="hand"
        />
        <Link href="/#work-with-us-section">
          <a className="btn-bannerads"> Contattaci</a>
        </Link>
      </div>
    </>
  )
}

export default BannerAds
