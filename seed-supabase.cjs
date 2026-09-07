const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabase = createClient(
  'https://hfouxddotlmcilsqitbr.supabase.co',
  'sb_publishable_QZi6yoHFyxzjub5gUGK9mA_HNy7Z0LR'
);

async function seed() {
  console.log('=== Conectando a Supabase ===');

  // 1. Verificar tablas
  const tables = ['rol', 'usuario', 'comunicado', 'evento', 'docente', 'auxiliar', 'materia'];
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    console.log(`Tabla ${t}: ${error ? 'ERROR - ' + error.message : 'OK (' + (data?.length || 0) + ' rows)'}`);
  }

  // 2. Insertar roles
  console.log('\n=== Insertando roles ===');
  const { error: e1 } = await supabase.from('rol').insert({ nombre_rol: 'ADMINISTRADOR' });
  console.log('ADMIN:', e1 ? e1.message : 'OK');

  const { error: e2 } = await supabase.from('rol').insert({ nombre_rol: 'EDITOR' });
  console.log('EDITOR:', e2 ? e2.message : 'OK');

  // 3. Obtener rol admin
  const { data: roles } = await supabase.from('rol').select('*');
  console.log('Roles:', JSON.stringify(roles));

  const adminRol = roles?.find(r => r.nombre_rol === 'ADMINISTRADOR');
  if (!adminRol) {
    console.log('ERROR: No se pudo crear/obtener rol ADMINISTRADOR');
    return;
  }

  // 4. Crear usuario admin
  console.log('\n=== Creando usuario admin ===');
  const hashed = await bcrypt.hash('admin123', 10);
  const { data: admin, error: adminErr } = await supabase.from('usuario').insert({
    nombre_u: 'admin',
    contrasenia: hashed,
    id_rol: adminRol.id_rol,
    estado: true
  }).select('*, rol(*)').single();

  if (adminErr) {
    console.log('ERROR admin:', adminErr.message, adminErr.details);
  } else {
    console.log('Admin creado:', JSON.stringify(admin));
  }

  // 5. Verificar
  const { data: users } = await supabase.from('usuario').select('*, rol(*)');
  console.log('\nUsuarios:', JSON.stringify(users));
}

seed().catch(e => console.error(e));
