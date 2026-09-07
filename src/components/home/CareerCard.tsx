interface CareerCardProps {
  nombre: string;
  logo: string;
}

export default function CareerCard({ nombre, logo }: CareerCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center hover:shadow-[0_8px_30px_rgba(11,53,88,0.08)] hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative w-28 h-28 mx-auto mb-5">
        <div className="absolute inset-0 bg-[#EAF4FA] rounded-2xl group-hover:bg-[#d6eaf8] transition-colors duration-300" />
        <img
          src={logo}
          alt={`Logo de ${nombre}`}
          className="relative w-full h-full object-contain p-2"
        />
      </div>
      <h3 className="text-base font-bold text-[#0B3558] uppercase tracking-wide leading-tight">
        {nombre}
      </h3>
      <div className="mt-3 w-8 h-0.5 bg-[#B8202E] mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
