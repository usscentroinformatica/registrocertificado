import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { FaDownload, FaTimes, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import logoGoogle from '../assets/logoGoogle.png';

const CertificateViewer = ({ userData = {}, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const certificateRef = useRef();

  // Prevenir scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    document.body.style.overflow = 'unset';
    if (onClose) {
      onClose();
    }
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // 👈 GENERAR CERTIFICADO - CORREGIDO
  const generateCertificate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: false,
        width: 800,
        height: 1000,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('flyer-container');
          if (clonedElement) {
            clonedElement.style.width = '800px';
            clonedElement.style.height = '1000px';
            clonedElement.style.transform = 'none';
          }
        },
      });
      
      const link = document.createElement('a');
      link.download = `Flyer_Google_Level1_${userData.nombres || 'Participante'}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error al generar el flyer:', error);
      alert('Hubo un error al generar el archivo de imagen.');
    }
    setIsGenerating(false);
  };

  // 👈 COMPARTIR CON IMAGEN - CORREGIDO
  const shareWithImage = async () => {
    if (isSharing) return;
    setIsSharing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: false,
        width: 800,
        height: 1000,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('flyer-container');
          if (clonedElement) {
            clonedElement.style.width = '800px';
            clonedElement.style.height = '1000px';
            clonedElement.style.transform = 'none';
          }
        },
      });
      
      const nombreCompleto = `${userData.nombres || 'Participante'} ${userData.apellidos || ''}`.trim();
      const mensaje = `🎓 ¡Yo participé en la Certificación Google for Education LEVEL 1! 🚀\n\n` +
                      `👨‍🎓 ${nombreCompleto}\n` +
                      `📅 30 de junio · 3:00 PM\n` +
                      `💻 Modalidad virtual vía Zoom\n\n` +
                      `🏛️ Centro de Informática · Universidad Señor de Sipán\n` +
                      `#GoogleForEducation #CertificaciónGoogle #GoogleLevel1 #CentroDeInformáticaUSS #EducaciónDigital`;

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], `Certificado_Google_${nombreCompleto}.png`, { type: 'image/png' });
        const shareData = {
          title: 'Certificación Google LEVEL 1',
          text: mensaje,
          files: [file],
        };
        
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          setIsSharing(false);
          return;
        }
      }
      
      const link = document.createElement('a');
      link.download = `Certificado_Google_${nombreCompleto}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
      try {
        await navigator.clipboard.writeText(`${mensaje}\n\n${window.location.href}`);
        alert('✅ Imagen descargada y mensaje copiado.\n\n¡Compártelo en tus redes sociales! 🎉');
      } catch (clipError) {
        alert('✅ Imagen descargada.\n\nMensaje para compartir:\n\n' + mensaje);
      }
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error al compartir:', error);
        alert('❌ No se pudo compartir. Intenta descargar la imagen y compartirla manualmente.');
      }
    }
    
    setIsSharing(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm overflow-y-auto p-4"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(4px)',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div 
        className="relative flex flex-col items-center justify-start py-6 w-full max-w-full h-full"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '24px',
          paddingBottom: '24px',
          width: '100%',
          maxWidth: '100%',
          height: '100%',
        }}
      >
        
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors shadow-lg"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 50,
            padding: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        >
          <FaTimes className="text-xl" />
        </button>

        {/* ===== FLYER ===== */}
        <div 
          id="flyer-container"
          ref={certificateRef}
          style={{
            width: '800px',
            height: '1000px',
            maxWidth: '90%',
            aspectRatio: '4/5',
            backgroundColor: '#ffffff',
            position: 'relative',
            fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif",
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
            borderRadius: '24px',
          }}
        >
          {/* ... (resto del contenido del flyer igual) ... */}
        </div>

        {/* ===== CONTROLES ===== */}
        <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-md px-4">
          <div className="flex gap-4 w-full">
            <button
              onClick={generateCertificate}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-[#4285f4] to-[#34a853] hover:opacity-90 text-white font-bold rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              <FaDownload />
              {isGenerating ? 'Procesando...' : 'Descargar Flyer'}
            </button>
            
            <button
              onClick={shareWithImage}
              disabled={isSharing}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-[#ea4335] to-[#fbbc05] hover:opacity-90 text-white font-bold rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              <FaShare />
              {isSharing ? 'Generando...' : 'Compartir Imagen'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CertificateViewer;
