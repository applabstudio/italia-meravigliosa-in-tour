import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import React from "react"
import { FaEnvelope } from "react-icons/fa"

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

        <div style={{ display: "flex", alignItems: "center"}}>
          <FaEnvelope color="gray" />{" "}
          <Link href="mailto:info@italiameravigliosaintour.it">
            
            <a className="footer-email">info@italiameravigliosaintour.it</a>
          </Link>
          


        </div>

        <br />

        <Link href="https://www.iubenda.com/privacy-policy/76997417" title="Privacy Policy">
           <a className="iubenda">Privacy Policy</a>
          </Link>

          <Link href="https://www.iubenda.com/termini-e-condizioni/76997417">
           <a className="iubenda">Termini e Condizioni</a>
          </Link>
        <br />

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
                width={80}
                height={30}
                alt="hand"
              />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
