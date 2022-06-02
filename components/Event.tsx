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
    <div className={`flex space-x-6 py-3`}>
      <div className={`relative h-44 w-40`}>
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
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
        {btnText}
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Event
