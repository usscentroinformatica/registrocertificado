import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Centro de Informática USS</h4>
            <p className="text-sm">Impulsando la transformación digital desde la Universidad Señor de Sipán.</p>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-4">Enlaces</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#registro" className="hover:text-white transition-colors">Inscripción</a></li>
              <li><a href="#info" className="hover:text-white transition-colors">Información</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-4">Contacto</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><FaEnvelope /> info@uss.edu.pe</li>
              <li className="flex items-center gap-2"><FaPhone /> +51 987 654 321</li>
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> Chiclayo, Perú</li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-4">Redes Sociales</h5>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 Centro de Informática USS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;