import { NextPage } from "next"
import Contatti from "../components/Contatti"
import Footer from "../components/Footer"
import BannerAds from "../components/layout/BannerAds"
import FacebookSection from "../components/layout/FacebookSection"
import Mission from "../components/layout/Mission"
import Newsletter from "../components/Newsletter"
import Pixel from "../components/Pixel"

const ChiSiamo: NextPage = () => {
  const ADSENSE_PUBLISHER_KEY = "ca-pub-7292810486004926"
  const ADSENSE_SLOT = "7610040244"
  return (
    <>
      <FacebookSection />

      <Mission />
      <div className="mx-auto max-w-7xl" id="work-with-us-section">
        <main className="grid w-full grid-cols-12 space-y-12 space-x-4">
          <div className="col-span-12 px-4">
            <div className="flex flex-col items-center">
              <h1 className="workwithus pt-20 pb-14 text-center text-6xl font-bold">
                VUOI COLLABORARE CON NOI?
              </h1>
              <p className="infoGray w-[80%] text-center text-lg font-medium text-gray-500">
                Italia Meravigliosa offre l’opportunità di collaborare con la
                nostra redazione, se sei un fotografo, un videomaker oppure un
                blogger di viaggio, contattaci ed entra a far parte del nostro
                team, fai conoscere il tuo lavoro attraverso la nostra grande e
                coesa community
              </p>
            </div>

            <h4 className="mt-24 pb-10 text-center text-4xl font-bold md:text-left">
              Contatti
            </h4>
            <Contatti />
          </div>
          <Newsletter />
          <div
            className="col-span-12 rounded-lg p-6"
            style={{ marginBottom: 20 }}
          ></div>

          <div
            className="col-span-12 !m-0"
            style={{
              width: "100%",
            }}
          >
            <div
              className="mx-auto max-w-7xl text-center"
              style={{
                width: "100%",
                display: "flex",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                flexDirection: "column",
                alignItems: "center",
              }}
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
              <Footer />
              <Pixel name="FACEBOOK_PIXEL_1" />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ChiSiamo
