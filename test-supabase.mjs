import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dlgjonmojlgpwrmpvqgs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZ2pvbm1vamxncHdybXB2cWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4Njg0NDksImV4cCI6MjA5ODQ0NDQ0OX0.VWxtlmtirtk3r3TpehzQ02Tf2KUQ5fwyBK7ZIu7oZDA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('products').select('*');
  console.log('Error:', error);
  console.log('Data length:', data ? data.length : 0);
}

test();
