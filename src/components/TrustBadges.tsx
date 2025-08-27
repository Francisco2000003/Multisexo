export default function TrustBadges() {
  const items = [
    { t: "Técnicos certificados", s: "Cumplimos normas oficiales." },
    { t: "Garantía por escrito", s: "Respaldo en cada trabajo." },
    { t: "Respuesta 24/7", s: "Atención a emergencias." },
    { t: "Materiales de marca", s: "Mayor vida útil y seguridad." },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((b, i) => (
        <div key={i} className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="font-semibold">{b.t}</p>
          <p className="text-gray-600 text-sm mt-1">{b.s}</p>
        </div>
      ))}
    </div>
  );
}
