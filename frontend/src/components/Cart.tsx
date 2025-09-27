'use client'

import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from '@/providers/CartProvider'
import { useRouter } from 'next/navigation'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const router = useRouter()
  const { 
    cartItems, 
    loading, 
    error, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getTotalPrice 
  } = useCart()

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      onClose()
      router.push('/checkout')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-900">Carrito</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900"></div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Tu carrito está vacío</h3>
                <p className="text-sm text-gray-500">Agrega algunos paquetes para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex gap-3">
                      <img
                        src={item.packageImage || '/api/placeholder/300/200'}
                        alt={item.packageName}
                        className="w-16 h-16 rounded object-cover bg-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                          {item.packageName}
                        </h3>
                        <p className="text-xs text-gray-500 mb-1">
                          {new Date(item.selectedDate).toLocaleDateString('es-ES', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-xs text-gray-500 mb-2 truncate">
                          {item.pickupLocation}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={loading}
                              className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            >
                              <Minus className="h-3 w-3 text-gray-600" />
                            </button>
                            <span className="text-sm font-medium text-gray-900 min-w-[1.5rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={loading}
                              className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            >
                              <Plus className="h-3 w-3 text-gray-600" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              disabled={loading}
                              className="p-1 hover:bg-gray-50 rounded transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Procesando...
                  </div>
                ) : (
                  'Proceder al Checkout'
                )}
              </button>
              
              <button
                onClick={clearCart}
                disabled={loading}
                className="w-full mt-2 text-gray-500 text-sm py-2 hover:text-gray-700 transition-colors disabled:opacity-50"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}