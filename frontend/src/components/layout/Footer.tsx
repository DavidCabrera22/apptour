import Link from 'next/link';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AT</span>
              </div>
              <span className="text-2xl font-bold">AppTour</span>
            </div>
            <p className="text-gray-400 mb-6">
              Tu compañero perfecto para aventuras inolvidables. Descubre experiencias únicas 
              en los destinos más espectaculares del mundo.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.182 17.635l1.935-1.935c.807.807 1.958 1.297 3.323 1.297 2.616 0 4.735-2.119 4.735-4.735S11.065 7.527 8.449 7.527s-4.735 2.119-4.735 4.735c0 1.365.49 2.516 1.297 3.323l-1.935 1.935 1.944 1.944c.875-.807 1.365-1.958 1.365-3.323 0-2.616 2.119-4.735 4.735-4.735s4.735 2.119 4.735 4.735-2.119 4.735-4.735 4.735z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-emerald-400 transition-colors">Inicio</Link></li>
              <li><Link href="/paquetes" className="text-gray-400 hover:text-emerald-400 transition-colors">Paquetes</Link></li>
              <li><Link href="/experiencias" className="text-gray-400 hover:text-emerald-400 transition-colors">Experiencias</Link></li>
              <li><Link href="/nosotros" className="text-gray-400 hover:text-emerald-400 transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-emerald-400 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><Link href="/aventuras" className="text-gray-400 hover:text-emerald-400 transition-colors">Aventuras Extremas</Link></li>
              <li><Link href="/ecoturismo" className="text-gray-400 hover:text-emerald-400 transition-colors">Ecoturismo</Link></li>
              <li><Link href="/cultura" className="text-gray-400 hover:text-emerald-400 transition-colors">Tours Culturales</Link></li>
              <li><Link href="/grupos" className="text-gray-400 hover:text-emerald-400 transition-colors">Grupos Corporativos</Link></li>
              <li><Link href="/personalizados" className="text-gray-400 hover:text-emerald-400 transition-colors">Tours Personalizados</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">Punta Cana, República Dominicana</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (809) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">info@apptour.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <GlobeAltIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">www.apptour.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AppTour. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidad" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}