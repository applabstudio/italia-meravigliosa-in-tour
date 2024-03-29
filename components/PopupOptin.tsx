import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import Input from "./common/Input"

import { subscribeToConvertKit } from "../services/subscribe";

export default function PopupOptin() {
  let [isOpen, setIsOpen] = useState(Math.random() < 0.5)


  const [email, setEmail] = useState("");

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const subscribeNow = async () => {
    const status = await subscribeToConvertKit({ email });

    if (status) {
      closeModal()
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="grid w-full max-w-xl transform grid-cols-3 overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div
                  style={{
                    backgroundImage:
                      "url('https://static.nationalgeographic.it/files/styles/image_3200/public/gettyimages-660629130_1.jpg?w=1600&h=900')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className="col-span-1"
                />

                <div className="col-span-2 flex flex-col justify-center p-6">
                  <h5 className="mb-2 text-3xl font-extrabold text-gray-400">
                    Nuove informazioni ogni giorno
                  </h5>

                  <h2 className="text-2xl font-extrabold text-gray-800">
                    Iscriviti alla newsletter
                  </h2>

                  <br />

                  <Input
                    id="newsletter"
                    label="Newsletter"
                    type="text"
                    placeholder="La tua email..."
                    showLabel={false}
                    className="w-full"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />

                  <br />

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-secondary-100 px-4 py-2 text-sm font-medium text-secondary-500 transition duration-200 hover:bg-secondary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Chiudi
                    </button>

                    <button
                      onClick={subscribeNow}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-900 transition duration-200 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      Iscriviti
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
