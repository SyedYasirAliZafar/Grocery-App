import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Category = () => {

    const {navigate} = useAppContext()

  return (
    <div className='mt-16'>
      <p className='text-2xl font-medium md:text-3xl'>Categories</p>

      <div className='my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 items-center justify-center gap-2'>
        {categories.map((category, index) => (
          <div 
          onClick={()=>{navigate(`/product/${category.path.toLowerCase()}`)
          scrollTo(0,0)
          }}
          
            key={index}
            className="group cursor-pointer py-5 px-3 rounded-lg flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: category.bgColor }}
          >
            <img
              className="max-w-28 transition group-hover:scale-110"
              src={category.image}
              alt=""
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
