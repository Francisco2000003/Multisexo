import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import ServiceCard from "../components/ServiceCard";
import TrustBadges from "../components/TrustBadges";
import FAQ from "../components/FAQ";
import { suggestImage } from "../utils/serviceImages";
import { Link } from "react-router-dom";

type Servicio = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen?: string | null;
  categoria?: string | null; // opcional si más adelante la agregas en backend
};

const CATEGORIAS = [
  "Instalaciones",
  "Iluminación",
  "Mantenimiento",
  "Emergencias",
  "Paneles solares",
  "Cableado",
];

export default function Servicios() {
  const [items, setItems] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState<"az" | "za">("az");

  useEffect(() => {
    document.title = "Servicios | Multiservicios Valle de Orizaba";
    api
      .get<Servicio[]>("/servicios/")
      .then((r) => setItems(r.data))
      .catch(() => setError("No se pudo cargar la lista"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let data = items.slice();
    if (q.trim()) {
      const needle = q.toLowerCase();
      data = data.filter((s) =>
        (s.titulo + " " + (s.descripcion || "")).toLowerCase().includes(needle)
      );
    }
    if (cat) {
      data = data.filter((s) =>
        ((s.categoria || "") + " " + (s.titulo || "")).toLowerCase().includes(cat.toLowerCase())
      );
    }
    data.sort((a, b) =>
      sort === "az"
        ? a.titulo.localeCompare(b.titulo)
        : b.titulo.localeCompare(a.titulo)
    );
    return data;
  }, [items, q, cat, sort]);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div
          className="h-[320px] bg-center bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1600&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-10">
            <div className="text-white">
              <p className="text-sm font-semibold tracking-widest uppercase text-blue-200">
                Servicios eléctricos profesionales
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
                Instalación, mantenimiento y atención de emergencias
              </h1>
              <p className="mt-2 text-blue-100 max-w-2xl">
                Mejoramos y protegemos tus instalaciones con técnicos certificados, garantía por
                escrito y materiales de calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS + BADGES */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Buscar servicio</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ej. instalación, iluminación, mantenimiento…"
                className="mt-1 w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Ordenar</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="mt-1 w-full border rounded-md px-3 py-2"
              >
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
          </div>

          {/* Categorías (píldoras) */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setCat(null)}
              className={`px-3 py-1 rounded-full text-sm border ${
                !cat ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50"
              }`}
            >
              Todas
            </button>
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  cat === c ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Badges de confianza */}
          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {loading && <p className="text-gray-500">Cargando…</p>}
          {!loading && error && <p className="text-red-600">{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="text-gray-600">No se encontraron servicios con esos filtros.</p>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <ServiceCard
                  key={s.id}
                  id={s.id}
                  titulo={s.titulo}
                  descripcion={s.descripcion}
                  imagen={s.imagen || suggestImage(s.titulo, s.categoria)}
                />
              ))}
            </div>
          )}

          {/* CTA intermedio */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 bg-blue-600 rounded-2xl p-8 text-white">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold">¿Necesitas una cotización?</h3>
              <p className="text-blue-100 mt-2">
                Agenda una visita de diagnóstico sin costo en el Valle de Orizaba.
              </p>
            </div>
            <div className="self-center md:text-right">
              <Link
                to="/contacto"
                className="inline-block px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + Testimonios */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
            <p className="text-gray-600 mt-1">
              Resolvemos las dudas más comunes antes de agendar tu servicio.
            </p>
            <div className="mt-6">
              <FAQ />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Experiencias de clientes</h2>
            <p className="text-gray-600 mt-1">
              Opiniones reales que nos motivan a seguir entregando calidad.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { n: "María G.", t: "Excelente servicio, rápidos y profesionales." },
                { n: "Carlos P.", t: "Solucionaron una falla complicada y quedó perfecto." },
                { n: "Ana L.", t: "Instalación de iluminación impecable, súper recomendados." },
                { n: "Ing. R. Soto", t: "Cumplieron normas y entregaron garantía por escrito." },
              ].map((r, i) => (
                <div key={i} className="rounded-xl border bg-white p-5 shadow-sm">
                  <p className="text-gray-700">“{r.t}”</p>
                  <p className="mt-3 text-sm text-gray-500">— {r.n}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
