import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { useIsMounted } from "../../services/useIsMounted"
import { FaUser } from "react-icons/fa"

export default function Tabbar({}) {
  const router = useRouter()
  const isMounted = useIsMounted()

  const [homeHover, setHomeHover] = useState<any>("home")
  const [infoHover, setInfoHover] = useState<any>("info")
  const [workHover, setWorkHover] = useState<any>("work")
  const [heartHover, setHeartHover] = useState<any>("heart")
  const [searchHover, setSearchHover] = useState<any>("search")

  const [selectedTab, setSelectedTab] = useState<string>("")

  useEffect(() => {
    setSelectedTab(router.asPath)
  }, [router.asPath])

  let homeIcon: string = ""
  let infoIcon: string = ""
  let workIcon: string = ""
  let heartIcon: string = ""
  let searchIcon: string = ""

  if (selectedTab == "home" || selectedTab == "/") {
    homeIcon = "home_hover"
  } else if (selectedTab == "/#who-we-are-section") {
    infoIcon = "info_hover"
  } else if (selectedTab == "/#work-with-us-section") {
    workIcon = "work_hover"
  } else if (selectedTab == "/#wish-list-section") {
    heartIcon = "heart_hover"
  } else if (selectedTab == "/#top-section") {
    searchIcon = "search_hover"
  }

  return (
    <div className="botton_navbar fixed bottom-0 left-0 right-0 !z-50 box-border flex h-20 flex-row items-stretch justify-between px-4 lg:justify-evenly">
      <Link href="/">
        <a
          className={`flex flex-col justify-center border-t-4 ${
            homeIcon === "home_hover"
              ? "border-t-red-500"
              : "border-t-transparent"
          }`}
        >
          <div
            className="footer-grid xl:col-span-3"
            onMouseEnter={() => {
              setHomeHover("home_hover")
            }}
            onMouseLeave={() => {
              setHomeHover("home")
            }}
          >
            <Image
              src={`/images/${homeIcon || homeHover}.png`}
              objectFit="contain"
              layout="intrinsic"
              width={30}
              height={30}
              alt="home"
              className="homeIcon"
            />
            <span
              className={`tabText text-center ${
                (homeIcon === "home_hover" || homeHover === "home_hover") &&
                "text-red-500"
              }`}
            >
              Home
            </span>
          </div>
        </a>
      </Link>

      <Link href="/#who-we-are-section">
        <a
          className={`flex flex-col justify-center border-t-4 ${
            infoIcon === "info_hover"
              ? "border-t-red-500"
              : "border-t-transparent"
          }`}
        >
          <div
            className="footer-grid xl:col-span-3"
            onMouseEnter={() => {
              setInfoHover("info_hover")
            }}
            onMouseLeave={() => {
              setInfoHover("info")
            }}
          >
            <Image
              src={`/images/${infoIcon || infoHover}.png`}
              objectFit="contain"
              layout="intrinsic"
              width={30}
              height={30}
              alt="info"
              className="infoIcon"
            />
            <span
              className={`tabText text-center ${
                (infoIcon === "info_hover" || infoHover === "info_hover") &&
                "text-red-500"
              }`}
            >
              Chi siamo
            </span>
          </div>
        </a>
      </Link>

      <Link href="/#work-with-us-section">
        <a
          className={`flex flex-col justify-center border-t-4 ${
            workIcon === "work_hover"
              ? "border-t-red-500"
              : "border-t-transparent"
          }`}
        >
          <div
            className="footer-grid xl:col-span-3"
            onMouseEnter={() => {
              setWorkHover("work_hover")
            }}
            onMouseLeave={() => {
              setWorkHover("work")
            }}
          >
            <Image
              src={`/images/${workIcon || workHover}.png`}
              objectFit="contain"
              layout="intrinsic"
              width={30}
              height={30}
              alt="work"
              className="workIcon"
            />
            <span
              className={`tabText text-center ${
                (workIcon === "work_hover" || workHover === "work_hover") &&
                "text-red-500"
              }`}
            >
              Lavora con noi
            </span>
          </div>
        </a>
      </Link>

      <Link href="/signup">
        <a
          className={`flex flex-col justify-center border-t-4 ${
            heartIcon === "heart_hover"
              ? "border-t-red-500"
              : "border-t-transparent"
          }`}
        >
          <div
            className="footer-grid xl:col-span-2"
            onMouseEnter={() => {
              setHeartHover("heart_hover")
            }}
            onMouseLeave={() => {
              setHeartHover("heart")
            }}
          >
            <FaUser
              size={30}
              className={`heartIcon my-1 ${
                heartIcon === "heart_hover" || heartHover === "heart_hover"
                  ? "text-red-500"
                  : "text-zinc-500"
              }`}
            />
            <span
              className={`tabText text-center ${
                (heartIcon === "heart_hover" || heartHover === "heart_hover") &&
                "text-red-500"
              }`}
            >
              Account
            </span>
          </div>
        </a>
      </Link>

      {/* <Link href="/#top-section">
        <a
          className={`flex flex-col justify-center border-t-4 ${
            searchIcon === "search_hover"
              ? "border-t-red-500"
              : "border-t-transparent"
          }`}
        > */}
          {/* <div
            className="footer-grid xl:col-span-2"
            onMouseEnter={() => {
              setSearchHover("search_hover")
            }}
            onMouseLeave={() => {
              setSearchHover("search")
            }}
          >
            <Image
              src={`/images/${searchIcon || searchHover}.png`}
              objectFit="contain"
              layout="intrinsic"
              width={34}
              height={34}
              alt="search"
              className="searchIcon"
            />
            <span
              className={`tabText text-center ${
                (searchIcon === "search_hover" ||
                  searchHover === "search_hover") &&
                "text-red-500"
              }`}
            >
              Cerca
            </span>
          </div> */}
        {/* </a>
      </Link> */}
    </div>
  )
}
