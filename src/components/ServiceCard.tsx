// src/components/ServiceCard.tsx
import { Link } from "react-router-dom";
import { buildImageUrl, BACKEND_BASE } from "../api/url"; // ajusta la ruta si usas alias

type Props = {
  id: number;
  titulo: string;
  descripcion?: string | null;
  imagen?: string | null; // suele venir como "/media/servicios/archivo.jpg"
};

const FALLBACK_IMG = `${BACKEND_BASE}/media/servicios/CORTEPLASMA.png`; // pon aquí un archivo que realmente exista, o usa un placeholder público

export default function ServiceCard({ id, titulo, descripcion, imagen }: Props) {
  const src = buildImageUrl(imagen) || FALLBACK_IMG;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.src !== FALLBACK_IMG) {
      el.src = FALLBACK_IMG; // cambia a placeholder si falla
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
      <div className="relative">
        <img
          src={src}
          alt={titulo}
          className="w-full h-48 object-cover transform group-hover:scale-[1.03] transition"
          loading="lazy"
          onError={handleError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <h3 className="absolute bottom-3 left-4 right-4 text-white text-lg font-semibold drop-shadow">
          {titulo}
        </h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 line-clamp-3">{descripcion}</p>
        <div className="mt-3">
          <Link
            to={`/servicios/${id}`}
            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
          >
            Ver detalle
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 5l7 7-7 7v-4H4v-6h9V5z"/></svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
