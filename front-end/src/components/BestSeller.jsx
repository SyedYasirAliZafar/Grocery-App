import React from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from './ProductCard'

const BestSeller = () => {

  const { products } = useAppContext() // ✅ Correct way to access context

  return (
    <div className='mt-16'>
      <p className='text-2xl font-medium md:text-3xl'>Best Sellers</p>

      <div className='my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-6 items-center justify-center'>
        {
          products
            ?.filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
