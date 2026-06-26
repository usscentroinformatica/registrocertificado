import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <section id="info" className="py-20 bg-uss-light-blue">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              ¿Qué es la <span className="text-uss-blue">Certificación Google</span>?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Es un programa de formación que te permitirá <strong>fortalecer competencias digitales</strong>, 
              validar tus conocimientos y mejorar tu perfil profesional mediante el dominio de las 
              herramientas y tecnologías de Google.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-uss-blue text-xl mt-1 flex-shrink-0" />
                <span>Desarrollo de habilidades prácticas.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-uss-blue text-xl mt-1 flex-shrink-0" />
                <span>Reconocimiento internacional avalado por Google.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-uss-blue text-xl mt-1 flex-shrink-0" />
                <span>Impulsa tu carrera en el mundo digital.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Tecnología y educación"
              className="rounded-3xl shadow-premium object-cover max-h-96 w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;