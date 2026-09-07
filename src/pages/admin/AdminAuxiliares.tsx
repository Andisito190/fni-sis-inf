import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, BookOpen, ToggleLeft, ToggleRight } from 'lucide-react';
import { adminGetAuxiliares, adminCreateAuxiliar, adminUpdateAuxiliar, adminDeleteAuxiliar } from '../../services/admin';
import adminApi from '../../services/adminApi';
import type { Auxiliar } from '../../types/admin';
import FileUpload from '../../components/admin/FileUpload';
import AssignMateria from '../../components/admin/AssignMateria';

interface AsignacionMateria {
  id: number;
  id_materia: number;
  paralelo: string;
  gestion: string;
  materia: { idMateria: number; nombreM: string; siglaM: string };
}

const emptyForm = { nombre: '', apellido: '', correo: '', telefono: '', foto: '' };

export default function AdminAuxiliares() {
  const [auxiliares, setAuxiliares] = useState<Auxiliar[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Auxiliar | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedAuxiliar, setSelectedAuxiliar] = useState<Auxiliar | null>(null);
  const [asignaciones, setAsignaciones] = useState<AsignacionMateria[]>([]);

  const load = async () => { setAuxiliares(await adminGetAuxiliares()); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.correo || null,
      telefono: form.telefono || null,
      foto: form.foto || null,
    };
    if (editing) {
      await adminUpdateAuxiliar(editing.idAuxiliar, payload);
    } else {
      await adminCreateAuxiliar(payload);
    }
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleEdit = (a: Auxiliar) => {
    setEditing(a);
    setForm({ nombre: a.nombre, apellido: a.apellido, correo: a.correo || '', telefono: a.telefono || '', foto: a.foto || '' });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro?')) return;
    await adminDeleteAuxiliar(id);
    load();
  };

  const handleToggleEstado = async (a: Auxiliar) => {
    await adminUpdateAuxiliar(a.idAuxiliar, { estado: !a.estado });
    load();
  };

  const handleAssignClick = async (a: Auxiliar) => {
    setSelectedAuxiliar(a);
    try {
      const { data } = await adminApi.get(`/auxiliares/${a.idAuxiliar}/materias`);
      setAsignaciones((data || []).map((am: any) => ({
        id: am.id_auxiliar_materia,
        id_materia: am.id_materia,
        paralelo: am.paralelo,
        gestion: am.gestion,
        materia: { idMateria: am.materia.id_materia, nombreM: am.materia.nombre_m, siglaM: am.materia.sigla_m },
      })));
    } catch {
      setAsignaciones([]);
    }
    setShowAssign(true);
  };

  const refreshAsignaciones = async () => {
    if (!selectedAuxiliar) return;
    const { data } = await adminApi.get(`/auxiliares/${selectedAuxiliar.idAuxiliar}/materias`);
    setAsignaciones((data || []).map((am: any) => ({
      id: am.id_auxiliar_materia,
      id_materia: am.id_materia,
      paralelo: am.paralelo,
      gestion: am.gestion,
      materia: { idMateria: am.materia.id_materia, nombreM: am.materia.nombre_m, siglaM: am.materia.sigla_m },
    })));
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Auxiliares</h1>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#0B3558] text-white text-sm font-medium rounded-md hover:bg-[#0C5C8C]">
          <Plus className="w-4 h-4" /> Nuevo auxiliar
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Foto</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Nombre</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Correo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Teléfono</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {auxiliares.map((a) => (
                <tr key={a.idAuxiliar} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {a.foto ? (
                      <img src={a.foto} alt={a.nombre} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0B3558] flex items-center justify-center text-white text-sm font-bold">
                        {a.nombre.charAt(0)}{a.apellido.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{a.nombre} {a.apellido}</td>
                  <td className="px-4 py-3">{a.correo || '-'}</td>
                  <td className="px-4 py-3">{a.telefono || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => handleToggleEstado(a)} className={a.estado ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'} title={a.estado ? 'Activo — click para desactivar' : 'Inactivo — click para activar'}>
                      {a.estado ? <ToggleRight className="w-6 h-6 inline" /> : <ToggleLeft className="w-6 h-6 inline" />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleAssignClick(a)} className="p-1 text-gray-500 hover:text-[#0B3558]" title="Asignar materias"><BookOpen className="w-4 h-4" /></button>
                    <button onClick={() => handleEdit(a)} className="p-1 text-gray-500 hover:text-[#1684B8] ml-1"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(a.idAuxiliar)} className="p-1 text-gray-500 hover:text-red-600 ml-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md border border-gray-200 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1F2937]">{editing ? 'Editar auxiliar' : 'Nuevo auxiliar'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                <FileUpload
                  tipo="auxiliar"
                  currentImage={form.foto}
                  onUpload={(path) => setForm({ ...form, foto: path })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input type="text" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                <input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="Ej: 70000001" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]" />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-[#0B3558] rounded-md hover:bg-[#0C5C8C]">{editing ? 'Guardar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAssign && selectedAuxiliar && (
        <AssignMateria
          tipo="auxiliar"
          personaId={selectedAuxiliar.idAuxiliar}
          personaNombre={`${selectedAuxiliar.nombre} ${selectedAuxiliar.apellido}`}
          asignaciones={asignaciones}
          onClose={() => setShowAssign(false)}
          onSaved={refreshAsignaciones}
        />
      )}
    </div>
  );
}
