import Link from "next/link"
import React from "react"
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa"

interface EventProps {
  image: string
  heading: string
  location: string
  btnText: string
  to: string
}

const Event = ({ image, heading, location, btnText, to }: EventProps) => {
  return (
    <div className="flex space-x-6 py-3">
      <div className="relative h-40 w-40">
        <img
          src={image}
          className="eventImage h-full w-full object-cover"
          alt={heading}
        />
      </div>

      <div className="flex flex-col justify-center">
        <h4 className="text-xl font-medium text-gray-800">{heading}</h4>
        <p className="flex items-center space-x-1 text-sm text-gray-500">
          <FaMapMarkerAlt /> <span>{location}</span>
        </p>
        <br />

        <Link href={to} passHref>
          <a className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-gray-50 py-3 pl-4 pr-12 font-semibold text-secondary-400 outline-none ring-secondary-400 ring-offset-4 transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6 focus:ring-2">
            <span className="absolute bottom-0 left-0 h-1 w-full bg-secondary-400 transition-all duration-150 ease-in-out group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <FaArrowRight />
            </span>
            <span className="absolute left-0 -translate-x-12 pl-2.5 duration-200 ease-out group-hover:translate-x-0">
              <FaArrowRight color="white" />
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              {btnText}
            </span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Event
