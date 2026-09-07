import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminGetComunicados, adminCreateComunicado, adminUpdateComunicado, adminDeleteComunicado } from '../../services/admin';
import type { Comunicado } from '../../types/admin';
import FileUpload from '../../components/admin/FileUpload';

const emptyForm = { titulo: '', contenido: '', fecha_vencimiento: '', archivo: '', imagen: '' };

export default function AdminComunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Comunicado | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => { setComunicados(await adminGetComunicados()); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      titulo: form.titulo,
      contenido: form.contenido,
      fecha_vencimiento: form.fecha_vencimiento || null,
      archivo: form.archivo || null,
      imagen: form.imagen || null,
    };
    if (editing) {
      await adminUpdateComunicado(editing.idComunicado, payload);
    } else {
      await adminCreateComunicado(payload);
    }
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleEdit = (c: Comunicado) => {
    setEditing(c);
    setForm({
      titulo: c.titulo,
      contenido: c.contenido,
      fecha_vencimiento: c.fechaVencimiento?.slice(0, 16) || '',
      archivo: c.archivo || '',
      imagen: c.imagen || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro?')) return;
    await adminDeleteComunicado(id);
    load();
  };

  const handleToggleEstado = async (c: Comunicado) => {
    await adminUpdateComunicado(c.idComunicado, { estado: !c.estado });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Comunicados</h1>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#0B3558] text-white text-sm font-medium rounded-md hover:bg-[#0C5C8C]">
          <Plus className="w-4 h-4" /> Nuevo comunicado
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Imagen</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Título</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Fecha</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {comunicados.map((c) => (
                <tr key={c.idComunicado} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {c.imagen ? (
                      <img src={c.imagen} alt={c.titulo} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">Sin img</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{c.titulo}</td>
                  <td className="px-4 py-3">{new Date(c.fechaPublicacion).toLocaleDateString('es-BO')}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleEstado(c)} className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${c.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {c.estado ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(c)} className="p-1 text-gray-500 hover:text-[#1684B8]"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(c.idComunicado)} className="p-1 text-gray-500 hover:text-red-600 ml-2"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md border border-gray-200 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1F2937]">{editing ? 'Editar comunicado' : 'Nuevo comunicado'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                <FileUpload
                  tipo="comunicado"
                  currentImage={form.imagen}
                  onUpload={(path) => setForm({ ...form, imagen: path })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea value={form.contenido} onChange={(e) => setForm({ ...form, contenido: e.target.value })} required rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de vencimiento</label>
                  <input type="datetime-local" value={form.fecha_vencimiento} onChange={(e) => setForm({ ...form, fecha_vencimiento: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL del documento PDF</label>
                  <input type="text" value={form.archivo} onChange={(e) => setForm({ ...form, archivo: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-[#0B3558] rounded-md hover:bg-[#0C5C8C]">{editing ? 'Guardar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
