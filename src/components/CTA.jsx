import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="py-20 bg-uss-blue">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Da el siguiente paso hacia <br />tu desarrollo profesional.
          </h2>
          <a 
            href="#registro" 
            className="inline-block bg-white text-uss-blue px-12 py-4 rounded-full font-bold text-lg 
                     shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <FaArrowRight className="inline mr-2" /> INSCRIBIRME AHORA
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;