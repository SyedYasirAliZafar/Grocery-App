import React, { useEffect, useState } from 'react'
import { assets, dummyOrders } from '../assets/assets'

const MyOrder = () => {

  const [myOrders, setMyOrders] = useState([])

  const fetchOrders = async () => {
    setMyOrders(dummyOrders)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='mt-12 pb-16 '>
      <div>
        <p className='text-2xl font-medium md:text-3xl'>My Orders</p>
      </div>

      {myOrders.map((order, index) => (
        <div
          className='my-8 mb-10 border border-gray-300 rounded-lg px-4 py-5 max-w-4xl'
          key={index}
        >
          <p className='flex justify-between items-center gap-6'>
            <span>Order Id: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: ${order.amount}</span>
          </p>

          {/* ORDER ITEMS */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`relative bg-white text-gray-800/70 border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 max-w-4xl
                ${order.items.length === idx + 1 ? "border-b" : ""}`}
            >
              <div className='flex items-center mb-4 md:mb-0'>
                <div className='p-4 rounded-lg'>
                  <img
                    className='w-16 h-16'
                    src={item.product.image[0]}
                    alt=""
                  />
                </div>

                <div className='ml-4'>
                  <h2 className='text-xl font-medium'>{item.product.name}</h2>
                  <p>{item.product.category}</p>
                </div>
              </div>

              <div className='text-lg font-medium'>
                <p>Quantity: {item.quantity || "1"}</p>
                <p>Status: {order.status || "Pending"}</p>
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <p className='text-lg'>
                Amount: ${item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MyOrder
