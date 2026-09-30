import React from 'react'
import { Link } from 'react-router-dom'
import fleetxLogo from '../assets/fleetxlogo.png'


const Start = () => {
  return (
  <div className="relative w-full h-[100dvh] overflow-hidden">
    
      <img
        src="https://cdn.pixabay.com/photo/2021/04/24/18/07/road-6204694_1280.jpg"
        alt="Fleetx Background"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />

     
      <div className="flex flex-col justify-between h-full">
        
      <div className="p-6 -mt-20 ">
   <img
    className="w-24 md:w-28 absolute left-8 top-5 z-10 drop-shadow-lg"
    src={fleetxLogo}
    alt="Fleetx Logo"
/>
     </div>

        <div className="bg-white px-5 py-6 md:py-10 md:px-10 rounded-t-3xl shadow-xl pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-5">
            Get Started with FleetX
          </h2>

          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg text-base md:text-lg"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
