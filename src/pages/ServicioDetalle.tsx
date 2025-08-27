import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";

type Servicio = { id:number; titulo:string; descripcion:string; imagen?:string|null };

export default function ServicioDetalle() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState<Servicio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (!id) return;
    api.get<Servicio>(`/servicios/${id}/`)
      .then(r => setData(r.data))
      .catch(() => setError("No se pudo cargar el servicio"))
      .finally(() => setLoading(false));
  }, [id]);

  const share = async () => {
    const url = window.location.href;
    if ((navigator as any).share) {
      try { await (navigator as any).share({ title: data?.titulo, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Enlace copiado al portapapeles");
    }
  };

  if (loading) return <div className="p-8 text-xl">Cargando…</div>;
  if (error || !data) return <div className="p-8 text-red-600">{error ?? "No encontrado"}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500">
        <Link className="hover:underline" to="/">Inicio</Link> <span>›</span>{" "}
        <Link className="hover:underline" to="/servicios">Servicios</Link> <span>›</span>{" "}
        <span className="text-gray-700">{data.titulo}</span>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-8 items-start">
        <div>
          {data.imagen ? (
            <img src={data.imagen} alt={data.titulo} className="w-full rounded-xl border shadow-sm" />
          ) : (
            <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl grid place-items-center text-gray-400">Sin imagen</div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{data.titulo}</h1>
          <p className="mt-4 text-gray-700 whitespace-pre-line">{data.descripcion}</p>

          <div className="mt-6 flex gap-3">
            <button onClick={() => nav(-1)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50">Regresar</button>
            <button onClick={share}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
