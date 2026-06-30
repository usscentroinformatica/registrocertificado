import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  FaCalendarAlt, FaClock, FaHourglassHalf, FaVideo, 
  FaUserTie, FaArrowRight, FaChevronDown, FaGlobeAmericas
} from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import logoUSS from '../assets/uss.png';
import logoGoogle from '../assets/logoGoogle.png';

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const flags = [
    { code: 'PE', name: 'Perú' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'ES', name: 'España' },
    { code: 'CO', name: 'Colombia' },
    { code: 'AR', name: 'Argentina' },
    { code: 'MX', name: 'México' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const getFlagFlipAnimation = (index) => ({
    rotateY: [0, 360],
    transition: {
      duration: 1.1 + index * 0.12,
      delay: index * 0.2,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatDelay: 0.35 + index * 0.1,
    },
  });

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <header className="relative overflow-hidden min-h-screen flex items-start bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30 pt-4 md:pt-6">
      
      {/* ===== FONDO ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/30 to-blue-400/10 blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-[#4285f4]/10 to-[#34a853]/10 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-100/30"
        />

        <div className="absolute top-20 left-20 w-20 h-20 rounded-full border-2 border-[#4285f4]/10 animate-pulse" />
        <div className="absolute bottom-40 right-20 w-12 h-12 rounded-full border-2 border-[#ea4335]/10 animate-pulse delay-700" />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full border-2 border-[#fbbc05]/10 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10 w-full">
        
        {/* ===== ENCABEZADO - PEGADO ARRIBA ===== */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
        >
          {/* 👈 Logo USS - Izquierda */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img 
              src={logoUSS} 
              alt="USS - Centro de Informática" 
              className="h-10 md:h-14 w-auto object-contain"
            />
          </motion.div>

          {/* 👈 Logo Google - Centro (MÁS GRANDE) */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <motion.img 
              src={logoGoogle}
              alt="Google" 
              className="h-16 md:h-24 w-auto object-contain"
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.div>

          {/* 👈 Reconocimiento Internacional + Banderas - Derecha (MÁS GRANDE) */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center bg-white/60 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-sm border border-gray-100/50"
            style={{ perspective: '900px' }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <FaGlobeAmericas className="text-uss-blue text-sm md:text-base" />
              </motion.div>
              <span className="text-xs md:text-sm text-gray-500 font-medium whitespace-nowrap">
                Reconocimiento Internacional
              </span>
            </div>

            <div className="flex gap-1.5 justify-center mt-0.5">
              {flags.map((item, idx) => (
                <motion.div
                  key={item.code}
                  animate={getFlagFlipAnimation(idx)}
                  className="cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  title={item.name}
                  whileHover={{ scale: 1.4 }}
                >
                  <ReactCountryFlag
                    countryCode={item.code}
                    svg
                    style={{
                      width: '24px',
                      height: '18px',
                      borderRadius: '3px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ===== CONTENIDO CENTRAL ===== */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-130px)]">
          
          {/* ===== TÍTULO ===== */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-4 flex justify-center"
          >
            <div className="hero-title-outline">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
                }}
              >
                <span className="text-gray-800 block">OBTÉN TU</span>
                <span className="text-uss-blue block">CERTIFICACIÓN</span>
                <span className="bg-gradient-to-r from-[#4285f4] via-[#ea4335] via-[#fbbc05] to-[#34a853] bg-clip-text text-transparent block">
                  GOOGLE
                </span>
              </motion.h1>
            </div>
          </motion.div>

          {/* ===== SUBTÍTULO ===== */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                delay: 1.2,
                duration: 0.6,
              }
            }}
            className="text-xl md:text-2xl font-light text-gray-600 mb-6 text-center"
          >
            Aprende. Crece.{' '}
            <motion.span 
              className="text-[#4285f4] font-medium inline-block"
              animate={{
                scale: [1, 1.05, 1],
                color: ['#4285f4', '#34a853', '#4285f4'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Transforma
            </motion.span>
            {' '}tu futuro.
          </motion.p>

          {/* ===== TARJETAS ===== */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 1.0,
                },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto mb-8"
          >
            {[
              { icon: FaCalendarAlt, text: '30 de Junio' },
              { icon: FaClock, text: 'Martes' },
              { icon: FaHourglassHalf, text: '3:00 PM' },
              { icon: FaVideo, text: 'Zoom' },
              { icon: FaUserTie, text: 'Mg. Daniel Salazar' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 20 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 150,
                      damping: 15,
                    },
                  },
                }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(0,51,160,0.15)',
                }}
                className="bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50 text-center cursor-default"
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: idx * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <item.icon className="text-uss-blue text-lg mx-auto mb-1" />
                </motion.div>
                <p className="font-semibold text-gray-700 text-xs md:text-sm">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ===== BOTONES ===== */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                delay: 1.6,
                duration: 0.6,
              }
            }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#registro"
              animate={pulseAnimation}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm md:text-base"
            >
              <motion.span
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaArrowRight className="text-sm" />
              </motion.span>
              Inscríbete Ahora
            </motion.a>
            
            <motion.a
              href="#info"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-2 px-8 py-3.5 text-sm md:text-base"
            >
              Más Información{' '}
              <motion.span
                animate={{
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                <FaChevronDown className="text-sm" />
              </motion.span>
            </motion.a>
          </motion.div>

        </div>

      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#info" className="text-gray-400 hover:text-uss-blue transition-colors">
          <FaChevronDown className="text-2xl" />
        </a>
      </motion.div>
    </header>
  );
};

export default Hero;
