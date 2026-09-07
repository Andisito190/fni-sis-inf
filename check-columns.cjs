const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hfouxddotlmcilsqitbr.supabase.co',
  'sb_publishable_QZi6yoHFyxzjub5gUGK9mA_HNy7Z0LR'
);

async function check() {
  const tables = ['docente', 'auxiliar', 'comunicado', 'evento'];
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    if (error) {
      console.log(`${t}: ERROR - ${error.message}`);
    } else if (data && data.length > 0) {
      console.log(`\n${t} columnas:`, Object.keys(data[0]).join(', '));
      console.log(`${t} ejemplo:`, JSON.stringify(data[0], null, 2));
    } else {
      console.log(`${t}: vacia`);
    }
  }
}
check();
