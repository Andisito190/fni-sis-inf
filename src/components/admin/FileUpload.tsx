import { useRef, useState } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import adminApi from '../../services/adminApi';

interface FileUploadProps {
  tipo: 'auxiliar' | 'docente' | 'evento' | 'comunicado';
  currentImage?: string;
  onUpload: (path: string) => void;
}

export default function FileUpload({ tipo, currentImage, onUpload }: FileUploadProps) {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    setUploading(true);
    try {
      const formData = new FormData();
      const fieldMap = {
        auxiliar: 'foto_auxiliar',
        docente: 'foto_docente',
        evento: 'imagen_evento',
        comunicado: 'imagen_comunicado',
      };
      formData.append(fieldMap[tipo], file);

      const { data } = await adminApi.post(`/upload/${tipo}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPreview(data.path);
      onUpload(data.path);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al subir archivo');
      setPreview(currentImage || '');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview('');
    onUpload('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
        id={`file-${tipo}`}
      />

      {preview ? (
        <div
          className="relative inline-block cursor-pointer group"
          onClick={() => inputRef.current?.click()}
        >
          <img
            src={preview}
            alt="Vista previa"
            className="w-40 h-40 rounded-md object-cover border border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
              setPreview('');
            }}
          />
          <div className="absolute inset-0 bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Camera className="w-5 h-5 text-white" />
            <span className="text-white text-xs font-medium">Cambiar</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 z-10"
            aria-label="Eliminar imagen"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={`file-${tipo}`}
          className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-[#1684B8] hover:bg-blue-50 transition-all"
        >
          {uploading ? (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#1684B8] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span className="text-xs text-gray-500">Subiendo...</span>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-600">Seleccionar imagen</span>
              <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</span>
            </>
          )}
        </label>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
