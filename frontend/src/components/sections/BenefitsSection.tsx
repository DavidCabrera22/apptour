import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function BenefitsSection() {
  const items = [
    {
      title: "Variedad de actividades",
      desc: "Todas las opciones en un mismo lugar.",
    },
    { title: "Guías certificados", desc: "Personal profesional y amable." },
    { title: "Reservas seguras", desc: "Pago online protegido." },
    {
      title: "Opciones para grupos",
      desc: "Paquetes para familias y empresas.",
    },
  ];

  return (
    <section
      aria-labelledby="benefits"
      className="container mx-auto px-4 md:px-6 lg:px-10 py-20"
    >
      <h3
        id="benefits"
        className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900"
      >
        Beneficios
      </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((it) => (
          <div
            key={it.title}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center"
          >
            <div className="mx-auto w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <CheckBadgeIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-semibold mb-2 text-gray-900">{it.title}</h4>
            <p className="text-sm text-gray-600">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}