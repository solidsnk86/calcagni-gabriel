import { supabase } from '@/utils/supabase/client';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const { id, message, edited } = await req.json();

    if (!id || !message) {
      return Response.json(
        { message: 'El id y el mensaje son requeridos' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('comments')
      .update({ message, edited })
      .match({ id });

    if (error) {
      return Response.json(
        {
          message: 'No se pudo actualizar el comentario',
          error: error.message,
        },
        { status: 400 }
      );
    }

    return Response.json(
      { message: 'Comentario actualizado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: 'Error en el servidor', error: error },
      { status: 500 }
    );
  }
}
