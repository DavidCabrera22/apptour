'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../providers/CartProvider';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCartIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">
              ¡Descubre nuestras increíbles aventuras y experiencias!
            </p>
            <Link
              href="/"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors inline-flex items-center"
            >
              Explorar Paquetes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'paquete' : 'paquetes'} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de items del carrito */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.packageId}-${item.selectedDate}`} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  {/* Imagen del paquete */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.packageImage}
                      alt={item.packageName}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                  </div>

                  {/* Información del paquete */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.packageName}
                    </h3>
                    
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p>
                        <span className="font-medium">Fecha:</span> {' '}
                        {new Date(item.selectedDate).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p>
                        <span className="font-medium">Recogida:</span> {item.pickupLocation}
                      </p>
                    </div>

                    {/* Controles de cantidad y precio */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} por persona
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Eliminar del carrito"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos:</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Proceder al Checkout
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Vaciar Carrito
                </button>
                
                <Link
                  href="/"
                  className="w-full text-center text-orange-600 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors block"
                >
                  Continuar Comprando
                </Link>
              </div>

              {/* Información adicional */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Información importante:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Confirmación inmediata por email</li>
                  <li>• Cancelación gratuita hasta 24h antes</li>
                  <li>• Soporte 24/7 disponible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}