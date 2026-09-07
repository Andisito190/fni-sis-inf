import { useState, useEffect, useMemo } from 'react';
import { X, Plus, Trash2, Search } from 'lucide-react';
import adminApi from '../../services/adminApi';
import type { Materia } from '../../types/admin';

interface AsignacionMateria {
  id: number;
  id_materia: number;
  paralelo: string;
  gestion: string;
  materia: Materia;
}

interface AssignMateriaProps {
  tipo: 'docente' | 'auxiliar';
  personaId: number;
  personaNombre: string;
  asignaciones: AsignacionMateria[];
  onClose: () => void;
  onSaved: () => void;
}

export default function AssignMateria({ tipo, personaId, personaNombre, asignaciones, onClose, onSaved }: AssignMateriaProps) {
  const routeBase = tipo === 'docente' ? 'docentes' : 'auxiliares';
  const idField = tipo === 'docente' ? 'id_docente' : 'id_auxiliar';
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [form, setForm] = useState({ id_materia: 0, paralelo: 'A', gestion: '2/2026' });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await adminApi.get('/auxiliares/materias');
      setMaterias((data || []).map((m: any) => ({ idMateria: m.id_materia, nombreM: m.nombre_m, siglaM: m.sigla_m })));
    };
    load();
  }, []);

  const selectedMateria = materias.find((m) => m.idMateria === form.id_materia);
  const filteredMaterias = useMemo(() => {
    if (!search) return materias;
    const q = search.toLowerCase();
    return materias.filter((m) => m.siglaM.toLowerCase().includes(q) || m.nombreM.toLowerCase().includes(q));
  }, [materias, search]);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id_materia) return;
    setLoading(true);
    try {
      await adminApi.post(`/${routeBase}/asignar`, {
        [idField]: personaId,
        id_materia: form.id_materia,
        paralelo: form.paralelo,
        gestion: form.gestion,
      });
      onSaved();
      setForm({ id_materia: 0, paralelo: 'A', gestion: '2/2026' });
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error al asignar');
    } finally {
      setLoading(false);
    }
  };

  const handleUnassign = async (idAsignacion: number) => {
    if (!confirm('¿Remover esta materia?')) return;
    try {
      await adminApi.delete(`/${routeBase}/asignar/${idAsignacion}`);
      onSaved();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error al remover');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0B3558]">
            Asignar materias — {personaNombre}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Materias asignadas ({asignaciones.length})</h3>
          {asignaciones.length === 0 ? (
            <p className="text-sm text-gray-400">No tiene materias asignadas</p>
          ) : (
            <div className="space-y-2">
              {asignaciones.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100">
                  <div>
                    <span className="text-sm font-medium">{a.materia.nombreM}</span>
                    <span className="text-xs text-gray-500 ml-2">{a.materia.siglaM}</span>
                    <span className="text-xs text-gray-400 ml-2">Par. {a.paralelo} — {a.gestion}</span>
                  </div>
                  <button onClick={() => handleUnassign(a.id)} className="p-1 text-gray-400 hover:text-red-600" aria-label="Remover materia">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleAssign} className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Nueva asignación</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 sm:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Materia</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por sigla o nombre..."
                  value={search || (selectedMateria ? `${selectedMateria.siglaM} — ${selectedMateria.nombreM}` : '')}
                  onChange={(e) => { setSearch(e.target.value); setForm({ ...form, id_materia: 0 }); }}
                  onFocus={() => setSearch('')}
                  className="w-full px-2 py-2 pl-7 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]"
                />
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                {search && filteredMaterias.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredMaterias.map((m) => (
                      <button
                        key={m.idMateria}
                        type="button"
                        onClick={() => { setForm({ ...form, id_materia: m.idMateria }); setSearch(''); }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        <span className="font-mono text-xs text-gray-500">{m.siglaM}</span>
                        <span className="ml-2">{m.nombreM}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {form.id_materia > 0 && selectedMateria && !search && (
                <p className="text-xs text-green-600 mt-1">Seleccionada: {selectedMateria.siglaM} — {selectedMateria.nombreM}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Paralelo</label>
              <select value={form.paralelo} onChange={(e) => setForm({ ...form, paralelo: e.target.value })} className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]">
                {['A', 'B', 'C', 'D'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Gestión</label>
              <select value={form.gestion} onChange={(e) => setForm({ ...form, gestion: e.target.value })} className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8]">
                <option value="1/2026">1/2026</option>
                <option value="2/2026">2/2026</option>
                <option value="1/2027">1/2027</option>
                <option value="2/2027">2/2027</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" disabled={loading || !form.id_materia} className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#B8202E] rounded-xl hover:bg-[#8F1825] disabled:opacity-50 font-semibold">
              <Plus className="w-4 h-4" />
              {loading ? 'Asignando...' : 'Asignar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
