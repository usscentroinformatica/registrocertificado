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

  const generateCertificate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: false,
        width: 800,
        height: 1000,
        logging: false,
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

  // 👈 NUEVA FUNCIÓN: Compartir con imagen
  const shareWithImage = async () => {
    if (isSharing) return;
    setIsSharing(true);
    
    try {
      // Generar la imagen del flyer
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: false,
        width: 800,
        height: 1000,
        logging: false,
      });
      
      const nombreCompleto = `${userData.nombres || 'Participante'} ${userData.apellidos || ''}`.trim();
      const mensaje = `🎓 ¡Yo participé en la Certificación Google for Education LEVEL 1! 🚀\n\n` +
                      `👨‍🎓 ${nombreCompleto}\n` +
                      `📅 30 de junio · 3:00 PM\n` +
                      `💻 Modalidad virtual vía Zoom\n\n` +
                      `🏛️ Centro de Informática · Universidad Señor de Sipán\n` +
                      `#GoogleForEducation #CertificaciónGoogle #GoogleLevel1 #CentroDeInformáticaUSS #EducaciónDigital`;

      // Convertir canvas a blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      
      // Intentar compartir con la Web Share API (incluye imagen)
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
      
      // Fallback: Descargar imagen + copiar mensaje
      const link = document.createElement('a');
      link.download = `Certificado_Google_${nombreCompleto}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
      // Copiar mensaje al portapapeles
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

  // Función para compartir en redes sociales específicas (con texto)
  const shareOnSocialMedia = (platform) => {
    const nombreCompleto = `${userData.nombres || 'Participante'} ${userData.apellidos || ''}`.trim();
    
    const mensaje = `🎓 ¡Yo participé en la Certificación Google for Education LEVEL 1! 🚀\n\n` +
                    `👨‍🎓 ${nombreCompleto}\n` +
                    `📅 30 de junio · 3:00 PM\n` +
                    `💻 Modalidad virtual vía Zoom\n\n` +
                    `🏛️ Centro de Informática · Universidad Señor de Sipán\n` +
                    `#GoogleForEducation #CertificaciónGoogle #GoogleLevel1 #CentroDeInformáticaUSS #EducaciónDigital`;

    const url = window.location.href;
    let shareUrl = '';

    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(mensaje + '\n\n' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(mensaje)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensaje)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=500,scrollbars=yes');
    }
  };

  // Compartir con copia (texto + enlace)
  const handleShare = async () => {
    const nombreCompleto = `${userData.nombres || 'Participante'} ${userData.apellidos || ''}`.trim();
    const mensaje = `🎓 ¡Yo participé en la Certificación Google for Education LEVEL 1! 🚀\n\n` +
                    `👨‍🎓 ${nombreCompleto}\n` +
                    `📅 30 de junio · 3:00 PM\n` +
                    `💻 Modalidad virtual vía Zoom\n\n` +
                    `🏛️ Centro de Informática · Universidad Señor de Sipán\n` +
                    `#GoogleForEducation #CertificaciónGoogle #GoogleLevel1 #CentroDeInformáticaUSS #EducaciónDigital`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Certificación Google LEVEL 1',
          text: mensaje,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${mensaje}\n\n${window.location.href}`);
        alert('✅ ¡Enlace copiado al portapapeles! Comparte tu logro en tus redes sociales.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error al compartir:', error);
        alert('❌ No se pudo compartir. Intenta nuevamente.');
      }
    }
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
          
          {/* ===== FONDO ===== */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(145deg, #e8f0fe 0%, #ffffff 50%, #e8f0fe 100%)',
            zIndex: 0,
          }} />

          {/* ===== BANDA GOOGLE ===== */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '8px',
            display: 'flex',
            zIndex: 5,
          }}>
            <div style={{ flex: 1, background: '#4285f4' }} />
            <div style={{ flex: 1, background: '#ea4335' }} />
            <div style={{ flex: 1, background: '#fbbc05' }} />
            <div style={{ flex: 1, background: '#34a853' }} />
          </div>

          {/* ===== CONTENIDO ===== */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '25px 25px',
            width: '100%',
            height: '100%',
            gap: '15px',
          }}>

            {/* ===== MITAD IZQUIERDA - FOTO ===== */}
            <div style={{
              width: '48%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px',
            }}>
              <div style={{
                width: '100%',
                maxWidth: '340px',
                height: '82%',
                aspectRatio: 'auto',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '5px solid white',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 2px #4285f4, 0 0 0 4px #ea4335, 0 0 0 6px #fbbc05, 0 0 0 8px #34a853',
                backgroundColor: '#f0f4f8',
              }}>
                {userData.fotoUrl ? (
                  <img 
                    src={userData.fotoUrl} 
                    alt="Participante" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #4285f4, #ea4335, #fbbc05, #34a853)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{
                      fontSize: '4.5rem',
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      {userData.nombres?.[0] || 'P'}{userData.apellidos?.[0] || 'P'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ===== MITAD DERECHA - DATOS ===== */}
            <div style={{
              width: '52%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5px 10px',
              textAlign: 'center',
            }}>

              {/* Logo Google - MÁS GRANDE */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                <img 
                  src={logoGoogle}
                  alt="Google" 
                  style={{
                    height: '90px',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Línea decorativa */}
              <div style={{
                width: '45px',
                height: '3px',
                display: 'flex',
                marginBottom: '10px',
                borderRadius: '2px',
                overflow: 'hidden',
                alignSelf: 'center',
              }}>
                <div style={{ flex: 1, background: '#4285f4' }} />
                <div style={{ flex: 1, background: '#ea4335' }} />
                <div style={{ flex: 1, background: '#fbbc05' }} />
                <div style={{ flex: 1, background: '#34a853' }} />
              </div>

              {/* Tag Participación */}
              <p style={{
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#5f6368',
                letterSpacing: '2px',
                margin: '0 auto',
                textTransform: 'uppercase',
              }}>
                Yo participé en
              </p>

              {/* Título */}
              <h1 style={{
                fontSize: '2.2rem',
                fontWeight: '800',
                color: '#1a237e',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '4px 0 0 0',
                lineHeight: '1.05',
              }}>
                Certificación
              </h1>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                background: 'linear-gradient(90deg, #4285f4, #ea4335, #fbbc05, #34a853)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: '-4px 0 12px 0',
                lineHeight: '1.05',
              }}>
                Google LEVEL 1
              </h2>

              {/* Nombre del participante */}
              <div style={{
                marginBottom: '10px',
                width: '100%',
              }}>
                <h3 style={{
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  color: '#1a237e',
                  margin: '0 auto',
                  lineHeight: '1.2',
                }}>
                  {userData.nombres || 'NOMBRE'}
                </h3>
                <h4 style={{
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  color: '#5f6368',
                  margin: '2px auto 0 auto',
                  lineHeight: '1.2',
                }}>
                  {userData.apellidos || 'APELLIDOS'}
                </h4>
              </div>

              {/* Fecha y Lugar - EN UNA SOLA LÍNEA */}
              <div style={{
                background: '#f8f9fa',
                padding: '8px 16px',
                borderRadius: '12px',
                border: '1px solid #e8eaed',
                marginBottom: '8px',
                width: '100%',
                maxWidth: '280px',
                alignSelf: 'center',
              }}>
                <p style={{
                  fontSize: '0.7rem',
                  color: '#3c4043',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  flexWrap: 'nowrap',
                  whiteSpace: 'nowrap',
                }}>
                  <span>📍</span> Chiclayo, Perú
                  <span style={{ color: '#dadce0', margin: '0 2px' }}>|</span>
                  <span>📅</span> 30 de junio · 3:00 PM
                </p>
              </div>

              {/* Hashtags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                marginTop: '4px',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: '0.5rem',
                  color: '#4285f4',
                  background: '#e8f0fe',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontWeight: '500',
                }}>
                  #GoogleForEducation
                </span>
                <span style={{
                  fontSize: '0.5rem',
                  color: '#d93025',
                  background: '#fce8e6',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontWeight: '500',
                }}>
                  #CertificaciónGoogle
                </span>
                <span style={{
                  fontSize: '0.5rem',
                  color: '#e37400',
                  background: '#fef7e0',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontWeight: '500',
                }}>
                  #GoogleLevel1
                </span>
                <span style={{
                  fontSize: '0.5rem',
                  color: '#1e8e3e',
                  background: '#e6f4ea',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontWeight: '500',
                }}>
                  #CentroDeInformáticaUSS
                </span>
                <span style={{
                  fontSize: '0.5rem',
                  color: '#0033a0',
                  background: '#e8f0fe',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontWeight: '500',
                }}>
                  #EducaciónDigital
                </span>
              </div>
            </div>
          </div>
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
            
            {/* 👈 BOTÓN COMPARTIR CON IMAGEN */}
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
