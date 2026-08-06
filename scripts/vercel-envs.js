const { spawn } = require('child_process');

const envs = {
  NEXT_PUBLIC_SUPABASE_URL: "https://dlgjonmojlgpwrmpvqgs.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZ2pvbm1vamxncHdybXB2cWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4Njg0NDksImV4cCI6MjA5ODQ0NDQ0OX0.VWxtlmtirtk3r3TpehzQ02Tf2KUQ5fwyBK7ZIu7oZDA",
  SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZ2pvbm1vamxncHdybXB2cWdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg2ODQ0OSwiZXhwIjoyMDk4NDQ0NDQ5fQ.DT8Z-eSjm_BazwcTJQ1BUCdJDjGn8ur5Jnm9ylq5hoo",
  ADMIN_EMAIL: "jerirodriguezparedes@gmail.com",
  NEXT_PUBLIC_SITE_URL: "https://golozin-ecommerce.vercel.app"
};

async function addEnv(key, value) {
  return new Promise((resolve, reject) => {
    // Primero removemos si existe
    const rm = spawn('npx', ['vercel', 'env', 'rm', key, 'production', '--yes'], { shell: true });
    rm.on('close', () => {
      // Luego añadimos usando stdin para el valor
      const add = spawn('npx', ['vercel', 'env', 'add', key, 'production'], { shell: true });
      
      add.stdout.on('data', data => {
        if (data.toString().includes('value')) {
          add.stdin.write(value + '\n');
        }
      });
      
      add.stderr.on('data', data => console.error(data.toString()));
      
      add.on('close', code => {
        if (code === 0) {
          console.log(`✅ ${key} añadido`);
          resolve();
        } else {
          console.log(`❌ Falló ${key}`);
          resolve();
        }
      });
      
      // En caso de que pida el valor por stdin directo
      add.stdin.write(value + '\n');
    });
  });
}

async function run() {
  for (const [k, v] of Object.entries(envs)) {
    await addEnv(k, v);
  }
  console.log('🎉 Variables de Vercel configuradas');
}

run();
