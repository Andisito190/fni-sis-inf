import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminGetEventos, adminCreateEvento, adminUpdateEvento, adminDeleteEvento } from '../../services/admin';
import type { Evento } from '../../types/admin';
import FileUpload from '../../components/admin/FileUpload';

const emptyForm = { titulo: '', descripcion: '', fecha_inicio: '', fecha_fin: '', lugar: '', imagen: '' };

export default function AdminEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Evento | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => { setEventos(await adminGetEventos()); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin || null,
      lugar: form.lugar || null,
      imagen: form.imagen || null,
    };
    if (editing) {
      await adminUpdateEvento(editing.idEvento, payload);
    } else {
      await adminCreateEvento(payload);
    }
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleEdit = (ev: Evento) => {
    setEditing(ev);
    setForm({
      titulo: ev.titulo,
      descripcion: ev.descripcion,
      fecha_inicio: ev.fechaInicio.slice(0, 16),
      fecha_fin: ev.fechaFin?.slice(0, 16) || '',
      lugar: ev.lugar || '',
      imagen: ev.imagen || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro?')) return;
    await adminDeleteEvento(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Eventos</h1>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#0B3558] text-white text-sm font-medium rounded-md hover:bg-[#0C5C8C]">
          <Plus className="w-4 h-4" /> Nuevo evento
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
                <th className="text-left px-4 py-3 font-medium text-gray-600">Lugar</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((ev) => (
                <tr key={ev.idEvento} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {ev.imagen ? (
                      <img src={ev.imagen} alt={ev.titulo} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">Sin img</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{ev.titulo}</td>
                  <td className="px-4 py-3">{new Date(ev.fechaInicio).toLocaleDateString('es-BO')}</td>
                  <td className="px-4 py-3">{ev.lugar || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${ev.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {ev.estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(ev)} className="p-1 text-gray-500 hover:text-[#1684B8]"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(ev.idEvento)} className="p-1 text-gray-500 hover:text-red-600 ml-2"><Trash2 className="w-4 h-4" /></button>
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
              <h2 className="text-lg font-bold text-[#1F2937]">{editing ? 'Editar evento' : 'Nuevo evento'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                <FileUpload
                  tipo="evento"
                  currentImage={form.imagen}
                  onUpload={(path) => setForm({ ...form, imagen: path })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} required rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                  <input type="datetime-local" value={form.fecha_inicio} onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                  <input type="datetime-local" value={form.fecha_fin} onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lugar</label>
                <input type="text" value={form.lugar} onChange={(e) => setForm({ ...form, lugar: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
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
