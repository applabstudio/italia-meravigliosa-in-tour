import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import React from "react"

const Footer = () => {
  return (
    <footer>
     <div style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
                <Image
                  src="/images/logo.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={80}
                  height={80}
                  alt="hand"
                />
                  <Link href="https://www.facebook.com/istagram.paoloartista1/">
                  <a style={{position: "relative", bottom: 35}}>
                    <Image
                      src="/images/fblog.png"
                      objectFit="contain"
                      layout="intrinsic"
                      width={170}
                      height={170}
                      alt="hand"
                      className="fbicon" />
                  </a>
                </Link>

             <div className="copyright-wrapper">
                Copyright © 2022 Italia Meravigliosa in Tour, Tutti i
                    diritti sono riservati. | Powered by:
                    <Link href="https://applabstudio.com/">
                      <a>
                        <Image
                          src="/images/applab_logo.png"
                          objectFit="contain"
                          layout="intrinsic"
                          width={80}
                          height={20}
                          alt="hand" />
                        AppLab Studio
                      </a>
                    </Link>
                </div>
              </div>
    </footer>
  )
}

export default Footer
