import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HelpCircle, Shield } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          <MessageCircle size={64} className={styles.successIcon} />
          <h1 className={styles.successTitle}>¡Mensaje Enviado!</h1>
          <p className={styles.successMessage}>
            Hemos recibido tu mensaje. Te responderemos en las próximas 24 horas.
          </p>
          <button 
            className={styles.primaryButton}
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
              });
            }}
          >
            Enviar Otro Mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Contacto</h1>
            <p className={styles.heroSubtitle}>
              Estamos aquí para ayudarte. Contáctanos para cualquier consulta sobre nuestros servicios de estampado.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className={styles.contactInfoSection}>
          <h2 className={styles.sectionTitle}>Información de Contacto</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <MapPin size={24} />
              </div>
              <h3 className={styles.contactTitle}>Ubicación</h3>
              <p className={styles.contactText}>
                Av. Industrial 123<br />
                Lima, Perú<br />
                Código Postal: 15001
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Phone size={24} />
              </div>
              <h3 className={styles.contactTitle}>Teléfonos</h3>
              <p className={styles.contactText}>
                +51 912 301 451<br />
                +51 981 412 799
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Mail size={24} />
              </div>
              <h3 className={styles.contactTitle}>Email</h3>
              <p className={styles.contactText}>
                ciamar25@hotmail.com<br />
                juanky@hotmail.com
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Clock size={24} />
              </div>
              <h3 className={styles.contactTitle}>Horarios</h3>
              <p className={styles.contactText}>
                Lunes - Viernes: 8:00 AM - 6:00 PM<br />
                Sábados: 9:00 AM - 2:00 PM<br />
                Domingos: Cerrado
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Envíanos un Mensaje</h2>
              <p className={styles.formDescription}>
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
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
                    placeholder="Tu nombre completo"
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
                    placeholder="tu@email.com"
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
                    placeholder="+51 999 999 999"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Asunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={styles.select}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="cotizacion">Cotización de Estampado</option>
                    <option value="consulta">Consulta General</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="queja">Queja o Sugerencia</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={styles.textarea}
                  placeholder="Describe tu consulta o proyecto en detalle..."
                />
              </div>
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
                      Enviar Mensaje
                    </>
                  )}
                </button>
                <p className={styles.submitNote}>
                  * Campos obligatorios. Te responderemos en 24 horas.
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* Support Section */}
        <section className={styles.supportSection}>
          <h2 className={styles.sectionTitle}>Soporte y Ayuda</h2>
          <div className={styles.supportGrid}>
            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>
                <HelpCircle size={24} />
              </div>
              <h3 className={styles.supportTitle}>Preguntas Frecuentes</h3>
              <p className={styles.supportDescription}>
                Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de estampado.
              </p>
              <button className={styles.supportButton}>Ver FAQ</button>
            </div>
            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>
                <MessageCircle size={24} />
              </div>
              <h3 className={styles.supportTitle}>Soporte Técnico</h3>
              <p className={styles.supportDescription}>
                ¿Necesitas ayuda técnica? Nuestro equipo está disponible para asistirte.
              </p>
              <button className={styles.supportButton}>Contactar Soporte</button>
            </div>
            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>
                <Shield size={24} />
              </div>
              <h3 className={styles.supportTitle}>Garantías</h3>
              <p className={styles.supportDescription}>
                Conoce nuestras políticas de garantía y devolución para todos nuestros productos.
              </p>
              <button className={styles.supportButton}>Ver Garantías</button>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className={styles.mapSection}>
          <h2 className={styles.sectionTitle}>Nuestra Ubicación</h2>
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <MapPin size={48} />
              <p>Mapa interactivo de nuestra ubicación</p>
              <p className={styles.mapAddress}>
                Av. Industrial 123, Lima, Perú
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
