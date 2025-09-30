import { CheckBadgeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { BoltIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";

export default function WhySection() {
  return (
    <section aria-labelledby="why-section" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3
            id="why-section"
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            ¿Por qué elegirnos?
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Experiencias seguras, sostenibles y diseñadas para crear recuerdos.
            Nuestros guías certificados y protocolos garantizan una visita
            agradable y responsable con el entorno.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckBadgeIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Seguridad & calidad
                </h4>
                <p className="text-sm text-gray-600">
                  Protocolos certificados y personal capacitado.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Experiencias únicas
                </h4>
                <p className="text-sm text-gray-600">
                  Actividades para todas las edades.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <BoltIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Reservas sencillas
                </h4>
                <p className="text-sm text-gray-600">
                  Proceso de reserva online rápido y seguro.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <GlobeAltIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Sostenibilidad</h4>
                <p className="text-sm text-gray-600">
                  Prácticas responsables con el entorno natural.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="h-40 rounded-xl overflow-hidden relative">
            <Image
              src="/images/cenote-experience.jpg"
              alt="cenote"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="h-40 rounded-xl overflow-hidden relative">
            <Image
              src="/images/jungle-adventure.jpg"
              alt="selva"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="h-40 rounded-xl overflow-hidden relative">
            <Image
              src="/images/hero-beach.jpg"
              alt="playa"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="h-40 rounded-xl overflow-hidden relative">
            <Image
              src="/images/jungle-adventure.jpg"
              alt="aventura"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}