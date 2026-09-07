import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, BookOpen, ToggleLeft, ToggleRight } from 'lucide-react';
import { adminGetDocentes, adminCreateDocente, adminUpdateDocente, adminDeleteDocente } from '../../services/admin';
import adminApi from '../../services/adminApi';
import type { Docente } from '../../types/admin';
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

export default function AdminDocentes() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Docente | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null);
  const [asignaciones, setAsignaciones] = useState<AsignacionMateria[]>([]);

  const load = async () => { setDocentes(await adminGetDocentes()); };
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
      await adminUpdateDocente(editing.idDocente, payload);
    } else {
      await adminCreateDocente(payload);
    }
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleEdit = (d: Docente) => {
    setEditing(d);
    setForm({ nombre: d.nombre, apellido: d.apellido, correo: d.correo || '', telefono: d.telefono || '', foto: d.foto || '' });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro?')) return;
    await adminDeleteDocente(id);
    load();
  };

  const handleToggleEstado = async (d: Docente) => {
    await adminUpdateDocente(d.idDocente, { estado: !d.estado });
    load();
  };

  const handleAssignClick = async (d: Docente) => {
    setSelectedDocente(d);
    try {
      const { data } = await adminApi.get(`/docentes/${d.idDocente}/materias`);
      setAsignaciones((data || []).map((a: any) => ({
        id: a.id_docente_materia,
        id_materia: a.id_materia,
        paralelo: a.paralelo,
        gestion: a.gestion,
        materia: { idMateria: a.materia.id_materia, nombreM: a.materia.nombre_m, siglaM: a.materia.sigla_m },
      })));
    } catch {
      setAsignaciones([]);
    }
    setShowAssign(true);
  };

  const refreshAsignaciones = async () => {
    if (!selectedDocente) return;
    const { data } = await adminApi.get(`/docentes/${selectedDocente.idDocente}/materias`);
    setAsignaciones((data || []).map((a: any) => ({
      id: a.id_docente_materia,
      id_materia: a.id_materia,
      paralelo: a.paralelo,
      gestion: a.gestion,
      materia: { idMateria: a.materia.id_materia, nombreM: a.materia.nombre_m, siglaM: a.materia.sigla_m },
    })));
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Docentes</h1>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#0B3558] text-white text-sm font-medium rounded-md hover:bg-[#0C5C8C]">
          <Plus className="w-4 h-4" /> Nuevo docente
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
              {docentes.map((d) => (
                <tr key={d.idDocente} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {d.foto ? (
                      <img src={d.foto} alt={d.nombre} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0B3558] flex items-center justify-center text-white text-sm font-bold">
                        {d.nombre.charAt(0)}{d.apellido.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{d.nombre} {d.apellido}</td>
                  <td className="px-4 py-3">{d.correo || '-'}</td>
                  <td className="px-4 py-3">{d.telefono || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => handleToggleEstado(d)} className={d.estado ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'} title={d.estado ? 'Activo — click para desactivar' : 'Inactivo — click para activar'}>
                      {d.estado ? <ToggleRight className="w-6 h-6 inline" /> : <ToggleLeft className="w-6 h-6 inline" />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleAssignClick(d)} className="p-1 text-gray-500 hover:text-[#0B3558]" title="Asignar materias"><BookOpen className="w-4 h-4" /></button>
                    <button onClick={() => handleEdit(d)} className="p-1 text-gray-500 hover:text-[#1684B8] ml-1"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(d.idDocente)} className="p-1 text-gray-500 hover:text-red-600 ml-1"><Trash2 className="w-4 h-4" /></button>
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
              <h2 className="text-lg font-bold text-[#1F2937]">{editing ? 'Editar docente' : 'Nuevo docente'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                <FileUpload
                  tipo="docente"
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

      {showAssign && selectedDocente && (
        <AssignMateria
          tipo="docente"
          personaId={selectedDocente.idDocente}
          personaNombre={`${selectedDocente.nombre} ${selectedDocente.apellido}`}
          asignaciones={asignaciones}
          onClose={() => setShowAssign(false)}
          onSaved={refreshAsignaciones}
        />
      )}
    </div>
  );
}
