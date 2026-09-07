import PageHero from '../components/common/PageHero';
import SobreNosotros from '../components/common/SobreNosotros';

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        title="Sobre Nosotros"
        subtitle="Conoce nuestra historia, misión, visión y las menciones de cada carrera"
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Sobre Nosotros' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SobreNosotros />
      </div>
    </>
  );
}
