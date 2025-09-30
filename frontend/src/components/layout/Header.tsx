'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/providers/CartProvider'; // Cambiado de '@/hooks/useCart'
import Cart from '@/components/Cart';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems, openCart, isCartOpen, closeCart } = useCart();
  const itemCount = getTotalItems();

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md fixed w-full top-0 z-50 shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">AppTour</span>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AT</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">AppTour</span>
              </div>
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
              </span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/aventuras"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Aventuras
            </Link>
            <Link
              href="/paquetes"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Paquetes
            </Link>
            <Link
              href="/experiencias"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Experiencias
            </Link>
            <Link
              href="/nosotros"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Contacto
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
            
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Registrarse
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">AppTour</span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AT</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">AppTour</span>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/aventuras"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Aventuras
                  </Link>
                  <Link
                    href="/paquetes"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Paquetes
                  </Link>
                  <Link
                    href="/experiencias"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Experiencias
                  </Link>
                  <Link
                    href="/nosotros"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nosotros
                  </Link>
                  <Link
                    href="/contacto"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contacto
                  </Link>
                </div>
                <div className="py-6">
                  {/* Mobile Cart Button */}
                  <button
                    onClick={() => {
                      openCart();
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full"
                  >
                    <div className="relative">
                      <ShoppingCartIcon className="h-6 w-6" />
                      {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {itemCount > 99 ? '99+' : itemCount}
                        </span>
                      )}
                    </div>
                    Carrito ({itemCount})
                  </button>
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/registro"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}