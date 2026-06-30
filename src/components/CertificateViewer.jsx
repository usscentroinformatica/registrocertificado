import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { FaDownload, FaTimes, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const CertificateViewer = ({ userData = {}, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const certificateRef = useRef();

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

  // 👈 RENDERIZADO DIRECTO - SIN PORTAL
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm overflow-y-auto p-4">
      <div className="relative flex flex-col items-center justify-start py-6 w-full max-w-full h-full">
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all shadow-lg"
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

              {/* Logo Google */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                marginBottom: '6px',
                width: '100%',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0px',
                }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#4285f4' }}>G</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ea4335' }}>o</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fbbc05' }}>o</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#4285f4' }}>g</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#34a853' }}>l</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ea4335' }}>e</span>
                </div>
                <span style={{
                  fontSize: '0.55rem',
                  fontWeight: '500',
                  color: '#5f6368',
                  marginLeft: '2px',
                }}>
                  for Education
                </span>
              </div>

              {/* Línea decorativa */}
              <div style={{
                width: '35px',
                height: '2px',
                display: 'flex',
                marginBottom: '6px',
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
                fontSize: '0.6rem',
                fontWeight: '500',
                color: '#5f6368',
                letterSpacing: '1.5px',
                margin: '0 auto',
                textTransform: 'uppercase',
              }}>
                Yo participaré en la
              </p>

              {/* Título */}
              <h1 style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: '#1a237e',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: '2px 0 0 0',
                lineHeight: '1.05',
              }}>
                Certificación
              </h1>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                background: 'linear-gradient(90deg, #4285f4, #ea4335, #fbbc05, #34a853)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                margin: '-3px 0 8px 0',
                lineHeight: '1.05',
              }}>
                Google LEVEL 1
              </h2>

              {/* Nombre del participante */}
              <div style={{
                marginBottom: '6px',
                width: '100%',
              }}>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#1a237e',
                  margin: '0 auto',
                  lineHeight: '1.15',
                }}>
                  {userData.nombres || 'NOMBRE'}
                </h3>
                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#5f6368',
                  margin: '1px auto 0 auto',
                  lineHeight: '1.15',
                }}>
                  {userData.apellidos || 'APELLIDOS'}
                </h4>
                <p style={{
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: '#4285f4',
                  margin: '3px auto 0 auto',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  Participante
                </p>
              </div>

              {/* Fecha y Lugar */}
              <div style={{
                background: '#f8f9fa',
                padding: '6px 14px',
                borderRadius: '10px',
                border: '1px solid #e8eaed',
                marginBottom: '6px',
                width: '100%',
                maxWidth: '200px',
                alignSelf: 'center',
              }}>
                <p style={{
                  fontSize: '0.6rem',
                  color: '#3c4043',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}>
                  <span>📍</span> Chiclayo, Perú
                </p>
                <p style={{
                  fontSize: '0.55rem',
                  color: '#5f6368',
                  margin: '2px 0 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}>
                  <span>📅</span> 30 de junio
                </p>
              </div>

              {/* Hashtags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
                marginTop: '3px',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: '0.45rem',
                  color: '#4285f4',
                  background: '#e8f0fe',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontWeight: '500',
                }}>
                  #GoogleForEducation
                </span>
                <span style={{
                  fontSize: '0.45rem',
                  color: '#d93025',
                  background: '#fce8e6',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontWeight: '500',
                }}>
                  #CertificaciónGoogle
                </span>
                <span style={{
                  fontSize: '0.45rem',
                  color: '#e37400',
                  background: '#fef7e0',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontWeight: '500',
                }}>
                  #GoogleLevel1
                </span>
                <span style={{
                  fontSize: '0.45rem',
                  color: '#1e8e3e',
                  background: '#e6f4ea',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontWeight: '500',
                }}>
                  #USS
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
            
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-lg shadow-md transition-all"
            >
              <FaShare />
              Compartir
            </button>
          </div>

          {showShareOptions && (
            <div className="flex justify-around bg-zinc-800 p-4 rounded-xl w-full">
              <button className="text-white text-2xl hover:text-green-500 transition-colors"><FaWhatsapp /></button>
              <button className="text-white text-2xl hover:text-blue-500 transition-colors"><FaFacebook /></button>
              <button className="text-white text-2xl hover:text-sky-400 transition-colors"><FaTwitter /></button>
              <button className="text-white text-2xl hover:text-blue-600 transition-colors"><FaLinkedin /></button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CertificateViewer;
