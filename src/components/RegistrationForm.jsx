import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaSpinner, 
  FaGoogle, 
  FaUniversity,
  FaCamera,
  FaUserCircle,
  FaCertificate
} from 'react-icons/fa';
import { useGoogleSheetsRegistration } from '../hooks/useGoogleSheetsRegistration';
import toast from 'react-hot-toast';
import CertificateViewer from './CertificateViewer';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    numeroDocumento: '',
    correo: '',
    celular: '',
    ciudad: '',
    pais: '',
    profesion: '',
    institucion: '',
    foto: null,
    politica: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [fotoPreview, setFotoPreview] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  
  const fileInputRef = useRef(null);

  const { registerUser, isSubmitting, success } = useGoogleSheetsRegistration();

  // Validación para deshabilitar el botón
  const isFormValid = () => {
    const nombres = formData.nombres?.trim();
    const apellidos = formData.apellidos?.trim();
    const correo = formData.correo?.trim();
    const numeroDocumento = formData.numeroDocumento?.trim();
    const celular = formData.celular?.trim();
    const tipoDocumento = formData.tipoDocumento;
    const pais = formData.pais;
    const profesion = formData.profesion?.trim();
    const foto = formData.foto;
    const politica = formData.politica;

    const camposObligatorios = {
      nombres,
      apellidos,
      correo,
      numeroDocumento,
      celular,
      tipoDocumento,
      pais,
      profesion,
      foto,
      politica
    };

    const todosLlenos = Object.values(camposObligatorios).every(val => {
      if (typeof val === 'boolean') return val === true;
      return val && val.length > 0;
    });

    return todosLlenos;
  };

  // Validar campo individual
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'nombres':
      case 'apellidos':
        if (!value.trim()) error = 'Este campo es obligatorio';
        else if (value.trim().length < 2) error = 'Mínimo 2 caracteres';
        break;

      case 'correo':
        if (!value) error = 'El correo electrónico es obligatorio';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Ingresa un correo válido';
        break;

      case 'numeroDocumento':
        if (!value) error = 'El número de documento es obligatorio';
        else if (!/^\d{8,12}$/.test(value)) error = 'Ingresa un documento válido (8-12 dígitos)';
        break;

      case 'celular':
        if (!value) error = 'El celular es obligatorio';
        else if (!/^[\d\s+()-]{9,15}$/.test(value)) error = 'Ingresa un número válido';
        break;

      case 'tipoDocumento':
      case 'pais':
        if (!value) error = 'Selecciona una opción';
        break;

      case 'foto':
        if (!value) error = 'Sube una foto para tu post';
        break;

      case 'politica':
        if (!value) error = 'Debes aceptar la política de privacidad';
        break;

      default:
        break;
    }

    return error;
  };

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const error = validateField(name, val);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Manejar subida de foto
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, sube una imagen válida');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen no debe superar los 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setFotoPreview(imageData);
        setFormData(prev => ({ ...prev, foto: imageData }));
        setErrors(prev => ({ ...prev, foto: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('.input-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast.error('Por favor, corrige los errores del formulario');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'politica' && key !== 'foto') {
        formDataToSend.append(key, formData[key] || '');
      }
    });
    
    if (formData.foto) {
      formDataToSend.append('foto', formData.foto);
    }

    const result = await registerUser(formDataToSend);

    if (result.success) {
      toast.success('¡Registro exitoso! Tu post está listo.');
      
      setRegisteredUser({
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        email: formData.correo,
        fotoUrl: result.fotoUrl || fotoPreview,
      });

      setTimeout(() => {
        setFormData({
          nombres: '',
          apellidos: '',
          tipoDocumento: '',
          numeroDocumento: '',
          correo: '',
          celular: '',
          ciudad: '',
          pais: '',
          profesion: '',
          institucion: '',
          foto: null,
          politica: false
        });
        setFotoPreview(null);
        setTouched({});
        setErrors({});
      }, 3000);
    } else {
      toast.error(result.message || 'Error al registrar. Intenta nuevamente.');
    }
  };

  return (
    <section id="registro" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-4">
            <FaGoogle className="text-4xl text-[#4285f4]" />
            <span className="text-gray-300 text-2xl">+</span>
            <FaUniversity className="text-4xl text-uss-blue" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Participa y obtén tu <span className="text-uss-blue">Post Digital</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Completa el formulario y genera tu post de participación.
            <span className="block text-sm text-uss-blue font-semibold mt-1">
              ¡Cupos limitados!
            </span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-white to-uss-light-blue p-8 md:p-12 rounded-3xl shadow-premium border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Nombres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombres *
              </label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-modern ${errors.nombres && touched.nombres ? 'border-red-500' : ''}`}
                placeholder="Ej: Juan Carlos"
                disabled={isSubmitting}
              />
              {errors.nombres && touched.nombres && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.nombres}
                </p>
              )}
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos *
              </label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-modern ${errors.apellidos && touched.apellidos ? 'border-red-500' : ''}`}
                placeholder="Ej: Pérez Gómez"
                disabled={isSubmitting}
              />
              {errors.apellidos && touched.apellidos && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.apellidos}
                </p>
              )}
            </div>

            {/* Tipo Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo documento *
              </label>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-modern ${errors.tipoDocumento && touched.tipoDocumento ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              >
                <option value="">Seleccionar</option>
                <option value="DNI">DNI</option>
                <option value="Carnet de Extranjería">Carnet de Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
              {errors.tipoDocumento && touched.tipoDocumento && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.tipoDocumento}
                </p>
              )}
            </div>

            {/* N° Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                N° Documento *
              </label>
              <input
                type="text"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-modern ${errors.numeroDocumento && touched.numeroDocumento ? 'border-red-500' : ''}`}
                placeholder="Ej: 12345678"
                disabled={isSubmitting}
              />
              {errors.numeroDocumento && touched.numeroDocumento && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.numeroDocumento}
                </p>
              )}
            </div>

            {/* Correo electrónico */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico *
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-modern ${errors.correo && touched.correo ? 'border-red-500' : ''}`}
                placeholder="ejemplo@correo.com"
                disabled={isSubmitting}
              />
              {errors.correo && touched.correo && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.correo}
                </p>
              )}
            </div>

            {/* Celular */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Celular *
              </label>
              <input
                type="tel"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-modern ${errors.celular && touched.celular ? 'border-red-500' : ''}`}
                placeholder="+51 987 654 321"
                disabled={isSubmitting}
              />
              {errors.celular && touched.celular && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.celular}
                </p>
              )}
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className="input-modern"
                placeholder="Ej: Lima"
                disabled={isSubmitting}
              />
            </div>

            {/* País */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                País *
              </label>
              <select
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-modern ${errors.pais && touched.pais ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              >
                <option value="">Seleccionar</option>
                <option value="Perú">Perú</option>
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Ecuador">Ecuador</option>
                <option value="México">México</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.pais && touched.pais && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.pais}
                </p>
              )}
            </div>

            {/* Profesión u ocupación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profesión u ocupación *
              </label>
              <input
                type="text"
                name="profesion"
                value={formData.profesion}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-modern ${errors.profesion && touched.profesion ? 'border-red-500' : ''}`}
                placeholder="Ej: Estudiante, Ingeniero, Docente, Emprendedor"
                disabled={isSubmitting}
              />
              {errors.profesion && touched.profesion && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.profesion}
                </p>
              )}
            </div>

            {/* Institución o Empresa + Foto */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institución o Empresa
              </label>
              <input
                type="text"
                name="institucion"
                value={formData.institucion}
                onChange={handleChange}
                className="input-modern"
                placeholder="Ej: Organización, empresa o institución"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sube tu foto para el post *
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-uss-blue transition-colors"
                  disabled={isSubmitting}
                >
                  <FaCamera className="text-uss-blue" />
                  <span className="text-sm">Seleccionar foto</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                {fotoPreview ? (
                  <div className="flex items-center gap-2">
                    <img 
                      src={fotoPreview} 
                      alt="Preview" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-uss-blue"
                    />
                    <span className="text-xs text-gray-500">Foto cargada</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaUserCircle className="text-3xl" />
                    <span className="text-xs">Sin foto</span>
                  </div>
                )}
              </div>
              {errors.foto && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.foto}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Formatos: JPG, PNG (Máx. 5MB)
              </p>
            </div>

            {/* Política de Privacidad */}
            <div className="md:col-span-2 flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                name="politica"
                checked={formData.politica}
                onChange={handleChange}
                className="mt-1 w-5 h-5 accent-uss-blue"
                disabled={isSubmitting}
              />
              <div>
                <label className="text-sm text-gray-600">
                  Acepto la <a href="#" className="text-uss-blue font-semibold hover:underline">
                    política de privacidad
                  </a> *
                </label>
                {errors.politica && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <FaExclamationCircle /> {errors.politica}
                  </p>
                )}
              </div>
            </div>

            {/* Botón Submit - DESHABILITADO HASTA COMPLETAR CAMPOS */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="btn-google w-full md:w-auto px-12 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                disabled={isSubmitting || success || !isFormValid()}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Generando tu post...
                  </span>
                ) : success ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaCheckCircle /> ¡Post listo!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaCheckCircle /> GENERAR MI POST
                  </span>
                )}
              </button>

              {!isFormValid() && !isSubmitting && !success && (
                <p className="text-sm text-amber-600 mt-2">
                  ⚠️ Completa todos los campos obligatorios para generar tu post
                </p>
              )}

              {isSubmitting && (
                <p className="text-sm text-gray-500 mt-3">
                  Estamos preparando tu post digital...
                </p>
              )}
            </div>
          </form>

          {/* Mensaje de éxito con botón para ver post - CORREGIDO */}
          <AnimatePresence mode="wait">
            {success && registeredUser && (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-6 bg-green-50 border border-green-200 rounded-2xl text-center"
              >
                <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  ¡Tu post está listo!
                </h3>
                <p className="text-green-600 mb-4">
                  Comparte tu participación en redes sociales
                </p>
                <button
                  onClick={() => setShowCertificate(true)}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  <FaCertificate />
                  Ver mi Post
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal del Post - CORREGIDO */}
      <AnimatePresence mode="wait">
        {showCertificate && registeredUser && (
          <CertificateViewer 
            key="certificate-viewer"
            userData={registeredUser}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default RegistrationForm;
