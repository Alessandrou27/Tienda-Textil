import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <h3 className={styles.brandName}>TEXTIL</h3>
            <p className={styles.brandDescription}>
              Especialistas en textiles de alta calidad. 
              Ofrecemos productos únicos y servicios personalizados 
              para satisfacer todas tus necesidades textiles.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Enlaces Rápidos</h4>
            <ul className={styles.linksList}>
              <li><Link to="/" className={styles.footerLink}>Inicio</Link></li>
              <li><Link to="/shop" className={styles.footerLink}>Tienda</Link></li>
              <li><Link to="/custom-orders" className={styles.footerLink}>Encargos</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.servicesSection}>
            <h4 className={styles.sectionTitle}>Servicios</h4>
            <ul className={styles.linksList}>
              <li><span className={styles.footerLink}>Corte y Confección</span></li>
              <li><span className={styles.footerLink}>Bordados Personalizados</span></li>
              <li><span className={styles.footerLink}>Reparaciones</span></li>
              <li><span className={styles.footerLink}>Consultoría Textil</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Contacto</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>Av. Principal 123, Ciudad</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>info@textil.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 TEXTIL. Todos los derechos reservados.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Política de Privacidad</a>
            <a href="#" className={styles.legalLink}>Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
