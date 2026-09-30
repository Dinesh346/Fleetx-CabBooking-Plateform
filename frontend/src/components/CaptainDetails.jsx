import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

    return (
        <div className='animate-fadeIn'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img
                        className='h-12 w-12 rounded-full object-cover ring-2 ring-black/10 shadow-sm transition-transform duration-300 hover:scale-105'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
                        alt=""
                    />
                    <h4 className='text-lg font-semibold capitalize'>
                        {captain.fullname.firstname + " " + captain.fullname.lastname}
                    </h4>
                </div>
                <div className='text-right'>
                    <h4 className='text-2xl font-bold text-green-600'>₹295.20</h4>
                    <p className='text-sm text-gray-500'>Earned Today</p>
                </div>
            </div>

            <div className='flex p-4 mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl justify-around gap-4 items-start shadow-inner'>
                <div className='text-center transition-transform duration-300 hover:-translate-y-1'>
                    <div className='bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2 shadow-sm'>
                        <i className="text-2xl text-blue-500 ri-timer-2-line"></i>
                    </div>
                    <h5 className='text-lg font-semibold'>10.2</h5>
                    <p className='text-xs text-gray-500'>Hours Online</p>
                </div>

                <div className='text-center transition-transform duration-300 hover:-translate-y-1'>
                    <div className='bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2 shadow-sm'>
                        <i className="text-2xl text-orange-500 ri-speed-up-line"></i>
                    </div>
                    <h5 className='text-lg font-semibold'>10.2</h5>
                    <p className='text-xs text-gray-500'>Total Rides</p>
                </div>

                <div className='text-center transition-transform duration-300 hover:-translate-y-1'>
                    <div className='bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2 shadow-sm'>
                        <i className="text-2xl text-purple-500 ri-booklet-line"></i>
                    </div>
                    <h5 className='text-lg font-semibold'>10.2</h5>
                    <p className='text-xs text-gray-500'>Bookings</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails