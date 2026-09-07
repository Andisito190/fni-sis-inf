interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3558] tracking-tight">
        {title}
      </h2>
      <div className={`mt-3 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        <div className="w-10 h-[3px] bg-[#B8202E] rounded-full" />
        <div className="w-6 h-[3px] bg-[#0B3558] rounded-full" />
      </div>
      {subtitle && (
        <p className="mt-4 text-[#6B7280] text-base max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
