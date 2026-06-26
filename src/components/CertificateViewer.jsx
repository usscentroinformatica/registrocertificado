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

  // Lista de países con banderas
  const paises = [
    { codigo: 'PE', nombre: 'Perú', bandera: '🇵🇪' },
    { codigo: 'CO', nombre: 'Colombia', bandera: '🇨🇴' },
    { codigo: 'AR', nombre: 'Argentina', bandera: '🇦🇷' },
    { codigo: 'ES', nombre: 'España', bandera: '🇪🇸' },
    { codigo: 'CL', nombre: 'Chile', bandera: '🇨🇱' },
    { codigo: 'BR', nombre: 'Brasil', bandera: '🇧🇷' },
    { codigo: 'MX', nombre: 'México', bandera: '🇲🇽' },
    { codigo: 'US', nombre: 'EE.UU.', bandera: '🇺🇸' },
  ];

  // Marcas patrocinadoras
  const marcas = [
    { nombre: 'HUAWEI', color: '#757575' },
    { nombre: 'Google Education', color: '#4285f4' },
    { nombre: 'UBTECH', color: '#757575' },
    { nombre: 'Open LMS', color: '#757575' },
    { nombre: 'edpuzzle', color: '#757575' },
    { nombre: 'edulink', color: '#757575' },
  ];

  const marcas2 = [
    'MIXED REALITY', 'Zoluxiones', 'UHMAN GROUP', 'GICODIAC', 'WAREM', 'MIS'
  ];

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
          }}
        >
          
          {/* ================= PARTE SUPERIOR ================= */}
          <div style={{ display: 'flex', width: '100%', height: '1150px', position: 'relative' }}>
            
            {/* --- MITAD IZQUIERDA: FOTO --- */}
            <div style={{ 
              width: '48%', 
              height: '100%', 
              overflow: 'hidden', 
              backgroundColor: '#f0f4f8',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {userData.fotoUrl ? (
                <img 
                  src={userData.fotoUrl} 
                  alt="Participante" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain', 
                    objectPosition: 'center top',
                    backgroundColor: '#f0f4f8',
                  }}
                  crossOrigin="anonymous"
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #e8f0fe, #d2e3fc)' }}>
                  <span style={{ fontSize: '12rem', color: '#1a73e8', fontWeight: 'bold' }}>
                    {userData.nombres?.[0] || 'P'}
                  </span>
                </div>
              )}
              
              {/* Degradado inferior */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '30%',
                background: 'linear-gradient(to top, rgba(26,35,126,0.8) 0%, rgba(13,71,161,0.3) 50%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 2,
              }} />
              
              {/* Banda Google */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '6px',
                display: 'flex',
                zIndex: 3,
              }}>
                <div style={{ flex: 1, background: '#4285f4' }} />
                <div style={{ flex: 1, background: '#ea4335' }} />
                <div style={{ flex: 1, background: '#fbbc05' }} />
                <div style={{ flex: 1, background: '#34a853' }} />
              </div>
            </div>

            {/* --- MITAD DERECHA: CONTENIDO --- */}
            <div style={{ 
              width: '52%', 
              height: '100%', 
              background: 'linear-gradient(145deg, #1a237e 0%, #0d47a1 40%, #0d47a1 100%)', 
              padding: '50px 45px 40px 45px',
              display: 'flex',
              flexDirection: 'column',
              color: '#ffffff',
              position: 'relative'
            }}>
              
              {/* Logo USS */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'flex-end', 
                gap: '12px', 
                marginBottom: '50px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '15px',
              }}>
                <div style={{ 
                  fontSize: '3.8rem', 
                  fontWeight: '900', 
                  letterSpacing: '-2px', 
                  lineHeight: '0.8', 
                  color: '#ffffff',
                  textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                }}>USS</div>
                <div style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: '400', 
                  borderLeft: '2px solid rgba(255,255,255,0.4)', 
                  paddingLeft: '12px', 
                  lineHeight: '1.3',
                  opacity: 0.9,
                }}>
                  Universidad<br/><span style={{ fontWeight: '700' }}>Señor de Sipán</span>
                </div>
              </div>

              {/* Tag Participación */}
              <div style={{ 
                alignSelf: 'flex-start', 
                backgroundColor: 'rgba(255,255,255,0.12)', 
                backdropFilter: 'blur(10px)',
                color: '#ffffff', 
                padding: '6px 25px', 
                borderRadius: '30px', 
                fontWeight: '600', 
                fontSize: '0.95rem', 
                marginBottom: '20px', 
                letterSpacing: '1px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                Yo participaré en la
              </div>

              {/* Título CIE 2026 */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                <span style={{ 
                  fontSize: '6.5rem', 
                  fontWeight: '900', 
                  letterSpacing: '-3px', 
                  lineHeight: '0.8', 
                  color: '#ffffff',
                  textShadow: '0 4px 30px rgba(0,0,0,0.2)',
                }}>CIE</span>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  fontSize: '2.4rem', 
                  fontWeight: '900', 
                  lineHeight: '0.8', 
                  borderLeft: '4px solid #fbbc05', 
                  paddingLeft: '10px', 
                  color: '#fbbc05',
                }}>
                  <span>20</span>
                  <span>26</span>
                </div>
              </div>

              {/* Banderas */}
              <div style={{ 
                display: 'flex', 
                gap: '6px', 
                marginBottom: '30px', 
                flexWrap: 'wrap',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '8px 14px',
                borderRadius: '30px',
                border: '1px solid rgba(255,255,255,0.06)',
                alignSelf: 'flex-start',
              }}>
                {paises.map((pais, idx) => (
                  <span key={idx} style={{ 
                    fontSize: '1.3rem', 
                    cursor: 'default',
                    transition: 'transform 0.2s',
                  }} title={pais.nombre}>
                    {pais.bandera}
                  </span>
                ))}
              </div>

              {/* Información del Evento */}
              <div style={{ marginBottom: '12px' }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '800', 
                  lineHeight: '1.2', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  margin: 0,
                }}>
                  Especialización<br/>
                  <span style={{ 
                    background: 'linear-gradient(90deg, #4285f4, #ea4335, #fbbc05, #34a853)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Google for Education
                  </span>
                </h2>
                
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '500', 
                  color: '#90caf9', 
                  margin: '6px 0 0 0',
                  letterSpacing: '1px',
                }}>
                  LEVEL 1 · Certificación Oficial
                </h3>
              </div>

              {/* Lugar y Fecha */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '6px',
                marginBottom: '5px',
              }}>
                <div style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '500', 
                  color: '#e3f2fd',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>📍</span> Chiclayo, Perú
                </div>
                <div style={{ 
                  alignSelf: 'flex-start',
                  border: '1px solid rgba(255,255,255,0.2)', 
                  padding: '6px 22px', 
                  borderRadius: '20px', 
                  fontSize: '0.95rem', 
                  fontWeight: '500',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: '#e3f2fd',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>📅</span> Del 5 al 7 de mayo
                </div>
              </div>

              {/* --- BLOQUE NOMBRE --- */}
              <div style={{
                position: 'absolute',
                bottom: '35px',
                right: '0px',
                width: '100%',
                backgroundColor: '#0d47a1',
                padding: '22px 35px',
                borderTopLeftRadius: '28px',
                borderBottomLeftRadius: '28px',
                boxShadow: '-10px 10px 40px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                zIndex: 10,
                borderLeft: '4px solid #fbbc05',
              }}>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '2rem', 
                  fontWeight: '800', 
                  color: '#ffffff', 
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  lineHeight: '1.1'
                }}>
                  {userData.nombres || 'Diana Carolina'}
                </h4>
                <h4 style={{ 
                  margin: '2px 0 0 0', 
                  fontSize: '2rem', 
                  fontWeight: '800', 
                  color: '#ffffff', 
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  lineHeight: '1.1'
                }}>
                  {userData.apellidos || 'Acuña Barboza'}
                </h4>
                <p style={{ 
                  margin: '6px 0 0 0', 
                  fontSize: '1rem', 
                  color: '#fbbc05', 
                  textTransform: 'uppercase', 
                  fontWeight: '700',
                  letterSpacing: '3px' 
                }}>
                  Participante
                </p>
              </div>

            </div>
          </div>

          {/* ================= PARTE INFERIOR: MARCAS ================= */}
          <div style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#ffffff',
            borderTop: '2px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 35px',
            zIndex: 5,
          }}>
            {/* Fila superior */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%', 
              gap: '12px', 
              flexWrap: 'wrap',
            }}>
              {marcas.map((marca, idx) => (
                <span key={idx} style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '800', 
                  color: marca.color,
                  letterSpacing: '0.5px',
                  opacity: marca.color === '#757575' ? 0.7 : 1,
                }}>
                  {marca.nombre}
                </span>
              ))}
            </div>
            
            {/* Línea separadora */}
            <div style={{
              width: '80%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #e0e0e0, transparent)',
              margin: '18px 0',
            }} />

            {/* Fila inferior */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%', 
              gap: '35px', 
              flexWrap: 'wrap',
            }}>
              {marcas2.map((marca, idx) => (
                <span key={idx} style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  color: '#9e9e9e',
                  letterSpacing: '0.5px',
                  opacity: 0.7,
                }}>
                  {marca}
                </span>
              ))}
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