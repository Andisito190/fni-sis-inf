const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || 'https://hfouxddotlmcilsqitbr.supabase.co',
  process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QZi6yoHFyxzjub5gUGK9mA_HNy7Z0LR'
);

async function setup() {
  console.log('=== Configurando roles ===');
  const { data: roles } = await supabase.from('rol').select('*');
  console.log('Roles actuales:', roles?.map(r => r.nombre_rol).join(', ') || 'ninguno');

  const existe = roles?.some(r => r.nombre_rol === 'ESTUDIANTE');
  if (existe) {
    console.log('El rol ESTUDIANTE ya existe.');
    return;
  }

  const { data, error } = await supabase.from('rol').insert({ nombre_rol: 'ESTUDIANTE' }).select().single();
  if (error) {
    console.log('ERROR creando rol ESTUDIANTE:', error.message);
    return;
  }
  console.log('Rol ESTUDIANTE creado:', JSON.stringify(data));
}

setup().catch(e => console.error(e));