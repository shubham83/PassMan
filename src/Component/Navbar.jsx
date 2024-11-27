import React from 'react'

function Navbar() {
    return (

        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className='logo font-bold text-2xl'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>Man/&gt;</span>
                </div>
                
                <button className='text-white bg-green-700 my-5 rounded-full flex justify-center items-center ring-1 ring-white'>
                    <img className=' invert-0 w-12 p-1' src="icons/logo.png" alt="github" />
                    <span className='font-bold px-4'>

                    GitHub
                    </span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar