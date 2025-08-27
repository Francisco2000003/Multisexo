import { useState } from "react";

const QA = [
  { q: "¿Atienden emergencias eléctricas?", a: "Sí, contamos con atención 24/7 para fallas críticas." },
  { q: "¿Entregan garantía?", a: "Todos nuestros servicios cuentan con garantía por escrito." },
  { q: "¿Cotización sin costo?", a: "Sí, hacemos diagnóstico y cotización sin costo en zona Valle de Orizaba." },
  { q: "¿Trabajan con empresas?", a: "Sí, tenemos experiencia en proyectos residenciales, comerciales e industriales." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y rounded-2xl border bg-white shadow-sm">
      {QA.map((item, i) => {
        const active = open === i;
        return (
          <div key={i} className="p-4">
            <button
              className="w-full text-left flex items-center justify-between"
              onClick={() => setOpen(active ? null : i)}
            >
              <span className="font-medium">{item.q}</span>
              <span className="text-gray-400">{active ? "–" : "+"}</span>
            </button>
            {active && <p className="mt-2 text-gray-600">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
