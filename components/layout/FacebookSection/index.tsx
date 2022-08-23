import Image from "next/image"
import Link from "next/link"
import {
  PhotographIcon,
  StarIcon,
  ThumbUpIcon,
  TicketIcon,
} from "@heroicons/react/outline"
import { FaHeart, FaFacebook } from "react-icons/fa"

const FacebookSection = (): JSX.Element => {
  const alignSelf = {
    alignSelf: "center",
  }

  return (
    <>
      <div
        className="facebook-mobile col-span-12"
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          padding: 15,
        }}
      >
        <div className="facebook_text_grid_width mb-10" style={alignSelf}>
          <h4 className="text facebook_text leading-10">
            SEGUICI SU FACEBOOK SIAMO OLTRE 250 MILA
          </h4>
          <div className="facebook-mobile-icon flex flex-col space-y-4  lg:flex-row lg:items-center lg:space-y-0">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #1e90ff",
                maxHeight: 43,
                borderRadius: 6,
                padding: 14,
                margin: "16px 0",
                maxWidth: 264,
                alignSelf: "center",
              }}
              className="wrapperUsername"
            >
              <FaFacebook style={{ color: "007aff", fontSize: 24 }} />
              <Link
                href="https://www.facebook.com/istagram.paoloartista1/"
                target="_blank"
              >
                <a
                  style={{
                    margin: "0 !important",
                    paddingLeft: 10,
                    paddingTop: 20,
                    paddingBottom: 20,
                    color: "#007aff",
                  }}
                  title="Pagina Facebook"
                >
                  @istagram.paoloartista1
                </a>
              </Link>
            </div>
          </div>
          <div className="fbListWrapper">
            <ul
              style={{ paddingBottom: 40, alignItems: "flex-start" }}
              className="flex flex-row items-center justify-evenly space-y-1 font-semibold lg:flex-col lg:items-start"
            >
              <li className="facebook-list">
                <div className="markerList"></div>Post spettacolari e unici
              </li>
              <li className="facebook-list">
                <div className="markerList"></div>Community
              </li>
              <li className="facebook-list">
                <div className="markerList"></div>Share
              </li>
            </ul>
          </div>

          <div className="heartIconWrapper flex w-fit items-center space-x-2 rounded-lg py-2 text-lg font-semibold text-blue-600">
            <FaHeart />
            <span style={{ fontSize: 12 }}>
              Milioni di utenti salvano luoghi meravigliosi
            </span>
          </div>
        </div>

        <div className="facebook_text_grid_width hide_mobile">
          <br />

          <div className="grid grid-cols-12">
            <div
              className="box col-span-7 text-right"
              style={{ alignSelf: "center" }}
            >
              <Image
                src="/images/card1.png"
                objectFit="contain"
                layout="intrinsic"
                width={250}
                height={300}
                alt="hand"
                className="cards"
              />
            </div>
          </div>
        </div>

        <div className="facebook_text_grid_width view_mobile !space-y-8">
          <Image
            src="/images/card1.png"
            objectFit="contain"
            layout="intrinsic"
            width={300}
            height={300}
            alt="hand"
            className="rounded-2xl"
          />
        </div>
      </div>
      <div className="col-span-12 box-border flex flex-col xl:col-span-12">
        <div
          className="xl:col-span-5"
          style={{ alignSelf: "center", background: "red" }}
        ></div>
        <div className="xl:col-span-6"></div>
      </div>
      <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
        <h1
          className="user-active text-center text-5xl lg:text-7xl"
          style={{ fontWeight: "700" }}
        >
          1M+ Utenti Giornalieri
        </h1>
      </div>
      <br />
      <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12">
          <div className="infoBox xl:col-span-3" style={{ borderLeft: "none" }}>
            <PhotographIcon className="mb-2" width={30} height={30} />
            <p className="infoGray mb-2 text-center text-lg font-medium tracking-widest">
              FOTO
            </p>
            <p className="text-center text-2xl font-semibold">+50K</p>
          </div>
          <div className="infoBox xl:col-span-3">
            <ThumbUpIcon className="mb-2" width={30} height={30} />
            <p className="infoGray mb-2 text-center text-lg font-medium tracking-widest">
              INTERAZIONI
            </p>
            <p className="text-center text-2xl font-semibold">+15M</p>
          </div>
          <div className="infoBox xl:col-span-3">
            <TicketIcon className="mb-2" width={30} height={30} />
            <p
              className="infoGray mb-2 text-center text-lg font-medium tracking-widest"
              style={{ width: "50%" }}
            >
              LUOGHI MERAVIGLIOSI
            </p>
            <p className="text-center text-2xl font-semibold">+1000</p>
          </div>
          <div
            className="infoBox xl:col-span-3"
            style={{ borderRight: "none" }}
          >
            <StarIcon className="mb-2" width={30} height={30} />
            <p className="infoGray mb-2 text-center text-lg font-medium tracking-widest">
              COLLABORAZIONI
            </p>
            <p className="text-center text-2xl font-semibold">+50</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FacebookSection
