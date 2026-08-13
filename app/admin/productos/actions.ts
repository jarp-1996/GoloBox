'use server'

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function updateProduct(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) {
    return { success: false, error: 'No autorizado' };
  }

  // Verificar que el token sea válido contra Supabase Auth
  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);
  
  if (authError || !user) {
    return { success: false, error: 'Sesión inválida' };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const image_url = formData.get('image_url') as string;
  const in_stock = formData.get('in_stock') === 'on';
  const contents = formData.get('contents') as string;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from('products')
    .update({
      name,
      description,
      price,
      image_url,
      in_stock,
      contents
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }

  // Revalidar las rutas para que los cambios se vean reflejados inmediatamente
  revalidatePath('/admin/productos');
  revalidatePath('/admin');
  revalidatePath('/boxes-de-regalo');
  revalidatePath('/packs-cumpleanos');
  revalidatePath(`/producto/${id}`);
  
  return { success: true };
}
