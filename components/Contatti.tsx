import React, { useRef, useState } from "react"
import Input from "./common/Input"
import emailjs from "@emailjs/browser"


import Dropdown from "./UI/Dropdown"

const Contatti = () => {
  const form = useRef(null)

  const [, setProfession] = useState("Photographer");

  return (
    <form
      className="space-y-4"
      ref={form}
      onSubmit={(e: any) => {
        e.preventDefault()

        emailjs
          .sendForm(
            "service_ymj3ef9",
            "template_sayv3ff",
            e.target,
            "BpMal4ucD4kQnXfkM"
          )
          .then(
            (result) => {
              console.log(result.text)
            },
            (error) => {
              alert(error.text)
              // console.log(error.text)
            }
          )
      }}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Input
          id="nome"
          label="Nome"
          type="text"
          placeholder="Il tuo nome..."
        />

        <Input
          id="cv"
          label="cv"
          type="file"
          placeholder="File"
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="La tua email..."
        />

        <div className="skillsWrapper">
        <span>Professione</span>
          <Dropdown
            selectedProfession={(_profession: string) => {
              console.clear()
              console.log("first", _profession);
              setProfession(_profession)
            }}
          />
        </div>


      </div>

      <div className="grid grid-cols-1 gap-4">
        <Input
          id="oggetto"
          label="Oggetto"
          type="text"
          placeholder="Oggetto..."
        />

        <div className="flex flex-col">
          <label
            htmlFor="messaggio"
            className="text-md mb-1 font-medium text-gray-500"
          >
            Messaggio
          </label>

          <textarea
            name="messaggio"
            id="messaggio"
            placeholder="Messaggio..."
            rows={6}
            className="form-input rounded-2xl border-0 bg-gray-100 px-4 py-3 text-gray-800 caret-primary-500 outline-none placeholder:text-gray-400 focus:border-0 focus:ring-0"
          />
        </div>
      </div>

      <button
        type="submit"
        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border-2 border-secondary-500 p-4 px-6 py-3 font-medium text-secondary-600 shadow-md outline-none ring-secondary-500 ring-offset-4 transition duration-300 ease-out focus:ring-2 lg:w-fit"
      >
        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-secondary-500 text-white duration-300 group-hover:translate-x-0">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="ease absolute flex h-full w-full transform items-center justify-center text-secondary-500 transition-all duration-300 group-hover:translate-x-full">
          Invia
        </span>
        <span className="invisible relative">Invia</span>
      </button>
    </form>
  )
}

export default Contatti
