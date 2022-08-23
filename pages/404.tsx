import Image from "next/image"
import { NextPage } from "next"

const Custom404: NextPage = () => {
  return (
    <div className=" absolute left-0 top-[80px] m-0 h-[100vh] w-full bg-gray-800 text-white">
      <div>
        <img
          src="/images/grid_design.svg"
          className="absolute bottom-40 right-14"
          alt="grid design 1"
        />

        <img
          src="/images/grid_design.svg"
          className="absolute bottom-80 left-14"
          alt="grid design 2"
        />

        <img
          src="/images/ellipse.svg"
          className="absolute top-0 left-0"
          alt="ellipse design 1"
        />

        <img
          src="/images/ellipse_2.svg"
          className="absolute top-0 right-0"
          alt="ellipse design 2"
        />

        <main className="mt-[80px] flex h-full w-full flex-col items-center justify-center">
          <h4 className="text-center text-8xl font-bold lg:text-[10rem]">
            404
          </h4>

          <h2 className="text-center text-3xl font-semibold lg:text-5xl">
            Pagina non trovata
          </h2>

          <br />
          <br />

          <p className="text-center text-gray-200 lg:text-xl">
            Siamo spiacenti, questa pagina non è stata trovata
          </p>

          <br />
          <br />

          <a
            href="/"
            className="group relative inline-block items-center justify-start overflow-hidden rounded-full bg-white px-5 py-3 font-medium transition-all hover:bg-primary-500"
          >
            <span className="absolute inset-0 rounded-full border-0 border-primary-500 transition-all duration-100 ease-linear group-hover:border-[25px]"></span>
            <span className="relative flex w-full items-center space-x-2 px-4 py-1 text-left text-lg font-semibold text-gray-800 transition-colors duration-200 ease-in-out group-hover:text-white">
              <Image
                src={`/images/home.png`}
                objectFit="contain"
                layout="intrinsic"
                width={34}
                height={34}
                alt="home"
                className="homeIcon"
              />
              <span>Vai alla Home</span>
            </span>
          </a>
        </main>
      </div>
    </div>
  )
}

export default Custom404
