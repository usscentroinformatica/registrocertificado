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

        {/* ===== FLYER MODERNO ===== */}
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
          
          {/* ===== FONDO CON GRADIENTE ===== */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(145deg, #0a1628 0%, #1a2a4a 30%, #0d2137 60%, #1a2a4a 100%)',
            zIndex: 0,
          }} />

          {/* ===== PATRÓN DE FONDO ===== */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(66,133,244,0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(234,67,53,0.06) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(251,188,5,0.04) 0%, transparent 60%),
              repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(255,255,255,0.02) 80px, rgba(255,255,255,0.02) 81px)
            `,
            zIndex: 1,
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
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px 50px 50px 50px',
            width: '100%',
            height: '100%',
          }}>

            {/* ===== LOGO GOOGLE ===== */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '15px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                background: 'rgba(255,255,255,0.06)',
                padding: '6px 18px 6px 12px',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#4285f4' }}>G</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#ea4335' }}>o</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#fbbc05' }}>o</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#4285f4' }}>g</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#34a853' }}>l</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#ea4335' }}>e</span>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  color: 'rgba(255,255,255,0.5)',
                  marginLeft: '6px',
                  letterSpacing: '0.5px',
                }}>
                  for Education
                </span>
              </div>
            </div>

            {/* ===== TÍTULO ===== */}
            <div style={{
              textAlign: 'center',
              marginBottom: '15px',
            }}>
              <p style={{
                fontSize: '0.9rem',
                fontWeight: '300',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '6px',
                margin: 0,
                textTransform: 'uppercase',
              }}>
                Yo participaré en la
              </p>
              <h1 style={{
                fontSize: 'clamp(2.8rem, 3.8vw, 4.5rem)',
                fontWeight: '800',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: '8px 0 0 0',
                lineHeight: '1.05',
                textShadow: '0 4px 30px rgba(0,0,0,0.3)',
              }}>
                Certificación
              </h1>
              <h2 style={{
                fontSize: 'clamp(2.2rem, 3.2vw, 3.8rem)',
                fontWeight: '800',
                background: 'linear-gradient(90deg, #4285f4, #ea4335, #fbbc05, #34a853)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                margin: '-6px 0 0 0',
                lineHeight: '1.05',
              }}>
                Google LEVEL 1
              </h2>
            </div>

            {/* ===== LÍNEA DECORATIVA ===== */}
            <div style={{
              width: '80px',
              height: '3px',
              display: 'flex',
              margin: '5px 0 25px 0',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{ flex: 1, background: '#4285f4' }} />
              <div style={{ flex: 1, background: '#ea4335' }} />
              <div style={{ flex: 1, background: '#fbbc05' }} />
              <div style={{ flex: 1, background: '#34a853' }} />
            </div>

            {/* ===== FOTO - GRANDE Y BIEN ADAPTADA ===== */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              marginBottom: '20px',
              width: '100%',
              justifyContent: 'center',
            }}>
              {/* Foto circular con borde premium */}
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '5px solid rgba(255,255,255,0.9)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 2px #4285f4, 0 0 0 4px #ea4335, 0 0 0 6px #fbbc05, 0 0 0 8px #34a853',
                flexShrink: 0,
                backgroundColor: '#1a2a4a',
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
                      fontSize: '4rem',
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      {userData.nombres?.[0] || 'P'}{userData.apellidos?.[0] || 'P'}
                    </span>
                  </div>
                )}
              </div>

              {/* Nombre del participante */}
              <div style={{
                textAlign: 'left',
              }}>
                <h3 style={{
                  fontSize: 'clamp(2rem, 2.8vw, 3.2rem)',
                  fontWeight: '700',
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: '1.15',
                  textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                }}>
                  {userData.nombres || 'NOMBRE'}
                </h3>
                <h4 style={{
                  fontSize: 'clamp(1.6rem, 2.2vw, 2.5rem)',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.6)',
                  margin: '2px 0 0 0',
                  lineHeight: '1.15',
                }}>
                  {userData.apellidos || 'APELLIDOS'}
                </h4>
                <p style={{
                  fontSize: 'clamp(1rem, 1.2vw, 1.4rem)',
                  fontWeight: '500',
                  color: '#fbbc05',
                  margin: '4px 0 0 0',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                }}>
                  Participante
                </p>
              </div>
            </div>

            {/* ===== FECHA Y LUGAR ===== */}
            <div style={{
              textAlign: 'center',
              marginBottom: '10px',
              background: 'rgba(255,255,255,0.05)',
              padding: '10px 28px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              width: 'auto',
            }}>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.7)',
                margin: 0,
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
              }}>
                <span>📍</span> Chiclayo, Perú
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.4)',
                margin: '4px 0 0 0',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
              }}>
                <span>📅</span> Del 5 al 7 de mayo
              </p>
            </div>

            {/* ===== LOGOS DE MARCAS ===== */}
            <div style={{
              marginTop: 'auto',
              width: '100%',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                padding: '12px 0',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.3)',
                  fontWeight: '600',
                  letterSpacing: '1px',
                }}>
                  Google Education
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.2)',
                  fontWeight: '400',
                }}>
                  •
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.3)',
                  fontWeight: '600',
                  letterSpacing: '1px',
                }}>
                  HUAWEI
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.2)',
                  fontWeight: '400',
                }}>
                  •
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.3)',
                  fontWeight: '600',
                  letterSpacing: '1px',
                }}>
                  UBTECH
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.2)',
                  fontWeight: '400',
                }}>
                  •
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.3)',
                  fontWeight: '600',
                  letterSpacing: '1px',
                }}>
                  Open LMS
                </span>
              </div>
            </div>

            {/* ===== HASHTAGS ===== */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              width: '100%',
            }}>
              <span style={{
                fontSize: '0.55rem',
                color: '#8ab4f8',
                fontWeight: '400',
                background: 'rgba(66,133,244,0.08)',
                padding: '3px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(66,133,244,0.1)',
              }}>
                #GoogleForEducation
              </span>
              <span style={{
                fontSize: '0.55rem',
                color: '#f28b82',
                fontWeight: '400',
                background: 'rgba(234,67,53,0.08)',
                padding: '3px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(234,67,53,0.1)',
              }}>
                #CertificaciónGoogle
              </span>
              <span style={{
                fontSize: '0.55rem',
                color: '#fdd663',
                fontWeight: '400',
                background: 'rgba(251,188,5,0.08)',
                padding: '3px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(251,188,5,0.1)',
              }}>
                #GoogleLevel1
              </span>
              <span style={{
                fontSize: '0.55rem',
                color: '#81c995',
                fontWeight: '400',
                background: 'rgba(52,168,83,0.08)',
                padding: '3px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(52,168,83,0.1)',
              }}>
                #USS
              </span>
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
