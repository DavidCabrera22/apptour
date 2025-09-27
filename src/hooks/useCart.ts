'use client'

import { useState, useEffect } from 'react'

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

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    const existingItem = cartItems.find(
      cartItem => 
        cartItem.packageId === item.packageId && 
        cartItem.selectedDate === item.selectedDate &&
        cartItem.pickupLocation === item.pickupLocation
    )

    if (existingItem) {
      setCartItems(items =>
        items.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
    } else {
      const newItem: CartItem = {
        ...item,
        id: Date.now().toString(),
        quantity: 1
      }
      setCartItems(items => [...items, newItem])
    }
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId)
      return
    }

    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    openCart,
    closeCart
  }
}