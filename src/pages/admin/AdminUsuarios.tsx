import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminGetUsuarios, adminCreateUsuario, adminUpdateUsuario, adminDeleteUsuario, adminGetRoles } from '../../services/admin';
import type { Usuario, Rol } from '../../types/admin';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [form, setForm] = useState({ nombre_u: '', contrasenia: '', id_rol: 2 });

  const load = async () => {
    const [u, r] = await Promise.all([adminGetUsuarios(), adminGetRoles()]);
    setUsuarios(u);
    setRoles(r);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const payload: any = { nombre_u: form.nombre_u, id_rol: form.id_rol };
      if (form.contrasenia) payload.contrasenia = form.contrasenia;
      await adminUpdateUsuario(editing.idUsuario, payload);
    } else {
      await adminCreateUsuario(form);
    }
    setShowModal(false);
    setEditing(null);
    setForm({ nombre_u: '', contrasenia: '', id_rol: 2 });
    load();
  };

  const handleEdit = (u: Usuario) => {
    setEditing(u);
    setForm({ nombre_u: u.nombreU, contrasenia: '', id_rol: u.idRol });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este usuario?')) return;
    await adminDeleteUsuario(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Usuarios</h1>
        <button
          onClick={() => { setEditing(null); setForm({ nombre_u: '', contrasenia: '', id_rol: 2 }); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B3558] text-white text-sm font-medium rounded-md hover:bg-[#0C5C8C]"
        >
          <Plus className="w-4 h-4" /> Nuevo usuario
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Usuario</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Rol</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.idUsuario} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{u.idUsuario}</td>
                  <td className="px-4 py-3 font-medium">{u.nombreU}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-[#0B3558] text-white">{u.rol.nombreRol}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${u.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {u.estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(u)} className="p-1 text-gray-500 hover:text-[#1684B8]" aria-label="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(u.idUsuario)} className="p-1 text-gray-500 hover:text-red-600 ml-2" aria-label="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
              <h2 className="text-lg font-bold text-[#1F2937]">{editing ? 'Editar usuario' : 'Nuevo usuario'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
                <input
                  type="text"
                  value={form.nombre_u}
                  onChange={(e) => setForm({ ...form, nombre_u: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editing ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña'}
                </label>
                <input
                  type="password"
                  value={form.contrasenia}
                  onChange={(e) => setForm({ ...form, contrasenia: e.target.value })}
                  required={!editing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  value={form.id_rol}
                  onChange={(e) => setForm({ ...form, id_rol: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]"
                >
                  {roles.map((r) => (
                    <option key={r.idRol} value={r.idRol}>{r.nombreRol}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-[#0B3558] rounded-md hover:bg-[#0C5C8C]">
                  {editing ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
