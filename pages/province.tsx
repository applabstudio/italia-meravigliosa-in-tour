import React from 'react'
import ProvienceCard from '../components/provience/provienceCard'
import Slider from "react-slick";

export default function Province() {

  var settings = {
    dots: true,
    infinite: true, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
    <div className='my-24' >
        <div className='w-11/12 ml-auto mr-auto text-5xl  text-center lg:text-left  f-popins-m font-bold mt-44 '  >
            <div className='lg:flex' >
            <h1 className='  text-3xl sm:text-5xl' >Luoghi nella provincia: </h1>
        <button  className=' bg-green-main px-5 lg:ml-3  rounded-lg mt-8 lg:mt-0   ' > 
        <ul className='flex ' >
            <li>  <img src="/images/emiliaimg.png" width="100%" height="auto"  /> </li>
            <li className='-mt-1' > <span className='f-inter-sm text-green-dark text-base   ' >  Emilia-Romagna </span> </li>
        </ul>
         </button>
            </div>
            <Slider {...settings} className="slider-setting" >
      <div>
      <ProvienceCard/>
      </div>
      <div>
      <ProvienceCard/>
      </div>
      <div>
      <ProvienceCard/>
      </div>

    </Slider>
          
        </div>

    </div>
    </>
  )
}
