import CartTemp from '@/app/components/templates/CartTemp';
import withAuth from 'next-auth/middleware';
import React from 'react'

const Cart = () => {
  return (
    <div>
      <CartTemp />
    </div>
  )
}

export default Cart;
