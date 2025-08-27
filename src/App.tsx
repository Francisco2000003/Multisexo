// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// Si aún no tienes la página de lista de servicios, puedes dejarla como placeholder:
function Servicios() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Servicios</h1>
      <p className="mt-2 text-slate-600">
        Aquí irá el listado completo de servicios.
      </p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Servicios />} />
      {/* Ejemplos de rutas futuras:
      <Route path="/servicios/:id" element={<ServicioDetalle />} />
      <Route path="/contacto" element={<Contacto />} />
      */}
    </Routes>
  );
}
