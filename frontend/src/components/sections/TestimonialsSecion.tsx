export default function TestimonialsSection() {
  const t = [
    {
      name: "María",
      text: "Una experiencia inolvidable. Los guías fueron muy amables.",
    },
    { name: "Carlos", text: "Todo perfecto, altamente recomendado." },
    {
      name: "Lina",
      text: "Los cenotes son espectaculares. Volvería sin dudar.",
    },
  ];

  return (
    <section
      aria-labelledby="testimonials"
      className="container mx-auto px-4 md:px-6 lg:px-10 py-20"
    >
      <h3
        id="testimonials"
        className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900"
      >
        Testimonios
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.map((tt, i) => (
          <blockquote
            key={i}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <div className="font-semibold text-gray-900">{tt.name}</div>
                <div className="text-xs text-gray-500">Cliente verificado</div>
              </div>
            </div>
            <p className="text-gray-700">{tt.text}</p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
