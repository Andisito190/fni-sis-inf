const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hfouxddotlmcilsqitbr.supabase.co',
  'sb_publishable_QZi6yoHFyxzjub5gUGK9mA_HNy7Z0LR'
);

async function check() {
  const tables = ['docente', 'auxiliar', 'comunicado', 'evento', 'materia'];
  for (const t of tables) {
    const { data, error, count } = await supabase.from(t).select('*');
    if (error) {
      console.log(`${t}: ERROR - ${error.message}`);
    } else {
      console.log(`${t}: ${data.length} registros`);
      if (data.length > 0) console.log(`  Ejemplo: ${JSON.stringify(data[0]).slice(0, 200)}`);
    }
  }
}
check();
