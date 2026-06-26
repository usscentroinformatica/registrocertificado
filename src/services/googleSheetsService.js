// Usar la API Route de Vercel (proxy)
const API_URL = '/api/register';

export const sendToGoogleSheets = async (formData) => {
  try {
    // Convertir FormData a objeto JSON
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: result.message,
        fotoUrl: result.fotoUrl || null,
      };
    } else {
      throw new Error(result.message || 'Error al registrar');
    }

  } catch (error) {
    console.error('Error al enviar a Google Sheets:', error);
    throw new Error('No se pudo enviar el registro. Intenta nuevamente.');
  }
};