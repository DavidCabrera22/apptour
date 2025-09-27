'use client'

import { useState, useEffect } from 'react'
import { apiService, CartItem, CreateCartItemDto } from '@/services/api'

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar carrito desde el backend al inicializar
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Intentar cargar desde el backend si hay autenticación
      const token = localStorage.getItem('auth_token')
      if (token) {
        const items = await apiService.getCartItems()
        setCartItems(items)
      } else {
        // Cargar desde localStorage si no hay autenticación
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      // Fallback a localStorage en caso de error
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (parseError) {
          console.error('Error parsing saved cart:', parseError)
          setError('Error al cargar el carrito')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  // Guardar carrito en localStorage cuando cambie (backup)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = async (item: Omit<CartItem, 'id' | 'quantity'>) => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('auth_token')
      
      if (token) {
        // Usar API del backend
        const cartItemDto: CreateCartItemDto = {
          packageId: item.packageId,
          quantity: 1,
          selectedDate: item.selectedDate,
          pickupLocation: item.pickupLocation
        }
        
        const newItem = await apiService.addToCart(cartItemDto)
        setCartItems(items => [...items, newItem])
      } else {
        // Usar localStorage
        const existingItem = cartItems.find(
          cartItem => 
            cartItem.packageId === item.packageId && 
            cartItem.selectedDate === item.selectedDate &&
            cartItem.pickupLocation === item.pickupLocation
        )

        if (existingItem) {
          await updateQuantity(existingItem.id, existingItem.quantity + 1)
        } else {
          const newItem: CartItem = {
            ...item,
            id: Date.now().toString(),
            quantity: 1
          }
          setCartItems(items => [...items, newItem])
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      setError('Error al agregar al carrito')
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('auth_token')
      
      if (token) {
        await apiService.removeFromCart(itemId)
      }
      
      setCartItems(items => items.filter(item => item.id !== itemId))
    } catch (error) {
      console.error('Error removing from cart:', error)
      setError('Error al eliminar del carrito')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity === 0) {
      await removeFromCart(itemId)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('auth_token')
      
      if (token) {
        const updatedItem = await apiService.updateCartItem(itemId, quantity)
        setCartItems(items =>
          items.map(item =>
            item.id === itemId ? updatedItem : item
          )
        )
      } else {
        setCartItems(items =>
          items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
        )
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
      setError('Error al actualizar cantidad')
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('auth_token')
      
      if (token) {
        await apiService.clearCart()
      }
      
      setCartItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
      setError('Error al limpiar carrito')
    } finally {
      setLoading(false)
    }
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
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    openCart,
    closeCart,
    loadCart
  }
}