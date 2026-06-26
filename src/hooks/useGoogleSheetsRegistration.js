import { useState } from 'react';
import { sendToGoogleSheets } from '../services/googleSheetsService';

export const useGoogleSheetsRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);

  const registerUser = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Validaciones adicionales
      const nombres = formData.get('nombres');
      const apellidos = formData.get('apellidos');
      const correo = formData.get('correo');
      const numeroDocumento = formData.get('numeroDocumento');
      
      if (!nombres?.trim()) throw new Error('Los nombres son obligatorios');
      if (!apellidos?.trim()) throw new Error('Los apellidos son obligatorios');
      if (!correo?.trim()) throw new Error('El correo electrónico es obligatorio');
      if (!numeroDocumento?.trim()) throw new Error('El número de documento es obligatorio');
      
      // Enviar a Google Sheets
      const result = await sendToGoogleSheets(formData);
      
      if (result.success) {
        setSuccess(true);
        setUserData({
          nombres: nombres,
          apellidos: apellidos,
          email: correo,
          fotoUrl: result.fotoUrl || null,
        });
        return { 
          success: true, 
          message: result.message,
          fotoUrl: result.fotoUrl 
        };
      } else {
        throw new Error(result.message || 'Error al registrar');
      }
      
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setUserData(null);
  };

  return {
    registerUser,
    isSubmitting,
    error,
    success,
    userData,
    resetState,
  };
};