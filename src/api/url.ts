// src/api/url.ts
// VITE_API_BASE debería ser algo tipo: http://127.0.0.1:8000/api/
export const API_BASE = import.meta.env.VITE_API_BASE as string;
// host del backend sin /api
export const BACKEND_BASE = API_BASE.replace(/\/api\/?$/, '');

export function buildImageUrl(src?: string | null): string | undefined {
  if (!src) return undefined;
  // si ya viene absoluta, úsala
  if (/^https?:\/\//i.test(src)) return src;
  // si viene relativa (ej. /media/servicios/...), anteponemos hostname del backend
  return `${BACKEND_BASE}${src.startsWith('/') ? '' : '/'}${src}`;
}
