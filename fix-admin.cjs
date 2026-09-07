const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabase = createClient(
  'https://hfouxddotlmcilsqitbr.supabase.co',
  'sb_publishable_QZi6yoHFyxzjub5gUGK9mA_HNy7Z0LR'
);

async function fixAdmin() {
  const hashed = await bcrypt.hash('admin123', 10);

  const { data, error } = await supabase
    .from('usuario')
    .update({ contrasenia: hashed })
    .eq('nombre_u', 'admin')
    .select('*, rol(*)');

  if (error) {
    console.log('ERROR:', error.message);
  } else {
    console.log('Admin actualizado:', JSON.stringify(data));
  }

  // Verificar todos los usuarios
  const { data: users } = await supabase.from('usuario').select('id_usuario, nombre_u, estado, rol(nombre_rol)');
  console.log('\nTodos los usuarios:');
  users?.forEach(u => console.log(`  - ${u.nombre_u} | Rol: ${u.rol?.nombre_rol} | Activo: ${u.estado}`));
}

fixAdmin();
