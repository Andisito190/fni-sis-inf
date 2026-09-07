const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hfouxddotlmcilsqitbr.supabase.co',
  'sb_publishable_QZi6yoHFyxzjub5gUGK9mA_HNy7Z0LR'
);

async function check() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) {
    console.log('ERROR:', error.message);
  } else {
    console.log('Buckets:', JSON.stringify(buckets, null, 2));
  }
}
check();
