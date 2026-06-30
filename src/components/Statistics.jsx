import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaHourglassHalf, 
  FaVideo, 
  FaUserTie,
  FaGoogle
} from 'react-icons/fa';

const Statistics = () => {
  // Datos del evento
  const eventData = [
    { 
      icon: FaCalendarAlt, 
      value: '30 de Junio', 
      label: 'Fecha del evento',
      color: '#4285f4' // Azul Google
    },
    { 
      icon: FaClock, 
      value: 'Martes', 
      label: 'Día de la semana',
      color: '#ea4335' // Rojo Google
    },
    { 
      icon: FaHourglassHalf, 
      value: '3:00 PM', 
      label: 'Hora del evento',
      color: '#fbbc05' // Amarillo Google
    },
    { 
      icon: FaVideo, 
      value: 'Zoom', 
      label: 'Modalidad virtual',
      color: '#34a853' // Verde Google
    },
    { 
      icon: FaUserTie, 
      value: 'Mg. Daniel Salazar', 
      label: 'Ponente principal',
      color: '#0033a0' // Azul USS
    },
  ];

  return (
    <section className="py-20 bg-uss-light-blue">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Detalles del <span className="text-uss-blue">Evento</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Prepárate para esta gran oportunidad de certificación
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {eventData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/50 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl font-extrabold flex justify-center mb-3">
                <item.icon className="text-uss-blue" style={{ color: item.color }} />
              </div>
              <div className="text-lg font-bold text-gray-800">{item.value}</div>
              <div className="text-xs text-gray-500 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Badge adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-gray-100">
            <FaGoogle className="text-2xl text-[#4285f4]" />
            <span className="text-sm font-semibold text-gray-700">
              Certificación Google for Education
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-sm font-semibold text-uss-blue">
              LEVEL 1
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
