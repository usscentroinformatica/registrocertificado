import { motion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
// Importa la imagen de Daniel
import danielImage from '../assets/daniel.png';

const Speaker = () => {
  return (
    <section className="py-20 bg-uss-light-blue">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            Conoce al <span className="text-uss-blue">Ponente</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-premium border border-gray-100 
                   transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {/* Foto con daniel.png */}
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-uss-blue shadow-lg mb-6">
            <img
              src={danielImage}
              alt="Mg. Daniel Salazar Lluén"
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 text-center">Mg. Daniel Salazar Lluén</h3>
          <p className="text-uss-blue font-semibold text-center mt-1">Especialista en Certificaciones Google</p>
          
          <p className="text-gray-500 text-sm mt-4 leading-relaxed text-center">
            Profesional con más de 10 años de experiencia en formación tecnológica. Ha liderado 
            programas de certificación para instituciones educativas y empresas, enfocado en el 
            desarrollo de competencias digitales de alto impacto.
          </p>
          
          {/* Solo LinkedIn */}
          <div className="flex justify-center mt-6">
            <motion.a 
              href="https://pe.linkedin.com/in/daniel-salazarlluen" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-uss-blue hover:text-blue-800 transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedinIn className="text-3xl" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Speaker;
