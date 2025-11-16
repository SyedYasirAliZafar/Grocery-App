import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='relative '>
        <img src={assets.main_banner_bg} alt="" className='hidden md:block mt-6'/>
        <img src={assets.main_banner_bg_sm} alt="" className='md:hidden w-full mt-4'/>
        <div className='absolute flex inset-0 flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24'>
            <h1 className='text-3xl md:text-4xl font-bold text-center md:text-Left max-w-72 md:max-w-80 leading-tight lg:leading-15'>Freshnes You Can Trust, Savings You will love!</h1>
            <div className='flex items-center mt-6 font-medium gap-6 '>
                <Link className='flex group items-center gap-2 px-7 rounded text-white py-3 bg-primary cursor-pointer active:scale-90' to={"/products"}>Shop Now
                <img src={assets.white_arrow_icon} alt="" className='md:hidden transition group-focus:translate-x-1'/>
                </Link>
                <Link className='hidden md:flex group items-center gap-2 px-7 rounded text-white py-3 bg-primary cursor-pointer active:scale-90' to={"/product/:id"}>Explore Deals
                <img src={assets.white_arrow_icon} alt="" className='md:hidden transition group-focus:translate-x-1'/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero
