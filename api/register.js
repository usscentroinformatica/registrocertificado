// api/register.js
export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyX-4vSqq1uI6vdkFtb-sr10dgWw-WUru2c_oSgKcCAdoUSI_V8QE9GHWatrV6wLVBVww/exec';

    // Obtener los datos del cuerpo de la petición
    const formData = req.body;

    // Enviar a Google Sheets
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      message: data.message || 'Registro exitoso',
      fotoUrl: data.fotoUrl || null,
    });

  } catch (error) {
    console.error('Error en el proxy:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al procesar el registro',
    });
  }
}