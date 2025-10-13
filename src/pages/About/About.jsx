import React from 'react';
import { Users, Target, Eye, Award, Clock, MapPin, Phone, Mail } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Sobre Nosotros</h1>
            <p className={styles.heroSubtitle}>
              Más de una década transformando ideas en realidad a través del estampado textil de alta calidad
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className={styles.storySection}>
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <h2 className={styles.sectionTitle}>Nuestra Historia</h2>
              <p className={styles.storyDescription}>
                Fundada en 2010, Mas Print Perú S.A. comenzó como una pequeña empresa familiar 
                con la visión de ofrecer servicios de estampado textil de la más alta calidad. 
                Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en una de 
                las empresas líderes en el sector de personalización textil en el Perú.
              </p>
              <p className={styles.storyDescription}>
                Nuestro compromiso con la excelencia y la innovación nos ha permitido trabajar 
                con marcas reconocidas, empresas emergentes y clientes particulares, siempre 
                manteniendo los más altos estándares de calidad y servicio al cliente.
              </p>
            </div>
            <div className={styles.storyImage}>
              <div className={styles.imagePlaceholder}>
                <Users size={64} />
                <p>Imagen de nuestra historia</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={styles.missionVisionSection}>
          <div className={styles.missionVisionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <Target size={32} />
              </div>
              <h3 className={styles.cardTitle}>Nuestra Misión</h3>
              <p className={styles.cardDescription}>
                Transformar las ideas creativas de nuestros clientes en productos textiles 
                únicos y de alta calidad, utilizando tecnología de vanguardia y técnicas 
                artesanales tradicionales para superar las expectativas en cada proyecto.
              </p>
            </div>
            <div className={styles.visionCard}>
              <div className={styles.cardIcon}>
                <Eye size={32} />
              </div>
              <h3 className={styles.cardTitle}>Nuestra Visión</h3>
              <p className={styles.cardDescription}>
                Ser reconocidos como la empresa líder en servicios de estampado textil en 
                Latinoamérica, expandiendo nuestra presencia internacional mientras mantenemos 
                nuestro compromiso con la calidad, la innovación y el desarrollo sostenible.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Award size={24} />
              </div>
              <h4 className={styles.valueTitle}>Calidad</h4>
              <p className={styles.valueDescription}>
                Nos comprometemos a entregar productos de la más alta calidad en cada proyecto.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Users size={24} />
              </div>
              <h4 className={styles.valueTitle}>Servicio al Cliente</h4>
              <p className={styles.valueDescription}>
                La satisfacción de nuestros clientes es nuestra prioridad número uno.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Clock size={24} />
              </div>
              <h4 className={styles.valueTitle}>Puntualidad</h4>
              <p className={styles.valueDescription}>
                Entregamos nuestros productos en los tiempos acordados, siempre.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Target size={24} />
              </div>
              <h4 className={styles.valueTitle}>Innovación</h4>
              <p className={styles.valueDescription}>
                Constantemente buscamos nuevas técnicas y tecnologías para mejorar nuestros servicios.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Nuestro Equipo</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberImage}>
                <div className={styles.imagePlaceholder}>
                  <Users size={48} />
                </div>
              </div>
              <h4 className={styles.memberName}>María González</h4>
              <p className={styles.memberRole}>Directora General</p>
              <p className={styles.memberDescription}>
                Con más de 15 años de experiencia en la industria textil, María lidera 
                nuestra empresa con pasión y visión estratégica.
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberImage}>
                <div className={styles.imagePlaceholder}>
                  <Users size={48} />
                </div>
              </div>
              <h4 className={styles.memberName}>Carlos Rodríguez</h4>
              <p className={styles.memberRole}>Jefe de Producción</p>
              <p className={styles.memberDescription}>
                Especialista en técnicas de estampado, Carlos asegura que cada producto 
                cumpla con nuestros estándares de calidad.
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberImage}>
                <div className={styles.imagePlaceholder}>
                  <Users size={48} />
                </div>
              </div>
              <h4 className={styles.memberName}>Ana Martínez</h4>
              <p className={styles.memberRole}>Diseñadora Gráfica</p>
              <p className={styles.memberDescription}>
                Ana transforma las ideas de nuestros clientes en diseños únicos y 
                creativos que cobran vida en nuestros productos.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className={styles.contactInfoSection}>
          <h2 className={styles.sectionTitle}>Información de Contacto</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <MapPin size={24} />
              </div>
              <h4 className={styles.contactTitle}>Ubicación</h4>
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
              <h4 className={styles.contactTitle}>Teléfonos</h4>
              <p className={styles.contactText}>
                +51 912 301 451<br />
                +51 981 412 799
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Mail size={24} />
              </div>
              <h4 className={styles.contactTitle}>Email</h4>
              <p className={styles.contactText}>
                ciamar25@hotmail.com<br />
                juanky@hotmail.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
