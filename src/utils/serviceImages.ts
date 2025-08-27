// Imágenes de stock (Unsplash) según palabras clave del título/categoría.
// Puedes cambiarlas por las tuyas cuando las tengas.
const CATALOG: Record<string, string[]> = {
  electricidad: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1400&auto=format&fit=crop",
  ],
  instalacion: [
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1400&auto=format&fit=crop",
  ],
  iluminacion: [
    "https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=1400&auto=format&fit=crop",
  ],
  paneles: [
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1400&auto=format&fit=crop",
  ],
  cableado: [
    "https://images.unsplash.com/photo-1581091870595-6f2a06f9c636?q=80&w=1400&auto=format&fit=crop",
  ],
  mantenimiento: [
    "https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=1400&auto=format&fit=crop",
  ],
  emergencia: [
    "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1400&auto=format&fit=crop",
  ],
};

export function suggestImage(title: string, categoria?: string | null) {
  const key = (categoria || title || "").toLowerCase();
  for (const k of Object.keys(CATALOG)) {
    if (key.includes(k)) return CATALOG[k][0];
  }
  // Fallback genérico:
  return "https://images.unsplash.com/photo-1523861751938-12104e498b96?q=80&w=1400&auto=format&fit=crop";
}
