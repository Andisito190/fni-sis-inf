import PageHero from '../components/common/PageHero';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contacto() {
  return (
    <>
      <PageHero
        title="Contacto"
        subtitle="Estamos aquí para atenderte"
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Contacto' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#0B3558] mb-6">Información de Contacto</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#EAF4FA] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#0B3558]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937]">Dirección</p>
                  <p className="text-sm text-[#6B7280]">Facultad Nacional de Ingeniería — Universidad Técnica de Oruro, Oruro, Bolivia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#EAF4FA] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#0B3558]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937]">Teléfono</p>
                  <p className="text-sm text-[#6B7280]">(591) XXXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#FCECEE] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#B8202E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937]">Correo Electrónico</p>
                  <p className="text-sm text-[#6B7280]">info@fni.edu.bo</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.7!2d-67.1377967!3d-17.9892454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e2b0f71309671b%3A0xd7274d5198b4e715!2sCarrera%20de%20Ingenier%C3%ADa%20de%20Sistemas%20e%20Inform%C3%A1tica!5e0!3m2!1ses!2sbo!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación - Contacto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
