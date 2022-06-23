import React from 'react'

export default function provienceCard() {
  return (
    <>

                {/*   cards section started   */}
        
                <div className="grid grid-row grid-cols-12  gap-4  mt-10 mb-20 justify-items-center ">
       
       { [1,2,3,4,].map((_,index)=>{
           return <>
           
  {/* first grid section is started */}
  <div className=" col-span-12  sm:col-span-10 lg:col-span-6 xl:col-span-4 my-6 ">
  <div className="grid grid-row grid-cols-12  gap-2  ">
  <div className=" col-span-6">
      <img  src="/images/valore-del-paesaggio-italia-2 1.png" width="180px"  height="auto"   />
  </div>

  <div className=" col-span-6">
     <h3 className='f-popins-r text-lg text-black mt-8 ' >Luogo Meraviglioso 1</h3>
     <h4 className='f-popins-r text-lg text-grey-exlight font-normal  ' >City</h4>
     <button className='f-popins-m text-white text-lg bg-red-main px-8 py-3 rounded-3xl ' >Scopri di più</button>
  </div>

  </div>


  </div>
{/* first grid section is ended */}
      {/* first grid section is started */}
      <div className=" col-span-12  sm:col-span-10 lg:col-span-6 xl:col-span-4 my-6 ">
  <div className="grid grid-row grid-cols-12  gap-2  ">
  <div className=" col-span-6">
      <img  src="/images/Palio-Siena 1.png" width="180px"  height="auto"  />
  </div>

  <div className=" col-span-6">
     <h3 className='f-popins-r text-lg text-black mt-8 ' >Luogo Meraviglioso 2</h3>
     <h4 className='f-popins-r text-lg text-grey-exlight font-normal  ' >City</h4>
     <button className='f-popins-m text-white text-lg bg-red-main px-8 py-3 rounded-3xl ' >Scopri di più</button>
  </div>

  </div>


  </div>
{/* first grid section is ended */}
      {/* first grid section is started */}
      <div className=" col-span-12  sm:col-span-10 lg:col-span-6 xl:col-span-4 my-6 ">
  <div className="grid grid-row grid-cols-12  gap-2  ">
  <div className=" col-span-6">
      <img  src="/images/Palio-Siena 2.png" width="180px"  height="auto"   />
  </div>

  <div className=" col-span-6">
     <h3 className='f-popins-r text-lg text-black mt-8 ' >Luogo Meraviglioso 1</h3>
     <h4 className='f-popins-r text-lg text-grey-exlight font-normal  ' >City</h4>
     <button className='f-popins-m text-white text-lg bg-red-main px-8 py-3 rounded-3xl ' >Scopri di più</button>
  </div>

  </div>


  </div>
{/* first grid section is ended */}
</>
       }) }

   
       </div>

  {/*   cards section ended   */}
    </>
  )
}
