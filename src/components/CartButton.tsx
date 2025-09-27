'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '../hooks/useCart'

export default function CartButton() {
  const { getTotalItems, openCart } = useCart()
  const itemCount = getTotalItems()

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}