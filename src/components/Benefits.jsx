import { motion } from 'framer-motion';
import { 
  FaGlobeAmericas, 
  FaFileAlt, 
  FaGoogle, 
  FaBrain, 
  FaBriefcase, 
  FaChalkboardTeacher 
} from 'react-icons/fa';

const benefits = [
  { icon: FaGlobeAmericas, title: 'Certificación internacional', desc: 'Reconocida globalmente por Google y el sector tecnológico.' },
  { icon: FaFileAlt, title: 'Fortalece tu CV', desc: 'Destaca frente a otros profesionales con una credencial de alto valor.' },
  { icon: FaGoogle, title: 'Aprende herramientas Google', desc: 'Domina las herramientas que usa el mundo.' },
  { icon: FaBrain, title: 'Mejora competencias digitales', desc: 'Actualiza tus habilidades para la era digital.' },
  { icon: FaBriefcase, title: 'Mayor empleabilidad', desc: 'Las empresas buscan talento certificado.' },
  { icon: FaChalkboardTeacher, title: 'Capacitación con especialista', desc: 'Aprende de la mano del Mg. Daniel Salazar Lluén.' },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Beneficios <span className="text-uss-blue">Exclusivos</span>
          </h2>
          <p className="text-gray-500 mt-2">Todo lo que ganarás al obtener tu certificación.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 
                       text-center transition-all duration-300 hover:-translate-y-2 
                       hover:shadow-xl hover:border-uss-light-blue"
            >
              <benefit.icon className="text-4xl text-uss-blue mx-auto mb-4" />
              <h3 className="font-bold text-xl text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;