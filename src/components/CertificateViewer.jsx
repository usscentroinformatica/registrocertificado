import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { FaDownload, FaTimes, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const CertificateViewer = ({ userData = {}, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const certificateRef = useRef();

  const generateCertificate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: false,
        width: 1080,
        height: 1350,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative flex flex-col items-center justify-start py-6 w-full max-w-full h-full">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all shadow-lg"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* ===== FLYER ===== */}
        <div 
          ref={certificateRef}
          style={{
            width: '1080px',
            height: '1350px',
            maxWidth: '100%',
            aspectRatio: '1080/1350',
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
          
          {/* ===== FONDO CON GRADIENTE SUAVE ===== */}
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
            padding: '50px 40px',
            width: '100%',
            height: '100%',
            gap: '30px',
          }}>

            {/* ===== MITAD IZQUIERDA - FOTO GRANDE ===== */}
            <div style={{
              width: '50%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}>
              <div style={{
                width: '100%',
                maxWidth: '450px',
                aspectRatio: '1/1',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '6px solid white',
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
                      objectFit: 'contain',
                      objectPosition: 'center',
                      backgroundColor: '#f0f4f8',
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
                      fontSize: '6rem',
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
              width: '50%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '20px 10px',
            }}>

              {/* Logo Google */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '15px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0px',
                }}>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: '#4285f4' }}>G</span>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: '#ea4335' }}>o</span>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: '#fbbc05' }}>o</span>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: '#4285f4' }}>g</span>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: '#34a853' }}>l</span>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: '#ea4335' }}>e</span>
                </div>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  color: '#5f6368',
                  marginLeft: '4px',
                }}>
                  for Education
                </span>
              </div>

              {/* Línea decorativa */}
              <div style={{
                width: '60px',
                height: '3px',
                display: 'flex',
                marginBottom: '15px',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{ flex: 1, background: '#4285f4' }} />
                <div style={{ flex: 1, background: '#ea4335' }} />
                <div style={{ flex: 1, background: '#fbbc05' }} />
                <div style={{ flex: 1, background: '#34a853' }} />
              </div>

              {/* Tag Participación */}
              <p style={{
                fontSize: '0.85rem',
                fontWeight: '500',
                color: '#5f6368',
                letterSpacing: '2px',
                margin: 0,
                textTransform: 'uppercase',
              }}>
                Yo participaré en la
              </p>

              {/* Título */}
              <h1 style={{
                fontSize: 'clamp(2.2rem, 3vw, 3.5rem)',
                fontWeight: '800',
                color: '#1a237e',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '2px 0 0 0',
                lineHeight: '1.05',
              }}>
                Certificación
              </h1>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 2.5vw, 3rem)',
                fontWeight: '800',
                background: 'linear-gradient(90deg, #4285f4, #ea4335, #fbbc05, #34a853)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: '-4px 0 15px 0',
                lineHeight: '1.05',
              }}>
                Google LEVEL 1
              </h2>

              {/* Nombre del participante */}
              <div style={{
                marginBottom: '12px',
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.8rem, 2.4vw, 2.8rem)',
                  fontWeight: '700',
                  color: '#1a237e',
                  margin: 0,
                  lineHeight: '1.15',
                }}>
                  {userData.nombres || 'NOMBRE'}
                </h3>
                <h4 style={{
                  fontSize: 'clamp(1.4rem, 1.8vw, 2.2rem)',
                  fontWeight: '600',
                  color: '#5f6368',
                  margin: '2px 0 0 0',
                  lineHeight: '1.15',
                }}>
                  {userData.apellidos || 'APELLIDOS'}
                </h4>
                <p style={{
                  fontSize: 'clamp(0.9rem, 1vw, 1.2rem)',
                  fontWeight: '600',
                  color: '#4285f4',
                  margin: '4px 0 0 0',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                }}>
                  Participante
                </p>
              </div>

              {/* Fecha y Lugar */}
              <div style={{
                background: '#f8f9fa',
                padding: '12px 20px',
                borderRadius: '14px',
                border: '1px solid #e8eaed',
                marginBottom: '12px',
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#3c4043',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>📍</span> Chiclayo, Perú
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#5f6368',
                  margin: '4px 0 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>📅</span> 30 de junio
                </p>
              </div>

              {/* Hashtags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '5px',
              }}>
                <span style={{
                  fontSize: '0.6rem',
                  color: '#4285f4',
                  background: '#e8f0fe',
                  padding: '3px 14px',
                  borderRadius: '12px',
                  fontWeight: '500',
                }}>
                  #GoogleForEducation
                </span>
                <span style={{
                  fontSize: '0.6rem',
                  color: '#d93025',
                  background: '#fce8e6',
                  padding: '3px 14px',
                  borderRadius: '12px',
                  fontWeight: '500',
                }}>
                  #CertificaciónGoogle
                </span>
                <span style={{
                  fontSize: '0.6rem',
                  color: '#e37400',
                  background: '#fef7e0',
                  padding: '3px 14px',
                  borderRadius: '12px',
                  fontWeight: '500',
                }}>
                  #GoogleLevel1
                </span>
                <span style={{
                  fontSize: '0.6rem',
                  color: '#1e8e3e',
                  background: '#e6f4ea',
                  padding: '3px 14px',
                  borderRadius: '12px',
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

          <AnimatePresence>
            {showShareOptions && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="flex justify-around bg-zinc-800 p-4 rounded-xl w-full"
              >
                <button className="text-white text-2xl hover:text-green-500 transition-colors"><FaWhatsapp /></button>
                <button className="text-white text-2xl hover:text-blue-500 transition-colors"><FaFacebook /></button>
                <button className="text-white text-2xl hover:text-sky-400 transition-colors"><FaTwitter /></button>
                <button className="text-white text-2xl hover:text-blue-600 transition-colors"><FaLinkedin /></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CertificateViewer;
