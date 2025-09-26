import { useState } from 'react';
import { Scissors, Palette, Clock, Award, CheckCircle, Send, Upload } from 'lucide-react';
import styles from './CustomOrders.module.css';

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    description: '',
    budget: '',
    timeline: '',
    measurements: '',
    fabricPreference: '',
    colorPreference: '',
    specialRequirements: ''
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      id: 'dressmaking',
      name: 'Confección de Vestidos',
      description: 'Vestidos a medida para ocasiones especiales',
      icon: <Scissors size={24} />,
      price: 'Desde $150'
    },
    {
      id: 'alterations',
      name: 'Ajustes y Modificaciones',
      description: 'Ajustes de prendas existentes',
      icon: <Award size={24} />,
      price: 'Desde $25'
    },
    {
      id: 'embroidery',
      name: 'Bordados Personalizados',
      description: 'Bordados únicos en tus prendas',
      icon: <Palette size={24} />,
      price: 'Desde $50'
    },
    {
      id: 'consultation',
      name: 'Consultoría de Estilo',
      description: 'Asesoramiento personalizado en moda',
      icon: <Clock size={24} />,
      price: 'Desde $75'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successContent}>
          <CheckCircle size={64} className={styles.successIcon} />
          <h1 className={styles.successTitle}>¡Solicitud Enviada!</h1>
          <p className={styles.successMessage}>
            Hemos recibido tu solicitud de encargo personalizado. 
            Nos pondremos en contacto contigo en las próximas 24 horas 
            para discutir los detalles de tu proyecto.
          </p>
          <div className={styles.successActions}>
            <button 
              className={styles.primaryButton}
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  serviceType: '',
                  description: '',
                  budget: '',
                  timeline: '',
                  measurements: '',
                  fabricPreference: '',
                  colorPreference: '',
                  specialRequirements: ''
                });
                setSelectedImages([]);
              }}
            >
              Hacer Otro Encargo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.customOrders}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Encargos Personalizados</h1>
          <p className={styles.subtitle}>
            Transforma tus ideas en prendas únicas con nuestros servicios de confección personalizada
          </p>
        </div>

        {/* Services Grid */}
        <section className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
          <div className={styles.servicesGrid}>
            {services.map(service => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <div className={styles.servicePrice}>{service.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Solicitar Encargo</h2>
              <p className={styles.formDescription}>
                Completa el formulario y nos pondremos en contacto contigo para discutir tu proyecto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Personal Information */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Información Personal</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Nombre Completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Detalles del Servicio</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="serviceType" className={styles.label}>Tipo de Servicio *</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className={styles.select}
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="budget" className={styles.label}>Presupuesto Aproximado</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Selecciona un rango</option>
                      <option value="0-100">$0 - $100</option>
                      <option value="100-250">$100 - $250</option>
                      <option value="250-500">$250 - $500</option>
                      <option value="500+">$500+</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="timeline" className={styles.label}>Tiempo de Entrega Deseado</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Selecciona un tiempo</option>
                      <option value="1-week">1 semana</option>
                      <option value="2-weeks">2 semanas</option>
                      <option value="1-month">1 mes</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Descripción del Proyecto</h3>
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>Describe tu proyecto *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={styles.textarea}
                    placeholder="Describe detalladamente lo que tienes en mente..."
                  />
                </div>
              </div>

              {/* Measurements and Preferences */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Medidas y Preferencias</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="measurements" className={styles.label}>Medidas (opcional)</label>
                    <textarea
                      id="measurements"
                      name="measurements"
                      value={formData.measurements}
                      onChange={handleInputChange}
                      rows={3}
                      className={styles.textarea}
                      placeholder="Pecho, cintura, cadera, etc."
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="fabricPreference" className={styles.label}>Preferencia de Tela</label>
                    <input
                      type="text"
                      id="fabricPreference"
                      name="fabricPreference"
                      value={formData.fabricPreference}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Algodón, lino, seda, etc."
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="colorPreference" className={styles.label}>Preferencia de Color</label>
                    <input
                      type="text"
                      id="colorPreference"
                      name="colorPreference"
                      value={formData.colorPreference}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Colores deseados"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Imágenes de Referencia</h3>
                <div className={styles.imageUpload}>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor="images" className={styles.uploadButton}>
                    <Upload size={20} />
                    Subir Imágenes
                  </label>
                  <p className={styles.uploadHint}>
                    Sube fotos de inspiración, diseños similares o referencias
                  </p>
                </div>
                
                {selectedImages.length > 0 && (
                  <div className={styles.imagePreview}>
                    {selectedImages.map((file, index) => (
                      <div key={index} className={styles.imageItem}>
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Referencia ${index + 1}`}
                          className={styles.previewImage}
                        />
                        <button 
                          type="button"
                          onClick={() => removeImage(index)}
                          className={styles.removeImage}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Special Requirements */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Requisitos Especiales</h3>
                <div className={styles.formGroup}>
                  <label htmlFor="specialRequirements" className={styles.label}>
                    Requisitos adicionales
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    className={styles.textarea}
                    placeholder="Alergias, restricciones, preferencias especiales..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className={styles.submitSection}>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner} />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Solicitud
                    </>
                  )}
                </button>
                <p className={styles.submitNote}>
                  * Campos obligatorios. Te contactaremos en 24 horas.
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomOrders;
