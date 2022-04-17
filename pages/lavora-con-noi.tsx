import React from "react"
import CVForm from "../components/CVForm"

const LavoraConNoi = () => {
  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <main className="flex w-full flex-col px-4">
        <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
          Lavora con Noi
        </h4>
        <br />
        <CVForm />
      </main>
    </div>
  )
}

export default LavoraConNoi
