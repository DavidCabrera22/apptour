'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'

interface CartItem {
  id: string
  packageId: string
  packageName: string
  packageImage: string
  quantity: number
  price: number
  selectedDate: string
  pickupLocation: string
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  // Simular datos del carrito (después conectaremos con el backend)
  useEffect(() => {
    if (isOpen) {
      // Aquí cargaremos los items del carrito desde el backend
      const mockItems: CartItem[] = [
        {
          id: '1',
          packageId: '1',
          packageName: 'FULL ADMISSION + BUGGY',
          packageImage: '/api/placeholder/300/200',
          quantity: 2,
          price: 89,
          selectedDate: '2024-01-15',
          pickupLocation: 'Hotel pickup'
        }
      ]
      setCartItems(mockItems)
    }
  }, [isOpen])

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId)
      return
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // Aquí implementaremos la lógica de checkout
      console.log('Procesando checkout...', cartItems)
      // Simular proceso
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('¡Reserva procesada exitosamente!')
      setCartItems([])
      onClose()
    } catch (error) {
      console.error('Error en checkout:', error)
      alert('Error al procesar la reserva')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Carrito de Compras</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart className="h-12 w-12 mb-4" />
                <p>Tu carrito está vacío</p>
                <p className="text-sm">Agrega algunos paquetes para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex gap-3">
                      <img
                        src={item.packageImage}
                        alt={item.packageName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.packageName}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          Fecha: {new Date(item.selectedDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-600">
                          Recogida: {item.pickupLocation}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
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
            <div className="border-t px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-orange-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Proceder al Checkout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}