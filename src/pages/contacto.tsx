import { useState } from "react";
import { Link } from "react-router-dom";

const API = "http://127.0.0.1:8000"; // ajusta si usas otra base

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
      e.mensaje = "Describe tu necesidad (mínimo 10 caracteres)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch(`${API}/api/contacto/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrors(err || { mensaje: "No se pudo enviar" });
        return;
      }
      setSent(true);
      setForm({ nombre: "", email: "", mensaje: "" });
    } catch {
      setErrors({ mensaje: "No se pudo enviar. Intenta más tarde." });
    } finally {
      setSending(false);
    }
  };

  const wspHref = `https://wa.me/522721104741?text=${encodeURIComponent(
    `Hola MSVO, soy ${form.nombre || "(tu nombre)"}.
Me interesa solicitar información: ${form.mensaje || "(tu mensaje)"}`
  )}`;

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="container py-10 sm:py-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-cyan-200 ring-1 ring-white/10">
            <span className="inline-block size-1.5 rounded-full bg-cyan-400" />
            Contáctanos
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Conversemos sobre tu proyecto
          </h1>
          <p className="mt-2 max-w-2xl text-slate-300">
            Te respondemos el mismo día hábil. También puedes escribirnos por
            WhatsApp para atención inmediata.
          </p>
        </div>
      </section>

      {/* GRID principal */}
      <section className="container pb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Tarjeta de información */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-xl ring-1 ring-black/5">
            <p className="text-xs font-semibold text-slate-400">
              INFORMACIÓN DE CONTACTO
            </p>
            <h3 className="mt-1 text-lg font-semibold">Multiservicios Valle de Orizaba</h3>
            <p className="mt-1 text-slate-300">
              Servicios eléctricos confiables para hogares, comercios e
              industria.
            </p>

            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-7 items-center justify-center rounded-full bg-white/10">
                  📞
                </span>
                <div>
                  <div className="text-slate-400">Teléfono</div>
                  <a className="font-medium text-white hover:underline" href="tel:+522721104741">
                    (272) 110 4741
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-7 items-center justify-center rounded-full bg-white/10">
                  ✉️
                </span>
                <div>
                  <div className="text-slate-400">Email</div>
                  <a
                    className="font-medium text-white hover:underline"
                    href="mailto:mmartinez@multiserviciosvo.com"
                  >
                    mmartinez@multiserviciosvo.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-7 items-center justify-center rounded-full bg-white/10">
                  📍
                </span>
                <div>
                  <div className="text-slate-400">Ubicación</div>
                  <div className="font-medium">Valle de Orizaba, Veracruz</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-7 items-center justify-center rounded-full bg-white/10">
                  🕒
                </span>
                <div>
                  <div className="text-slate-400">Horario</div>
                  <div className="font-medium">Lun–Sáb · 8:00–18:00</div>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={wspHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition"
              >
                <span className="text-lg">🟢</span> WhatsApp
              </a>
              <a
                href="tel:+522721104741"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 transition"
              >
                📞 Llamar
              </a>
              <a
                href="mailto:mmartinez@multiserviciosvo.com"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                ✉️ Email
              </a>
            </div>
          </div>

          {/* Tarjeta de formulario */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-xl ring-1 ring-black/5">
            {sent ? (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
                ¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={onChange}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="Tu nombre completo"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-rose-300">{errors.nombre}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Correo
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-300">{errors.email}</p>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    rows={6}
                    value={form.mensaje}
                    onChange={onChange}
                    className="w-full resize-none rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="Cuéntanos brevemente tu necesidad…"
                  />
                  {errors.mensaje && (
                    <p className="mt-1 text-xs text-rose-300">{errors.mensaje}</p>
                  )}
                </div>

                {/* Botones */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    disabled={sending}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {sending ? "Enviando…" : "Enviar mensaje"}
                    <span className="text-lg">➜</span>
                  </button>

                  <a
                    href={wspHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
                  >
                    🟢 WhatsApp
                  </a>

                  <Link
                    to="/servicios"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/15"
                  >
                    Ver servicios
                  </Link>
                </div>

                {/* Errores globales */}
                {errors.mensaje && !sent && (
                  <p className="pt-2 text-sm text-rose-300">{errors.mensaje}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="container pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-xl ring-1 ring-black/5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400">¿CÓMO LLEGAR?</p>
              <h4 className="text-base font-semibold">Valle de Orizaba, Veracruz</h4>
            </div>
            <a
              href="https://maps.app.goo.gl/RHo3aYdnqgA1mY4C8"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
            >
              Abrir en Maps
            </a>
          </div>

          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
            <iframe
              title="Ubicación MSVO"
              src="https://www.google.com/maps?q=Valle%20de%20Orizaba%2C%20Veracruz&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
