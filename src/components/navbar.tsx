import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logoEmpresa.png"; // 👈 ajusta la ruta al archivo de tu logo (por ejemplo en /src/assets/)

const nav = [
  { to: "/", label: "Inicio", end: true },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkCls = (isActive: boolean) =>
    `block px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-900 sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo + Nombre */}
        <Link to="logoEmpresa.png" className="flex items-center gap-1 text-white font-bold text-lg md:text-xl">
  <img src={logo} alt="MSVO logo" className="h-10 w-auto md:h-12" />
  <span>Multiservicios Valle de Orizaba</span>
</Link>


        {/* Desktop menu */}
        <div className="hidden md:flex gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) => linkCls(isActive)}
            >
              {n.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d={
                open
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) => linkCls(isActive)}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
