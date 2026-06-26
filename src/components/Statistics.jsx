import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';

const Statistics = () => {
  return (
    <section className="py-20 bg-uss-light-blue">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            ¿Por qué <span className="text-uss-blue">participar</span>?
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl font-extrabold text-uss-blue">95%</div>
            <div className="text-gray-500 mt-2">de satisfacción</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl font-extrabold text-uss-blue">+1000</div>
            <div className="text-gray-500 mt-2">estudiantes certificados</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl font-extrabold text-uss-blue">100%</div>
            <div className="text-gray-500 mt-2">virtual</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl font-extrabold text-uss-blue flex justify-center">
              <FaGoogle className="text-uss-blue" />
            </div>
            <div className="text-gray-500 mt-2">Certificación reconocida</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;