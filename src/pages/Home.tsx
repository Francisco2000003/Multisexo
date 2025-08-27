import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgHero from "../assets/hero-cnc.jpg";

// ————— Utilidades simples
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">{children}</div>
);

const SectionTitle = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="mx-auto max-w-3xl text-center">
    {eyebrow && <p className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{eyebrow}</p>}
    <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl">{title}</h2>
    {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
  </div>
);

// ————— Tipos mínimos
type Servicio = {
  id: number;
  titulo: string;
  descripcion?: string | null;
  imagen?: string | null; // backend devuelve /media/...
};

// Cambia esto si tu .env usa otra clave
const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

export default function Home() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/servicios/`);
        const data = await res.json();
        setServicios(data);
      } catch (e) {
        console.error("No se pudieron cargar servicios", e);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
<section className="relative isolate">
  {/* Fondo con imagen + overlay */}
  <div className="absolute inset-0 -z-10">
    <img
      src={bgHero}                    // ← coloca el archivo en frontend/public/hero-cnc.jpg
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://images.unsplash.com/photo-1606326608606-aa0b62935f0e?q=80&w=1920&auto=format&fit=crop";
      }}
      alt="Corte CNC / Plasma"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-slate-900/60" />          {/* oscurece para contraste */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-900/70 to-transparent" />
  </div>

  <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
    <div className="py-16 md:py-24 lg:py-28">
      {/* Eyebrow */}
      <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        SERVICIO  PROFESIONAL
      </p>

      {/* Título y texto en blanco */}
      <h1 className="max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl">
        MULTISERVICIOS VALLE DE ORIZABA
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-100">
       En MSVO te ofrecemos amplia gama de servicios tanto para la industria como para el área comercial, contamos con especialistas que te guiarán desde el inicio hasta el final de tu proyecto.
      </p>

      {/* Bullets */}
      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Atención 24/7 emergencias",
          "Material y mano de obra garantizados",
          "Personal certificado",
          "Facturación disponible",
        ].map((t) => (
          <li key={t} className="inline-flex items-center gap-2 text-slate-100">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-green-300/20 text-green-200">✓</span>
            <span className="text-sm">{t}</span>
          </li>
        ))}
      </ul>

      {/* Acciones */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          to="/servicios"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Ver servicios
        </Link>
        <a
          href="https://wa.me/522721234567?text=Hola%20quiero%20una%20cotizaci%C3%B3n%20de%20servicio%20el%C3%A9ctrico"
          target="_blank"
          className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
        >
          Solicitar cotización
        </a>
      </div>

      {/* Métricas */}
      <div className="mt-8 grid max-w-md grid-cols-3 gap-6 text-center">
        {[
          { k: "+10", v: "años de experiencia" },
          { k: "24/7", v: "emergencias" },
          { k: "100%", v: "clientes satisfechos" },
        ].map((s) => (
          <div key={s.k}>
            <div className="text-2xl font-extrabold text-white">{s.k}</div>
            <div className="text-xs text-slate-200">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

    

      {/* DIFERENCIADORES */}
      <section className="bg-slate-50 py-16">
        <Container>
          <SectionTitle
            eyebrow="¿Por qué elegirnos?"
            title="Valor que sí se nota"
            subtitle="No solo reparamos: asesoramos, garantizamos y dejamos todo funcionando con seguridad."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Diagnóstico preciso", d: "Detectamos la causa raíz, no solo el síntoma." },
              { t: "Cumplimiento y seguridad", d: "Normas NOM y mejores prácticas de instalación." },
              { t: "Garantía y factura", d: "Respaldo por escrito y comprobante fiscal." },
              { t: "Tiempo de respuesta", d: "Agenda ágil y cobertura 24/7 para emergencias." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-3 h-10 w-10 rounded-full bg-blue-100 text-blue-700 grid place-items-center">⚡</div>
                <div className="font-semibold">{f.t}</div>
                <p className="mt-1 text-sm text-slate-600">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-16">
        <Container>
          <SectionTitle eyebrow="Opiniones" title="Nuestros clientes" />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { n: "Ing. Ramírez", c: "Excelente servicio, resolvieron una falla complicada y dejaron todo en orden." },
              { n: "Hotel X", c: "Instalación limpia y a tiempo. Muy profesionales." },
              { n: "María G.", c: "Llegaron rápido a una emergencia y lo solucionaron el mismo día." },
            ].map((t) => (
              <blockquote key={t.n} className="rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-slate-700">“{t.c}”</p>
                <footer className="mt-4 text-sm font-semibold text-slate-900">— {t.n}</footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
<section className="relative overflow-hidden py-16">
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-600 to-green-500" />
  <Container>
    <div className="rounded-3xl bg-white/10 p-10 backdrop-blur shadow-lg">
      <div className="grid items-center gap-6 md:grid-cols-2">
        {/* Texto */}
        <div>
          <h3 className="text-3xl font-bold text-black/90">
            ¿Listo para una asesoría gratuita?
          </h3>
          <p className="mt-3 text-lg text-black/90">
            Nuestro equipo especializado está listo para ayudarte a planear, 
            cotizar y dar solución a tu proyecto con la mejor atención profesional.
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-4 md:justify-end items-center">
          {/* Botón WhatsApp */}
          <a
            href="https://wa.me/522721234567?text=Hola%20MSVO,%20me%20gustar%C3%ADa%20cotizar%20un%20servicio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-white font-semibold shadow-lg hover:bg-green-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M16.001 3.2c-7.063 0-12.8 5.736-12.8 12.799 0 2.261.593 4.464 1.726 6.422L3.2 28.8l6.618-1.692c1.9 1.045 4.047 1.595 6.183 1.595h.001c7.063 0 12.799-5.736 12.799-12.8s-5.736-12.8-12.8-12.8zm0 23.465h-.001c-1.847 0-3.654-.497-5.233-1.44l-.375-.223-3.927 1.004 1.048-3.827-.245-.394a10.541 10.541 0 01-1.62-5.662c0-5.827 4.746-10.573 10.574-10.573 2.823 0 5.475 1.1 7.476 3.1a10.513 10.513 0 013.098 7.475c0 5.828-4.746 10.54-10.575 10.54zm5.79-7.91c-.315-.157-1.866-.92-2.156-1.025-.289-.106-.5-.158-.711.157-.211.315-.815 1.024-1.0.124-.184-.262-.394-.275-.709-.432-.315-.157-.592-.34-.815-.553-.223-.211-.472-.473-.657-.788-.184-.314-.039-.485.138-.642.142-.132.315-.34.473-.511.157-.171.21-.289.315-.481.105-.191.053-.358-.026-.505-.08-.145-.71-1.711-.973-2.348-.257-.617-.519-.534-.711-.544l-.607-.01c-.198 0-.52.075-.793.358-.273.283-1.04 1.016-1.04 2.478 0 1.462 1.065 2.875 1.213 3.07.149.196 2.096 3.199 5.077 4.483.71.307 1.262.491 1.693.628.712.227 1.36.195 1.872.118.571-.085 1.866-.762 2.131-1.498.263-.736.263-1.367.184-1.498-.08-.131-.289-.21-.604-.367z" />
            </svg>
            WhatsApp
          </a>

          {/* Botón contacto */}
          <Link
  to="/contacto"
  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
>
  Formulario de contacto
</Link>
        </div>
      </div>
    </div>
  </Container>
</section>
    </main>
  );
}

// ————— Helpers
function buildImageUrl(path?: string | null) {
  if (!path) return "/fallback-service.jpg";
  // si ya es absoluta, regresa igual
  if (/^https?:\/\//i.test(path)) return path;
  // si tu serializer devuelve "/media/..." esto la hace absoluta:
  const BACKEND_BASE = (import.meta.env.VITE_BACKEND_BASE as string) || "http://127.0.0.1:8000";
  return `${BACKEND_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
