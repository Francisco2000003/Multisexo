// components/UniformGallery.tsx
import React from "react";

type ImgItem = {
  src: string;
  alt?: string;
  title?: string;
};

export default function UniformGallery({
  images,
  onOpen,
  aspect = "4/3", // puedes pasar "16/9", "1/1", etc.
}: {
  images: ImgItem[];
  onOpen: (idx: number) => void;
  aspect?: "4/3" | "16/9" | "1/1" | "3/2";
}) {
  // Mapa de clases tailwind para aspect-ratio
  const aspectCls = {
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
  }[aspect];

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onOpen(i)}
          className="group relative overflow-hidden rounded-xl bg-slate-800/40 ring-1 ring-white/10"
          aria-label={img.alt || img.title || `Imagen ${i + 1}`}
        >
          {/* Contenedor con relación de aspecto fija */}
          <div className={["w-full", aspectCls].join(" ")}>
            <img
              src={img.src}
              alt={img.alt || img.title || ""}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Sombra suave y borde al hover */}
          <div className="pointer-events-none absolute inset-0 ring-0 ring-white/0 transition group-hover:ring-2 group-hover:ring-white/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Pie de foto opcional */}
          {img.title && (
            <div className="absolute inset-x-0 bottom-0 p-2">
              <p className="truncate rounded-md bg-black/45 px-2 py-1 text-xs font-medium text-slate-100 backdrop-blur">
                {img.title}
              </p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
