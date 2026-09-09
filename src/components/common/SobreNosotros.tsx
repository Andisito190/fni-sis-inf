import { useState } from 'react';
import { GraduationCap, Beaker, ChevronRight, Target, Eye, Lightbulb, Award, BookOpen, Clock, Building2 } from 'lucide-react';

const careers = [
  {
    id: 'sistemas',
    label: 'Ing. de Sistemas',
    icon: GraduationCap,
    color: '#B8202E',
    filosofia: 'Hacer del Estudiante, protagonista y actor de su propia formación y del Docente mediador y facilitador del aprendizaje.',
    mision: 'La Carrera de Ingeniería de Sistemas perteneciente a la Universidad Técnica de Oruro, forma profesionales con amplio dominio de conocimientos científicos y tecnológicos, capaces de aplicar el enfoque sistémico, transformando una necesidad en un sistema operacional optimizado; a través de un proceso académico que promueve la creatividad, investigación científica y la gestión de calidad, para contribuir al desarrollo y eficiencia de las organizaciones.',
    vision: 'La Carrera de Ingeniería de Sistemas es líder en excelencia académica por la formación de profesionales pertinentes, con conciencia crítica y reflexiva. Proyectando conocimientos para brindar soluciones multidisciplinarias, con calidad y capacidad en organizaciones de producción y servicio. Aportando a la investigación, fortaleciendo la interacción con la sociedad.',
    queEs: [
      'Se suele confundir la ingeniería de sistemas con la programación o el ensamblaje de computadoras. Si bien la herramienta principal de trabajo es la computadora, lo cierto es que el ingeniero de esta especialidad se dedica al diseño y desarrollo de sistemas de tecnologías de información.',
      'Ejemplos: la intranet de cualquier universidad, el portal web de un banco, el sistema contable de una empresa o hasta las aplicaciones de los teléfonos inteligentes. Es una rama con un gran campo laboral en estos tiempos.',
      'No es un «Hacker». Las películas de Hollywood han hecho creer que los ingenieros de sistemas son tan hábiles que pueden ingresar a cualquier sistema y hacer de las suyas. Nada más lejos de la realidad. De hecho, contar con una ética profesional sólida es una competencia básica que cualquier interesado en esta carrera debería poseer.',
    ],
    competencia: 'El futuro estudiante de esta carrera debe tener interés en el análisis, la resolución de problemas y la investigación. Asimismo, debe ser muy creativo, responsable y contar con un agudo sentido del orden. En vista de que se trata de una carrera de ingeniería, es necesario tener una gran afinidad por materias vinculadas a las ciencias exactas. Un duro reto para muchos alumnos de esta carrera consiste en las matemáticas. Hay que tener en cuenta que el esqueleto de la carrera se apoya en los cursos de los números, así que antes de elegir esta carrera vale la pena poseer una preparación adecuada en matemáticas para tener un buen desempeño en cada nivel.',
    menciones: [
      { nombre: 'Dirección y Gestión de Sistemas Empresariales', desc: 'Conjunto de aplicaciones que se utilizan en las empresas para realizar cada uno de los pasos de la administración de la misma, desde la producción, pasando por la logística, hasta la entrega del producto en el punto de venta.' },
      { nombre: 'Gestión de la Información', desc: 'Conjunto de procesos por los cuales se controla el ciclo de vida de la información, desde su obtención (por creación o captura), hasta su disposición final (su archivo o eliminación).' },
      { nombre: 'Modelamiento y Optimización de Recursos – Procesos', desc: 'Representación de procesos de una empresa, para que el proceso actual pueda ser analizado o mejorado, velando por la economía de los recursos disponibles mediante la utilización de técnicas adecuadas para su aplicación.' },
    ],
  },
  {
    id: 'informatica',
    label: 'Ing. Informática',
    icon: Beaker,
    color: '#0C5C8C',
    filosofia: 'Hacer del Estudiante, protagonista y actor de su propia formación y del Docente mediador y facilitador del aprendizaje.',
    mision: 'La Carrera de Ingeniería Informática perteneciente a la Universidad Técnica de Oruro, forma profesionales con criterio técnico – científico, basado en un proceso académico de investigación y vinculación con el entorno social, capaces de analizar, diseñar, implementar e innovar servicios y soluciones informáticas con calidad, que conlleven al desarrollo y transformación tecnológica de las organizaciones.',
    vision: 'La Carrera de Ingeniería Informática, tiene liderazgo y excelencia académica, con infraestructura y tecnología innovadora para la formación de profesionales idóneos, con calidad y capacidad. Fortaleciendo el desarrollo tecnológico, la gestión de información y comunicación, contribuyendo a incrementar la productividad y el servicio de las instituciones regionales y nacionales.',
    queEs: [
      'El Ingeniero en Informática es un profesional capacitado para el manejo de los recursos informáticos. Instrumenta, analiza y diseña sistemas de información que permitirán el desarrollo integral de la organización.',
      'Desarrolla distintos tipos de estructuras lógicas para solucionar problemas con el uso de la computadora. Maneja diferentes lenguajes de programación. Está capacitado para liderizar proyectos que requieren el manejo de grandes volúmenes de información.',
      'No es un técnico de computadoras. Es asombroso como tenemos a veces una serie de prejuicios que nos impiden ver la realidad. Generalmente, la mayoría de las personas saben distinguir entre ciertas profesiones, pero con la informática la sociedad suele confundir mucho la profesión con un técnico de computadoras.',
    ],
    competencia: 'El Ingeniero Informático se concibe como un técnico de nivel superior para el procesamiento automatizado de la información. Dicho ingeniero es un profesional de sólida formación técnica y tecnológica que se ocupa de los procesos de captación, transmisión, almacenamiento, tratamiento y presentación de la información mediante el uso eficiente de las computadoras y otros medios técnicos. En particular, este ingeniero tiene su campo de acción asociado a la concepción, diseño, desarrollo, implementación y mantenimiento de sistemas informáticos para organizaciones productivas y de los servicios.',
    menciones: [
      { nombre: 'Desarrollo de Software', desc: 'Análisis, diseño y mejora estratégica de proyectos de sistemas de software mediante la aplicación de procesos, modelos, herramientas y estándares de calidad en su desarrollo, además de promover la competitividad de la industria del software asumiendo una actitud ética, de colaboración y responsabilidad social.' },
      { nombre: 'Telemática', desc: 'Formación de Ingenieros Telemáticos con capacidad para diseñar, administrar y optimizar sistemas telemáticos bajo criterios de productividad, competitividad y desarrollo económico sostenible, fomentando así el mejoramiento de las condiciones de vida de la región y del país.' },
    ],
  },
];

const historia = {
  titulo: 'Historia',
  contenido: 'La Carrera de Ingeniería de Sistemas e Informática, comenzó funcionando a partir de 1984, por inquietud de profesionales con tendencias afines a la rama de las ciencias de la computación. Recordamos por ejemplo a los Ingenieros Manolo Von Vorries, Raúl Torrico, Ruben Medinacelli, Barrientos y otros, quienes luego de un primer planteamiento desarrollaron un contenido curricular orientado hacia la Ingeniería Informática, posteriormente en 1987, observando la necesidad real de nuestro medio reorientaron la tendencia hacia una Ingeniería de Sistemas, el cual se consolidó con un decreto de Consejo Supremo Universitario 43/88 de Junio 16 de 1988.',
  personas: 'Desde ese momento recordamos a quienes tuvieron un rol protagónico en el desarrollo hasta la total consolidación: los Ingenieros Héctor Córdova Eguivar, Freddy Medina, David Apaza Cossio, Julio César Bermúdez Vargas, Nelson Tapia Hinojosa, Franz Chinche Imaña, Fernando Ureña Mérida, Carlos Balderrama Vásquez y Lucio E. Salgado Ari.',
};

const imagenInstitucional = {
  titulo: 'Imagen Institucional',
  contenido: "En Oruro Bolivia, la Universidad Técnica de Oruro, con su Facultad Nacional de Ingeniería, en la década de los 80' se realizó esfuerzos para mejorar la calidad de la Educación Superior, a partir de la cual surgió la necesidad de crear la carrera de Informática, en demanda y pertinencia concordante con el desarrollo tecnológico y los nuevos conocimientos que surgen en el área de las Ciencias de la Computación, la cual más tarde se consolidó como Ingeniería de Sistemas, en la actualidad solidificada ambos programas en el nivel licenciatura.",
  excelencia: "Con la visión de alcanzar la excelencia académica, se encaran diferentes actividades inherentes al proceso enseñanza aprendizaje, convencidos de que el producto del profesional formado en nuestra institución, será el resultado del proyecto educativo que cada día compromete al docente a ejercer: la metodología, la didáctica, el modelo educativo, el enfoque pedagógico que mejor aporte a este propósito.",
  acreditacion: 'La actualización de los planes curriculares, por la característica dinámica y acelerada del conocimiento, se consideran de importancia; consecuentemente los planes de estudio se reajustan constantemente. Los procesos de investigación, interacción social, se complementan, cuyo resultado avala la calidad educativa obteniendo la acreditación de nuestros programas INGENIERÍA DE SISTEMAS e INGENIERÍA INFORMÁTICA.',
};

type Tab = 'mision' | 'vision' | 'queEs' | 'competencia' | 'menciones' | 'historia' | 'imagen';

const tabs: { id: Tab; label: string; icon: typeof Target }[] = [
  { id: 'mision', label: 'Misión', icon: Target },
  { id: 'vision', label: 'Visión', icon: Eye },
  { id: 'historia', label: 'Historia', icon: Clock },
  { id: 'imagen', label: 'Imagen Institucional', icon: Building2 },
  { id: 'queEs', label: '¿Qué es?', icon: Lightbulb },
  { id: 'competencia', label: 'Competencia', icon: Award },
  { id: 'menciones', label: 'Menciones', icon: BookOpen },
];

export default function SobreNosotros() {
  const [activeCareer, setActiveCareer] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('mision');
  const career = careers[activeCareer];

  return (
    <div className="w-full">
      {/* Career tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100 rounded-2xl p-1.5 gap-1 overflow-x-auto max-w-full">
          {careers.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setActiveCareer(i); setActiveTab('mision'); }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeCareer === i
                  ? 'bg-white text-[#0B3558] shadow-md'
                  : 'text-[#6B7280] hover:text-[#0B3558]'
              }`}
            >
              <c.icon className="w-4 h-4" />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Philosophy quote */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#B8202E] mb-3">Nuestra Filosofía</p>
        <p className="text-lg sm:text-xl text-[#374151] italic leading-relaxed">
          "{career.filosofia}"
        </p>
      </div>

      {/* Content tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
              }`}
              style={activeTab === tab.id ? { backgroundColor: career.color } : {}}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-10 shadow-sm min-h-[300px]">
          {activeTab === 'mision' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: career.color + '15' }}>
                  <Target className="w-5 h-5" style={{ color: career.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#0B3558]">Misión</h3>
              </div>
              <p className="text-[#374151] leading-relaxed text-base">{career.mision}</p>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: career.color + '15' }}>
                  <Eye className="w-5 h-5" style={{ color: career.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#0B3558]">Visión</h3>
              </div>
              <p className="text-[#374151] leading-relaxed text-base">{career.vision}</p>
            </div>
          )}

          {activeTab === 'historia' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: career.color + '15' }}>
                  <Clock className="w-5 h-5" style={{ color: career.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#0B3558]">Historia</h3>
              </div>
              <p className="text-[#374151] leading-relaxed text-base mb-4">{historia.contenido}</p>
              <p className="text-[#374151] leading-relaxed text-base italic">{historia.personas}</p>
            </div>
          )}

          {activeTab === 'imagen' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: career.color + '15' }}>
                  <Building2 className="w-5 h-5" style={{ color: career.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#0B3558]">Imagen Institucional</h3>
              </div>
              <p className="text-[#374151] leading-relaxed text-base mb-4">{imagenInstitucional.contenido}</p>
              <p className="text-[#374151] leading-relaxed text-base mb-4">{imagenInstitucional.excelencia}</p>
              <p className="text-[#374151] leading-relaxed text-base">{imagenInstitucional.acreditacion}</p>
            </div>
          )}

          {activeTab === 'queEs' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: career.color + '15' }}>
                  <Lightbulb className="w-5 h-5" style={{ color: career.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#0B3558]">¿Qué es un {career.label === 'Ing. de Sistemas' ? 'Ingeniero de Sistemas' : 'Ingeniero Informático'}?</h3>
              </div>
              <div className="space-y-4">
                {career.queEs.map((p, i) => (
                  <p key={i} className="text-[#374151] leading-relaxed text-base">{p}</p>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'competencia' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: career.color + '15' }}>
                  <Award className="w-5 h-5" style={{ color: career.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#0B3558]">Competencia Profesional</h3>
              </div>
              <p className="text-[#374151] leading-relaxed text-base">{career.competencia}</p>
            </div>
          )}

          {activeTab === 'menciones' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: career.color + '15' }}>
                  <BookOpen className="w-5 h-5" style={{ color: career.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#0B3558]">Nuestras Menciones</h3>
              </div>
              <div className="grid gap-4">
                {career.menciones.map((m, i) => (
                  <div key={i} className="p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: career.color + '10' }}>
                        <ChevronRight className="w-4 h-4" style={{ color: career.color }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0B3558] mb-1">{m.nombre}</h4>
                        <p className="text-sm text-[#6B7280] leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
