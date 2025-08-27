import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Error 404</p>
      <h1 className="mt-2 text-3xl font-bold">Página no encontrada</h1>
      <p className="mt-2 text-gray-600">La ruta que intentas abrir no existe.</p>
      <Link to="/" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Volver al inicio
      </Link>
    </div>
  );
}
