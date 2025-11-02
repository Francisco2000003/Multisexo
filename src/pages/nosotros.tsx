// src/pages/nosotros.tsx
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// PDF (Vite): si el archivo está en src/assets
import pdfFile from "../assets/Doc1gen.pdf?url";
import IMG from "../assets/PORTADA_NOSOTROS.png?url";
import UniformGallery from "../components/UniformGallery";
/* =========================
   DATOS DE GALERÍA
   ========================= */
const gallery = [
  { src: "/src/assets/img111.png" },
  { src: "/src/assets/img222.png" },
  { src: "/src/assets/img333.png" },
  { src: "/src/assets/img444.png" },
  { src: "/src/assets/img555.png" },
  { src: "/src/assets/img666.png" },
  { src: "/src/assets/img777.png" },
  { src: "/src/assets/img888.png" }
];

/* =========================
   Reveal (animación de aparición)
   ========================= */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShow(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================
   LIGHTBOX (nuevo) con teclado + swipe + miniaturas
   ========================= */
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
  items,
  onJump,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
  items: { src: string; }[];
}) {
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.src = items[index].src;
    img.onload = () => setLoaded(true);

    new Image().src = items[(index + 1) % items.length].src;
    new Image().src = items[(index - 1 + items.length) % items.length].src;
  }, [index, items]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 40) onPrev();
    if (diff < -40) onNext();
    touchStartX.current = null;
  };

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/80 backdrop-blur-sm p-4">
      {/* Contenedor principal con layout en columna */}
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
        {/* Área de la imagen */}
        <div
          className="relative grid place-items-center p-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={items[index].src}
            className={`mx-auto max-h-[70vh] w-auto select-none object-contain transition-all duration-300 ${
              loaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            draggable={false}
          />
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-slate-900 hover:bg-white"
            aria-label="Cerrar"
          >
            Cerrar ✕
          </button>

          {/* Flechas */}
          <button
            onClick={onPrev}
            className="group absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15"
            aria-label="Anterior"
          >
            <svg className="h-6 w-6 transition -translate-x-0.5 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="group absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15"
            aria-label="Siguiente"
          >
            <svg className="h-6 w-6 transition translate-x-0.5 group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Miniaturas: bloque independiente DEBAJO, sin absolute */}
        <div className="border-t border-white/10 bg-black/60 px-3 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {items.map((g, i) => (
              <button
                key={g.src + i}
                onClick={() => onJump(i)}
                className={`shrink-0 overflow-hidden rounded-md ring-2 ${
                  i === index
                    ? "ring-cyan-400"
                    : "ring-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`Ir a imagen`}
              >
                <img
                  src={g.src}
                  className="h-16 w-24 object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


/* =========================
   PÁGINA
   ========================= */
export default function Nosotros() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const open = (i: number) => setOpenIdx(i);
  const close = () => setOpenIdx(null);
  const prev = () =>
    setOpenIdx((i) => (i === null ? 0 : (i - 1 + gallery.length) % gallery.length));
  const next = () =>
    setOpenIdx((i) => (i === null ? 0 : (i + 1) % gallery.length));
  const jump = (i: number) => setOpenIdx(i);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-[#0B1424] to-slate-900 text-slate-100">
      {/* Halos */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />

      {/* HERO */}
      <section className="relative">
        <div className="absolute">
    <img
      src={IMG}
      alt="Fondo MSVO — corte CNC con chispas"
      className="h-full w-full object-cover"
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 bg-slate-900/55" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-900/60 to-transparent" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900/60 to-transparent" />
  </div>

        <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 md:pt-16">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              Sobre nosotros
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Innovación, tecnología y soluciones integrales
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-3xl text-lg leading-7 text-slate-300">
              En <span className="font-semibold text-white">Multiservicios Valle de Orizaba</span> impulsamos el desarrollo tecnológico e industrial mediante soluciones personalizadas, eficientes y seguras. Combinamos experiencia técnica, materiales certificados y procesos 
              innovadores para garantizar resultados de alto rendimiento y calidad comprobada.
            </p>
          </Reveal>

          {/* Cifras */}
          <Reveal delay={240}>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <Stat value="+10" label="años de experiencia" />
              <Stat value="24/7" label="atención de emergencias" />
              <Stat value="100%" label="clientes satisfechos" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILARES */}
      <section className="relative border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Reveal>
            <h2 className="text-2xl font-bold text-white">Nuestros pilares</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              Lo que prometemos, lo cumplimos. Estos principios guían cada servicio.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={60}>
              <Value
                icon={<ShieldIcon />}
                title="Seguridad primero"
                text="Procedimientos eléctricos seguros, EPP y normas de cumplimiento."
              />
            </Reveal>
            <Reveal delay={120}>
              <Value
                icon={<AwardIcon />}
                title="Calidad comprobada"
                text="Materiales certificados y garantía por escrito en cada trabajo."
              />
            </Reveal>
            <Reveal delay={180}>
              <Value
                icon={<ClockIcon />}
                title="Puntualidad real"
                text="Agendamos y cumplimos; comunicación clara durante todo el proceso."
              />
            </Reveal>
            <Reveal delay={240}>
              <Value
                icon={<WrenchIcon />}
                title="Soluciones a medida"
                text="Desde diagnósticos a proyectos llave en mano, según tu necesidad."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* LÍNEA DEL TIEMPO */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Reveal>
            <h2 className="text-2xl font-bold text-white">Nuestra trayectoria</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              Crecer, certificar y especializar: así hemos construido confianza en la región.
            </p>
          </Reveal>

          <ol className="mt-8 relative border-l border-white/15 pl-6 space-y-8">
            <Reveal delay={60}>
              <TimelineItem
                year="2016"
                title="Arranque de operaciones"
                text="Primeras cuadrillas y contratos residenciales en el Valle de Orizaba."
              />
            </Reveal>
            <Reveal delay={120}>
              <TimelineItem
                year="2019"
                title="Estandarización y seguridad"
                text="Protocolos internos, bitácoras de obra y adopción de mejores prácticas."
              />
            </Reveal>
            <Reveal delay={180}>
              <TimelineItem
                year="2022"
                title="Expansión a sector comercial"
                text="Instalaciones trifásicas, tableros, puesta a tierra y mantenimiento."
              />
            </Reveal>
            <Reveal delay={240}>
              <TimelineItem
                year="2025"
                title="Respuesta 24/7 y proyectos integrales"
                text="Atención de emergencias, contratos de mantenimiento y fabricación ligera."
              />
            </Reveal>
          </ol>
        </div>
      </section>

      {/* GALERÍA MASONRY (nuevo diseño) */}
      <section id="galeria" className="border-t border-white/10 bg-white/5">
  <div className="mx-auto max-w-7xl px-4 py-12">
    <div className="flex items-end justify-between gap-4">
      <Reveal>
        <div>
          <h2 className="text-2xl font-bold text-white">Galería de trabajos</h2>
          <p className="mt-2 max-w-2xl text-slate-300">
            Un vistazo real a nuestros proyectos, procesos y resultados.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <Link
          to="/servicios"
          className="hidden sm:inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/15"
        >
          Ver servicios
        </Link>
      </Reveal>
    </div>

    {/* REEMPLAZA MasonryGallery POR ESTO */}
    <UniformGallery
      images={gallery}      // mismo array que ya usas
      onOpen={open}         // tu handler para lightbox
      aspect="4/3"          // cambia a "3/2", "16/9" o "1/1" si prefieres
    />

    {openIdx !== null && (
      <Lightbox
        index={openIdx}
        items={gallery}
        onClose={close}
        onPrev={prev}
        onNext={next}
        onJump={jump}
      />
    )}
  </div>
</section>

      {/* PDF */}
      <section className="mx-auto max-w-6xl px-4 mt-16">
        <div className="flex items-center justify-between gap-3">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Documento institucional
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex gap-2">
              <a
                href={pdfFile}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
              >
                Descargar
              </a>
              <a
                href={pdfFile}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-slate-100 hover:bg-white/15"
              >
                Abrir en pestaña
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 shadow-lg bg-black/20">
            <iframe
              title="Documento institucional MSVO"
              src={`${pdfFile}#view=FitH&toolbar=0&navpanes=0`}
              className="w-full h-[80vh] md:h-[70vh]"
            />
          </div>
          <p className="mt-3 text-sm text-slate-300">
            Si tu navegador no muestra el documento, puedes{" "}
            <a href={pdfFile} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
              abrirlo aquí
            </a>.
          </p>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section className="relative border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Reveal>
            <div className="grid gap-6 rounded-3xl bg-white/10 p-8 ring-1 ring-white/10 backdrop-blur">
              <div>
                <h3 className="text-2xl font-bold text-white">¿Hablamos de tu proyecto?</h3>
                <p className="mt-1 text-slate-300">
                  Cotización sin costo, visita técnica y recomendaciones honestas.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-white shadow-sm hover:bg-blue-700"
                >
                  Solicitar cotización
                </Link>
                <Link
                  to="/servicios"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-slate-100 hover:bg-white/15"
                >
                  Ver servicios
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ---------- Subcomponentes ---------- */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-sm backdrop-blur">
      <p className="text-3xl font-extrabold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-300">{label}</p>
    </div>
  );
}
function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-sm backdrop-blur">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white">{icon}</div>
      <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-300">{text}</p>
    </div>
  );
}
function TimelineItem({ year, title, text }: { year: string; title: string; text: string }) {
  return (
    <li className="relative">
      <span className="absolute -left-[9px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
      <div className="grid gap-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">{year}</p>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-sm text-slate-300">{text}</p>
      </div>
    </li>
  );
}

/* ---------- Icons ---------- */
function ShieldIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.25c-.31 0-.62.07-.9.2l-6 2.67A1.5 1.5 0 0 0 4.5 6.5v5.22a9.75 9.75 0 0 0 6.9 9.36c.38.12.8.12 1.18 0a9.75 9.75 0 0 0 6.92-9.36V6.5c0-.6-.36-1.14-.9-1.38l-6-2.67c-.28-.13-.58-.2-.9-.2Z" />
    </svg>
  );
}
function AwardIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a6 6 0 1 0 0 12A6 6 0 0 0 12 2Zm-3.5 13.5A8.5 8.5 0 0 0 12 21a8.5 8.5 0 0 0 3.5-5.5l2 .5V22l-3.5-1-2 1-2-1L6.5 22v-6.5l2-.5Z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Zm.75 5.25a.75.75 0 0 0-1.5 0V12c0 .3.18.56.45.67l4.5 1.8a.75.75 0 0 0 .56-1.4l-4.01-1.6V7.5Z" />
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 7.5a5.5 5.5 0 0 1-8.03 4.92l-7.3 7.3a1.5 1.5 0 1 1-2.12-2.12l7.3-7.3A5.5 5.5 0 1 1 21 7.5Zm-3.25 0a1.75 1.75 0 1 0-3.5 0 1.75 1.75 0 0 0 3.5 0Z" />
    </svg>
  );
}
