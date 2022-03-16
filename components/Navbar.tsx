import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { FaBars, FaTimes } from "react-icons/fa"
import { SearchBar } from "./common/SearchBar"

const NavLink = ({ text, to }: { text: string; to: string }) => (
  <Link href={to} passHref>
    <a className="rounded-sm border-2 border-transparent text-gray-600 outline-none ring-primary-200 ring-offset-4 transition duration-200 hover:border-b-primary-400 hover:text-gray-500 focus:ring-2">
      <p className="text-[1.1rem] font-medium">{text}</p>
    </a>
  </Link>
)

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => (
  <div
    className={`relative z-10 flex w-full transform flex-col items-center space-y-4 p-4 transition-all ease-in-out ${
      isOpen ? "translate-y-0" : "-mb-28 -translate-y-full"
    }`}
  >
    <SearchBar />
    <div className="flex space-x-6">
      <NavLink text="link1" to="/" />
      <NavLink text="link2" to="/" />
      <NavLink text="link3" to="/" />
      <NavLink text="link4" to="/" />
    </div>
  </div>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    window.onresize = () => setIsOpen(false)
  }, [])

  return (
    <>
      <header className="relative z-50 flex h-20 flex-col items-center border-b-[1px] bg-white">
        <nav className="flex h-full w-full max-w-7xl items-center justify-between px-6 md:space-x-10">
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
                <div className="relative h-20 w-64">
                  <Image
                    src="/images/logo.svg"
                    objectFit="contain"
                    layout="fill"
                    alt="Italia Meravigliosa Logo"
                  />
                </div>
              </a>
            </Link>

            <div className="hidden space-x-6 md:flex">
              <NavLink text="link1" to="/" />
              <NavLink text="link2" to="/" />
              <NavLink text="link3" to="/" />
              <NavLink text="link4" to="/" />
            </div>
          </div>

          <div className="hidden w-full max-w-md lg:inline">
            <SearchBar />
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={isOpen} />
    </>
  )
}

export default Navbar
