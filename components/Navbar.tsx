import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { FaBars, FaTimes, FaHeart, FaUser, FaDoorOpen, FaDownload } from "react-icons/fa"
import { SearchBar } from "./common/SearchBar"
import WishModal from "./WishModal"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, logout } from "../firebase/clientApp"
import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react"
import dynamic from "next/dynamic"
import styled from "@emotion/styled"

  const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
    ssr: false,
 }) as any

const theme = {
  icon: { borderColor: "#ef4444", width: "24px" },
  unseenBadge: { backgroundColor: "#ef4444" },
  header: {
    backgroundColor: "#10b981",
    textColor: "#ffffff",
    borderRadius: "16px",
    fontFamily: "inherit",
  },
  footer: {
    backgroundColor: "#10b981",
    textColor: "#ffffff",
    borderRadius: "16px",
    fontFamily: "inherit",
  },
  notification: {
    default: {
      textColor: "#27272a",
      borderRadius: "8px",
      backgroundColor: "#10b981",
      fontFamily: "inherit",
    },
    unseen: {
      backgroundColor: "#10b981",
      textColor: "#27272a",
      borderRadius: "8px",
      fontFamily: "inherit",
    },
    unread: {
      backgroundColor: "#10b981",
      textColor: "#27272a",
      borderRadius: "8px",
      fontFamily: "inherit",
    },
  },
}

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const [userOpen, setUserOpen] = useState(false)

  return (
    <div
      className={`relative z-10 flex w-full transform flex-col items-center space-y-4 p-4 transition-all ease-in-out ${
        isOpen ? "translate-y-0" : "-mb-56 -translate-y-full"
      }`}
    >
      <SearchBar />
      <div className="relative flex items-center space-x-6">
        <button
          type="button"
          aria-hidden="true"
          onClick={() => setModalOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-secondary-500 outline-none ring-secondary-200 transition duration-200 hover:bg-secondary-100 focus:ring-2"
        >
          <FaHeart className="text-secondary-500" size={20} />
        </button>

        {user && user?.email && (
          <MagicBell
            apiKey="97576655a4d3dd3e0a7ee53354b21e333fe580ed"
            userEmail={user.email}
            theme={theme}
            locale="en"
          >
            {(props) => (
              <FloatingNotificationInbox width={400} height={500} {...props} />
            )}
          </MagicBell>
        )}

        {user && (
          <>
            <div
              onClick={() => setUserOpen(!userOpen)}
              className="flex cursor-pointer items-center space-x-2 whitespace-nowrap rounded-full bg-primary-100 py-3 px-4 font-medium text-primary-700"
            >
              <FaUser />
              <span>{user?.displayName}</span>
            </div>

            {userOpen && (
              <div className="userLogout absolute right-0 top-20 !z-50 rounded-xl p-8 shadow-xl">
                <p className="text-lg font-medium">{user?.email}</p>

                <br />

                <div
                  onClick={() => {
                    logout()
                  }}
                  className="flex cursor-pointer items-center justify-center space-x-4 rounded-full bg-secondary-100 px-4 py-3 text-lg font-medium text-secondary-500"
                >
                  <FaDoorOpen />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
 
      <WishModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <ThemeToggle />
      <Link href='/servizi.pdf'  target="_blank" download>
        <a className="wrapperUsername wrapperUsername3"><FaDownload/>Servizi</a>
      </Link>
    </div>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const [userOpen, setUserOpen] = useState(false)

  useEffect(() => {
    function onResize() {
      var x = window.innerWidth

      if (x > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", onResize)
  }, [])

  return (
    <>
      <header className="header relative z-50 flex h-20 flex-col items-center">
        <nav className="flex h-full w-full max-w-[90rem] items-center justify-between px-6 md:space-x-10">
          <button
            className="absolute rounded-sm outline-none ring-primary-200 ring-offset-4 transition duration-200 focus:ring-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaTimes className="text-gray-500" size={24} />
            ) : (
              <FaBars className="text-gray-500" size={24} />
            )}
          </button>

          <div className="flex w-full items-center justify-center space-x-8 md:justify-between lg:w-fit lg:justify-start">
       

            <Link href="/" passHref>
              <a className="rounded-xl bg-white p-2 outline-none ring-primary-200 transition duration-200 focus:ring-2">
                <div className="flex items-center">
                  <Image
                    src="/images/fullLogo.png"
                    objectFit="contain"
                    layout="intrinsic"
                    width={250}
                    height={45}
                    alt="hand"
                    className="logo_navbar"
                  />
                </div>
              </a>
            </Link>

            {/* <div className="min-w-lg hidden w-full space-x-6 md:flex">
              <NavLink text="Contatti" to="/contatti" />
              <NavLink text="Lavora con noi" to="/lavora-con-noi" />
              <NavLink text="Categorie" to="/categorie" />
            </div> */}
          </div>

          <div
            className={`relative hidden ${
              user ? "w-[50%]" : "w-[40%]"
            } items-center space-x-6 xl:flex`}
          >
            <SearchBar />

            {user && (
              <>
                <div
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex cursor-pointer items-center space-x-2 whitespace-nowrap rounded-full bg-primary-100 py-3 px-4 font-medium text-primary-700"
                >
                  <FaUser />
                  <span>{user?.displayName}</span>
                </div>

                {userOpen && (
                  <div className="userLogout absolute right-0 top-20 !z-50 rounded-xl p-8 shadow-xl">
                    <p className="text-lg font-medium">{user?.email}</p>

                    <br />

                    <div
                      onClick={() => {
                        logout()
                      }}
                      className="flex cursor-pointer items-center justify-center space-x-4 rounded-full bg-secondary-100 px-4 py-3 text-lg font-medium text-secondary-500"
                    >
                      <FaDoorOpen />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {user && user?.email && (
              <MagicBell
                apiKey="97576655a4d3dd3e0a7ee53354b21e333fe580ed"
                userEmail={user.email}
                theme={theme}
                locale="en"
              >
                {(props) => (
                  <FloatingNotificationInbox
                    width={400}
                    height={500}
                    {...props}
                  />
                )}
              </MagicBell>
            )}
            <Link href='/servizi.pdf'  target="_blank" download>
        <a className="wrapperUsername wrapperUsername3"><FaDownload/>Servizi</a>
      </Link>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center rounded-lg border-2 border-secondary-500 p-2 outline-none ring-secondary-200 ring-offset-4 transition duration-200 hover:bg-secondary-100 focus:ring-2"
            >
              <FaHeart className="text-secondary-500" size={20} />
            </button>
          </div>

          <WishModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          
          <div className="hidden xl:inline-flex">
              <ThemeToggle />
            </div> 
        </nav>
      </header>

      <MobileMenu isOpen={isOpen} />
    </>
  )
}

export default Navbar
