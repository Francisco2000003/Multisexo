import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre:"", email:"", mensaje:"" });
  const [errors, setErrors] = useState<{[k:string]:string}>({});
  const [sent, setSent] = useState(false);

  const onChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e: {[k:string]:string} = {};
    if (!form.nombre.trim()) e.nombre = "Ingresa tu nombre";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo inválido";
    if (form.mensaje.trim().length < 10) e.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres)";
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const onSubmit = (ev:React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // Aquí puedes enviar al backend si quieres (DRF, Email, etc.)
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Contacto</h1>
      <p className="text-gray-600 mt-1">Te respondemos el mismo día hábil.</p>

      {sent ? (
        <div className="mt-6 p-4 border rounded-md bg-green-50 text-green-700">
          ¡Gracias! Hemos recibido tu mensaje.
        </div>
      ) : (
        <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={onChange}
              className="mt-1 w-full border rounded-md px-3 py-2" />
            {errors.nombre && <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Correo</label>
            <input name="email" type="email" value={form.email} onChange={onChange}
              className="mt-1 w-full border rounded-md px-3 py-2" />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Mensaje</label>
            <textarea name="mensaje" rows={5} value={form.mensaje} onChange={onChange}
              className="mt-1 w-full border rounded-md px-3 py-2" />
            {errors.mensaje && <p className="text-sm text-red-600 mt-1">{errors.mensaje}</p>}
          </div>
          <div className="pt-2">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Enviar mensaje
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
