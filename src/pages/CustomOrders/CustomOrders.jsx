import { useState } from 'react';
import { Printer, Palette, Clock, Award, CheckCircle, Send, Upload, Image, Shirt } from 'lucide-react';
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
    quantity: '',
    garmentType: '',
    designColors: '',
    technicalSpecs: ''
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      id: 'screen-printing',
      name: 'Serigrafía',
      description: 'Estampados de alta calidad en prendas y textiles',
      icon: <Printer size={24} />,
      price: 'Desde $15'
    },
    {
      id: 'digital-printing',
      name: 'Impresión Digital',
      description: 'Diseños complejos y fotografías en alta resolución',
      icon: <Image size={24} />,
      price: 'Desde $25'
    },
    {
      id: 'embroidery',
      name: 'Bordados Personalizados',
      description: 'Bordados únicos en prendas y accesorios',
      icon: <Palette size={24} />,
      price: 'Desde $50'
    },
    {
      id: 'vinyl-printing',
      name: 'Vinilo Textil',
      description: 'Aplicación de vinilos cortados para diseños precisos',
      icon: <Shirt size={24} />,
      price: 'Desde $20'
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
            Hemos recibido tu solicitud de estampado personalizado. 
            Te enviaremos una cotización detallada en las próximas 24 horas 
            con los precios y tiempos de entrega para tu proyecto.
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
                  quantity: '',
                  garmentType: '',
                  designColors: '',
                  technicalSpecs: ''
                });
                setSelectedImages([]);
              }}
            >
              Solicitar Otro Estampado
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
          <h1 className={styles.title}>Estampados Personalizados</h1>
          <p className={styles.subtitle}>
            Transforma tus ideas en diseños únicos con nuestros servicios de estampado y personalización
          </p>
        </div>

        {/* Services Grid */}
        <section className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Nuestros Servicios de Estampado</h2>
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
              <h2 className={styles.formTitle}>Solicitar Estampado</h2>
              <p className={styles.formDescription}>
                Completa el formulario y nos pondremos en contacto contigo para discutir tu proyecto de estampado.
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
                <h3 className={styles.sectionTitle}>Detalles del Estampado</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="serviceType" className={styles.label}>Tipo de Estampado *</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className={styles.select}
                    >
                      <option value="">Selecciona un tipo de estampado</option>
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
                      <option value="0-200">$0 - $200</option>
                      <option value="200-500">$200 - $500</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000+">$1,000+</option>
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
                      <option value="3-5-days">3-5 días</option>
                      <option value="1-week">1 semana</option>
                      <option value="2-weeks">2 semanas</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Descripción del Diseño</h3>
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>Describe tu diseño *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={styles.textarea}
                    placeholder="Describe detalladamente tu diseño, colores, estilo y cualquier detalle específico..."
                  />
                </div>
              </div>

              {/* Measurements and Preferences */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Especificaciones del Producto</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="measurements" className={styles.label}>Cantidad de Piezas</label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Ej: 50 camisetas, 20 sudaderas, etc."
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="fabricPreference" className={styles.label}>Tipo de Prenda</label>
                    <input
                      type="text"
                      id="garmentType"
                      name="garmentType"
                      value={formData.garmentType}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Camisetas, sudaderas, gorras, bolsas, etc."
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="colorPreference" className={styles.label}>Colores del Diseño</label>
                    <input
                      type="text"
                      id="designColors"
                      name="designColors"
                      value={formData.designColors}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Colores específicos del diseño a estampar"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Archivos de Diseño</h3>
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
                    Subir Diseños
                  </label>
                  <p className={styles.uploadHint}>
                    Sube archivos de diseño, logos, imágenes o referencias visuales
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
                <h3 className={styles.sectionTitle}>Especificaciones Técnicas</h3>
                <div className={styles.formGroup}>
                  <label htmlFor="specialRequirements" className={styles.label}>
                    Especificaciones técnicas adicionales
                  </label>
                  <textarea
                    id="technicalSpecs"
                    name="technicalSpecs"
                    value={formData.technicalSpecs}
                    onChange={handleInputChange}
                    rows={3}
                    className={styles.textarea}
                    placeholder="Tamaño del diseño, posición del estampado, acabados especiales, etc."
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
                      Solicitar Cotización
                    </>
                  )}
                </button>
                <p className={styles.submitNote}>
                  * Campos obligatorios. Te enviaremos una cotización en 24 horas.
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
