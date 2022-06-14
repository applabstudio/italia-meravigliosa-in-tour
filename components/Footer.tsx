import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import React from "react"

const Footer = () => {
  return (
    <footer className="mx-auto w-full bg-gray-100 px-6">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-8 border-b bg-gray-100 py-12 text-gray-800 transition-colors duration-150 lg:grid-cols-8">
        <div className="col-span-1 lg:col-span-2">
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
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="text-xl font-bold text-gray-800 transition duration-150 ease-in-out hover:text-gray-900">
                Link
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/contatti">
                <a className="font-semibold text-gray-600 transition duration-150 ease-in-out hover:text-gray-500">
                  Contatti
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/lavora-con-noi">
                <a className="font-semibold text-gray-600 transition duration-150 ease-in-out hover:text-gray-500">
                  Lavora con Noi
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/categorie">
                <a className="font-semibold text-gray-600 transition duration-150 ease-in-out hover:text-gray-500">
                  Categorie
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="text-xl font-bold text-gray-800 transition duration-150 ease-in-out hover:text-gray-900">
                Privacy
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <a
                href="https://www.iubenda.com/privacy-policy/76997417"
                className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
                title="Privacy Policy "
              >
                Privacy Policy
              </a>
              <Script>
                {`(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);`}
              </Script>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between space-y-4 bg-gray-100 pb-6 md:flex-row">
        <div>
          <span>
            &copy; 2022 Italia Meravigliosa in Tour, Tutti i diritti sono
            riservati.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
