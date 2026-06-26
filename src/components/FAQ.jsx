import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  { question: '¿Tiene costo?', answer: 'La certificación es totalmente gratuita para los estudiantes de la USS. Es una inversión en tu futuro sin ningún costo.' },
  { question: '¿Quién puede participar?', answer: 'Está dirigida a estudiantes de todas las escuelas profesionales de la Universidad Señor de Sipán.' },
  { question: '¿Cómo obtengo mi certificado?', answer: 'Al finalizar el evento y cumplir con los requisitos de participación, recibirás tu certificado digital directamente en tu correo institucional.' },
  { question: '¿Necesito conocimientos previos?', answer: 'No, la capacitación está diseñada para todos los niveles. Solo necesitas tu entusiasmo por aprender.' },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-20 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Preguntas <span className="text-uss-blue">Frecuentes</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-gray-200 last:border-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-4 text-left font-semibold text-gray-800 flex justify-between items-center hover:text-uss-blue transition-colors"
              >
                <span>{faq.question}</span>
                <FaChevronDown 
                  className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;