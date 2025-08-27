// frontend/src/layouts/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import logo from "../assets/logoEmpresa2.png"; // ← ajusta si tu ruta es distinta

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-300 text-sm py-10 mt-16">
        {/* 4 columnas en desktop para dejar el bloque social a la derecha */}
        <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-4">
          {/* Col 1 */}
          <div>
            <p className="font-semibold text-white">
              Multiservicios Valle de Orizaba
            </p>
            <p className="mt-2 text-gray-400">
              Instalaciones y mantenimiento eléctrico confiable para hogares y
              empresas.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <p className="font-semibold text-white">Contacto</p>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>Tel: (272) 000 0000</li>
              <li>Email: contacto@multiserviciosvo.com</li>
              <li>Valle de Orizaba, Veracruz</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <p className="font-semibold text-white">Horarios</p>
            <p className="mt-2 text-gray-400">Lun–Sáb · 8:00 – 18:00</p>
          </div>

          {/* Col 4 (NUEVO) – bloque con logo + texto + redes */}
          <div className="md:text-right">
            <div className="flex md:justify-end">
              <img
                src={logo}
                alt="MSVO Logo"
                className="h-24 w-auto object-contain"
                loading="lazy"
              />
            </div>

            <p className="mt-3 text-gray-400">
              MSVO brindando servicios profesionales en la industria y el
              comercio.
            </p>

            {/* Botones sociales redondos */}
            <div className="mt-4 flex gap-3 md:justify-end">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition"
              >
                {/* ícono Facebook */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.5-3.88 3.8-3.88 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.58v1.9h2.79l-.45 2.9h-2.34v7.03C18.34 21.22 22 17.07 22 12.06z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-sky-500 hover:text-white transition"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.244 2H21l-6.56 7.5L22 22h-6.98l-4.86-6.35L4.62 22H2l7.18-8.21L2 2h7.06l4.41 5.82L18.244 2zm-2.44 18h2.01L8.26 4H6.25l9.55 16z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white transition"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.12C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.38.58A3.01 3.01 0 0 0 .5 6.2 31.1 31.1 0 0 0 0 12c0 1.97.12 3.63.5 5.8a3.01 3.01 0 0 0 2.12 2.12C4.3 20.5 12 20.5 12 20.5s7.7 0 9.38-.58a3.01 3.01 0 0 0 2.12-2.12c.38-2.17.5-3.83.5-5.8 0-1.97-.12-3.63-.5-5.8zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-pink-500 hover:text-white transition"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zM18 7.2a1 1 0 1 0-1.999.002A1 1 0 0 0 18 7.2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 text-gray-500">
          © {new Date().getFullYear()} Multiservicios Valle de Orizaba.
        </div>
      </footer>
    </div>
  );
}
