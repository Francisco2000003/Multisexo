import { useState } from "react";
import { Link } from "react-router-dom";

/** ---------- Iconos minimalistas (SVG inline) ---------- */
const Icon = {
  Phone: () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"/>
    </svg>
  ),
  Mail: () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4a2 2 0 00-2 2v.35l10 6.25 10-6.25V6a2 2 0 00-2-2zm0 4.8l-8.55 5.34a1 1 0 01-1.1 0L4 8.8V18a2 2 0 002 2h12a2 2 0 002-2V8.8z"/>
    </svg>
  ),
  MapPin: () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 112.5-2.5A2.5 2.5 0 0112 11.5z"/>
    </svg>
  ),
  Clock: () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm1 11.59l4.3 2.48-.75 1.3L11 13V6h2z"/>
    </svg>
  ),
  Whats: () => (
    <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor">
      <path d="M19.11 17.34a5.4 5.4 0 01-2.61-.71 10.22 10.22 0 01-3.3-2.9 7.08 7.08 0 01-1.3-2.45.86.86 0 01.21-.91c.17-.18.39-.42.62-.64s.39-.42.55-.62a.75.75 0 01.64-.28.84.84 0 01.58.27c.2.22.43.51.67.84s.44.58.59.8a.8.8 0 01.13.73 2.07 2.07 0 01-.24.43 1.68 1.68 0 00-.21.4.3.3 0 000 .26 5.61 5.61 0 001 .95 6.39 6.39 0 001.13.75.32.32 0 00.27 0 3.06 3.06 0 00.49-.3 2.75 2.75 0 01.48-.27.75.75 0 01.77.12c.2.16.43.37.7.61s.53.45.73.62a.84.84 0 01.29.62.88.88 0 01-.09.42c-.05.09-.11.21-.18.34a1.38 1.38 0 01-.29.36 1 1 0 01-.71.27z"/>
      <path d="M16 3a13 13 0 00-11 19.49L4 29l6.7-1.76A12.95 12.95 0 1016 3zm0 23a10 10 0 01-5.1-1.39l-.36-.21-3.95 1.04 1.06-3.85-.24-.39A9.99 9.99 0 1116 26z"/>
    </svg>
  ),
  ArrowR: () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.172 7l-1.414 1.414L14.343 11H4v2h10.343l-2.585 2.586L13.172 17 18 12z"/>
    </svg>
  ),
};

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.nombre.trim()) e.nombre = "Ingresa tu nombre";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo inválido";
    if (form.mensaje.trim().length < 10)
      e.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // al inicio del archivo:
const API = "http://127.0.0.1:8000";  // ajusta si usas otra base

// dentro de Contacto():
const onSubmit = async (ev: React.FormEvent) => {
  ev.preventDefault();
  if (!validate()) return;

  setSending(true);
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/contacto/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      setErrors(err);
      setSending(false);
      return;
    }

    setSent(true);
  } catch (e) {
    setErrors({ mensaje: "No se pudo enviar. Intenta más tarde." });
  } finally {
    setSending(false);
  }
};


  return (
    <section className="relative isolate">
      {/* Fondo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Contáctanos
        </h1>
        <p className="mt-2 text-slate-300 max-w-2xl">
          Te respondemos el mismo día hábil. También puedes escribirnos por WhatsApp
          para atención inmediata.
        </p>

        {/* Grid principal */}
        <div className="mt-10 grid gap-8 md:grid-cols-5">
          {/* Aside izquierdo */}
          <aside className="md:col-span-2">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-6 space-y-6">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-300/70">
                  Información de contacto
                </p>
                <h2 className="text-xl font-semibold text-white mt-1">
                  Multiservicios Valle de Orizaba
                </h2>
                <p className="text-slate-300/80 mt-2">
                  Servicios eléctricos confiables para hogares, comercios e industria.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-slate-400"><Icon.Phone /></span>
                  <div>
                    <p className="text-sm text-slate-400">Teléfono</p>
                    <a href="tel:+522721104741" className="font-medium hover:underline">
                      (272) 110 4741
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-slate-400"><Icon.Mail /></span>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a href="mailto:mmartinez@multiserviciosvo.com" className="font-medium hover:underline">
                      mmartinez@multiserviciosvo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-slate-400"><Icon.MapPin /></span>
                  <div>
                    <p className="text-sm text-slate-400">Ubicación</p>
                    <p className="font-medium">Valle de Orizaba, Veracruz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-slate-400"><Icon.Clock /></span>
                  <div>
                    <p className="text-sm text-slate-400">Horario</p>
                    <p className="font-medium">Lun–Sáb · 8:00–18:00</p>
                  </div>
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/522721104741?text=Hola%20MSVO,%20me%20gustar%C3%ADa%20cotizar%20un%20servicio"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-white font-semibold shadow hover:bg-green-600"
                >
                  <Icon.Whats /> WhatsApp
                </a>
                <a
                  href="tel:+522721104741"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white font-semibold ring-1 ring-white/20 hover:bg-white/20"
                >
                  <Icon.Phone /> Llamar
                </a>
                <a
                  href="mailto:mmartinez@multiserviciosvo.com"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white font-semibold shadow hover:bg-blue-700"
                >
                  <Icon.Mail /> Email
                </a>
              </div>
            </div>
          </aside>

          {/* Formulario derecho */}
          <div className="md:col-span-3">
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 md:p-8">
              {sent ? (
                <div className="p-6 rounded-xl bg-green-50 text-green-700">
                  ¡Gracias! Hemos recibido tu mensaje. Te contactaremos muy pronto.
                </div>
              ) : (
                <form className="grid gap-5" onSubmit={onSubmit} noValidate>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Nombre
                    </label>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={onChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                      placeholder="Tu nombre completo"
                    />
                    {errors.nombre && (
                      <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Correo
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                      placeholder="mmartinez@multiserviciosvo.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Mensaje
                    </label>
                    <textarea
                      name="mensaje"
                      rows={6}
                      value={form.mensaje}
                      onChange={onChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                      placeholder="Cuéntanos brevemente tu necesidad…"
                    />
                    {errors.mensaje && (
                      <p className="text-sm text-red-600 mt-1">{errors.mensaje}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-70"
                    >
                      {sending ? "Enviando…" : "Enviar mensaje"} <Icon.ArrowR />
                    </button>

                    <a
                      href="https://wa.me/522721104741?text=Hola%20MSVO,%20me%20gustar%C3%ADa%20cotizar%20un%20servicio"
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-white font-semibold shadow hover:bg-green-600"
                    >
                      <Icon.Whats /> WhatsApp
                    </a>

                    <Link
                      to="/servicios"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-slate-700 font-semibold hover:bg-slate-50"
                    >
                      Ver servicios
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ---------- Mapa debajo ---------- */}
        <div className="mt-10">
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-300/70">
                  ¿Cómo llegar?
                </p>
                <h2 className="text-lg font-semibold text-white">
                  Valle de Orizaba, Veracruz
                </h2>
              </div>
              <div className="hidden sm:flex gap-2">
                <a
                  href="https://maps.app.goo.gl/iqDzuTUFYsiqm4n38"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-blue-700"
                >
                  Abrir en Maps
                </a>
              </div>
            </div>
            <div className="relative h-[360px] w-full">
              <iframe
                title="Ubicación MSVO - Valle de Orizaba"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3775.398052186057!2d-97.10737793128753!3d18.86941441342526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c51d4eeb304cc3%3A0x7444acce37593301!2sProl.%20de%20Nte.%2010%2041%2C%20El%20Espinal%2C%2094310%20Orizaba%2C%20Ver.!5e0!3m2!1ses-419!2smx!4v1762062673921!5m2!1ses-419!2smx"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
