import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { FaBars, FaTimes, FaHeart } from "react-icons/fa"
import { SearchBar } from "./common/SearchBar"
import WishModal from "./WishModal"

const NavLink = ({ text, to }: { text: string; to: string }) => (
  <Link href={to} passHref>
    <a className="rounded-sm border-2 border-transparent text-gray-600 outline-none ring-primary-200 ring-offset-4 transition duration-200 hover:border-b-primary-400 hover:text-gray-500 focus:ring-2">
      <p className="text-[1.1rem] font-medium">{text}</p>
    </a>
  </Link>
)

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div
      className={`relative z-10 flex w-full transform flex-col items-center space-y-4 p-4 transition-all ease-in-out ${
        isOpen ? "translate-y-0" : "-mb-56 -translate-y-full"
      }`}
    >
      <SearchBar />
      <div className="flex space-x-6">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-secondary-500 outline-none ring-secondary-200 ring-offset-4 transition duration-200 hover:bg-secondary-100 focus:ring-2"
        >
          <FaHeart className="text-secondary-500" size={20} />
        </button>
      </div>

      <WishModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <NavLink text="Contatti" to="/contatti" />
      <NavLink text="Lavora con noi" to="/lavora-con-noi" />
      <NavLink text="Categorie" to="/categorie" />
    </div>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    window.onresize = () => setIsOpen(false)
  }, [])

  return (
    <>
      <header className="relative z-50 flex h-20 flex-col items-center border-b-[1px] bg-white">
        <nav className="flex h-full w-full max-w-[90rem] items-center justify-between px-6 md:space-x-10">
          <button
            className="absolute rounded-sm outline-none ring-primary-200 ring-offset-4 transition duration-200 focus:ring-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaTimes className="text-gray-500" size={20} />
            ) : (
              <FaBars className="text-gray-500" size={20} />
            )}
          </button>

          <div className="flex w-full items-center justify-center space-x-14 md:justify-between lg:w-fit lg:justify-start">
            <Link href="/" passHref>
              <a className="outline-none ring-primary-200 transition duration-200 focus:ring-2 ">
                <div  style={{ display:'flex' }}>
                  <Image
                    src="/images/logo.png"
                    objectFit="contain"
                    layout="intrinsic"
                    width={50}
                    height={50}
                    alt="hand"
                  />
                  <p style={{width:20}}></p>
                  <Image
                    src="/images/textlogo.png"
                    objectFit="contain"
                    layout="intrinsic"
                    width={200}
                    height={50}
                    alt="hand"
                  />
                  <p style={{width:20}}></p>
                  <Image
                    src="/images/textlogo2.jpg"
                    objectFit="contain"
                    layout="intrinsic"
                    width={80}
                    height={50}
                    alt="hand"
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

          <div className="hidden w-[35%] items-center space-x-6 xl:flex">
            <SearchBar />

            {/* <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-secondary-500 outline-none ring-secondary-200 ring-offset-4 transition duration-200 hover:bg-secondary-100 focus:ring-2"
            >
              <FaHeart className="text-secondary-500" size={20} />
            </button> */}
          </div>

          <WishModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </nav>
      </header>

      <MobileMenu isOpen={isOpen} />
    </>
  )
}

export default Navbar
