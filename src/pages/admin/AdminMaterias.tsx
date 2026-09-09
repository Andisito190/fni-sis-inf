import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminGetMaterias } from '../../services/admin';
import adminApi from '../../services/adminApi';
import type { Materia } from '../../types/admin';

export default function AdminMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Materia | null>(null);
  const [form, setForm] = useState({ nombre_m: '', sigla_m: '', descripcion: '' });

  const load = async () => { setMaterias(await adminGetMaterias()); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi.put(`/auxiliares/materias/${editing.idMateria}`, form);
      } else {
        await adminApi.post('/auxiliares/materias', form);
      }
      setShowModal(false);
      setEditing(null);
      setForm({ nombre_m: '', sigla_m: '', descripcion: '' });
      load();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error al guardar');
    }
  };

  const handleEdit = (m: Materia) => {
    setEditing(m);
    setForm({ nombre_m: m.nombreM, sigla_m: m.siglaM, descripcion: m.descripcion || '' });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar esta materia?')) return;
    try {
      await adminApi.delete(`/auxiliares/materias/${id}`);
      load();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error al eliminar');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Materias</h1>
        <button onClick={() => { setEditing(null); setForm({ nombre_m: '', sigla_m: '', descripcion: '' }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#0B3558] text-white text-sm font-medium rounded-md hover:bg-[#0C5C8C]">
          <Plus className="w-4 h-4" /> Nueva materia
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Nombre</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Sigla</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Descripción</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((m) => (
                <tr key={m.idMateria} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{m.idMateria}</td>
                  <td className="px-4 py-3 font-medium">{m.nombreM}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-mono">{m.siglaM}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-[200px] truncate">{m.descripcion || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(m)} className="p-1 text-gray-500 hover:text-[#1684B8]"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(m.idMateria)} className="p-1 text-gray-500 hover:text-red-600 ml-2"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md border border-gray-200 w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1F2937]">{editing ? 'Editar materia' : 'Nueva materia'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la materia</label>
                <input type="text" value={form.nombre_m} onChange={(e) => setForm({ ...form, nombre_m: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" placeholder="Ej: Programación I" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sigla</label>
                <input type="text" value={form.sigla_m} onChange={(e) => setForm({ ...form, sigla_m: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8] font-mono" placeholder="Ej: SIS-1110" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8] resize-none" placeholder="Breve descripción de la materia..." />
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
