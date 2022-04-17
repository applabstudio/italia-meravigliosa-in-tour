import React from "react"
import Contatti from "../components/Contatti"

const contatti = () => {
  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <main className="flex w-full flex-col px-4">
        <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
          Contatti
        </h4>
        <br />

        <Contatti />
      </main>
    </div>
  )
}

export default contatti
