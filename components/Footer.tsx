import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import React from "react"

const Footer = () => {
  return (
    <footer>
      <div
        style={{ display: "flex", alignItems: "center", flexFlow: "column" }}
        className="!m-0 rounded-xl bg-white py-6"
      >
        <Image
          src="/images/fullLogo.png"
          objectFit="contain"
          layout="intrinsic"
          width={210}
          height={80}
          alt="hand"
        />
        <Link href="https://www.facebook.com/istagram.paoloartista1/">
          <a style={{ position: "relative", bottom: 35 }}>
            <Image
              src="/images/fblog.png"
              objectFit="contain"
              layout="intrinsic"
              width={200}
              height={200}
              alt="hand"
              className="fbicon"
            />
          </a>
        </Link>

        <div className="copyright-wrapper">
          <span>
            Copyright © 2022 Italia Meravigliosa in Tour, Tutti i diritti sono
            riservati. | Powered by:
          </span>

          <br />
          <br />
          <Link href="https://applabstudio.com/">
            <a>
              <Image
                src="/images/applab_logo2.png"
                objectFit="contain"
                layout="intrinsic"
                width={150}
                height={60}
                alt="hand"
              />
              AppLab Studio
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
