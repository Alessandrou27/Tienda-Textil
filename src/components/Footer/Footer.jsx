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
            <h3 className={styles.brandName}>MAS PRINT PERÚ</h3>
            <p className={styles.brandDescription}>
              Especialistas en estampado textil de alta calidad. 
              Ofrecemos servicios de serigrafía, impresión digital, 
              bordados y personalización para satisfacer todas tus necesidades.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/mas_print_peru/?hl=es" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/masprintperu" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Enlaces Rápidos</h4>
            <ul className={styles.linksList}>
              <li><Link to="/" className={styles.footerLink}>Servicios</Link></li>
              <li><Link to="/shop" className={styles.footerLink}>Productos</Link></li>
              <li><Link to="/custom-orders" className={styles.footerLink}>Estampados</Link></li>
              <li><Link to="/about" className={styles.footerLink}>Empresa</Link></li>
              <li><Link to="/contact" className={styles.footerLink}>Contacto</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.servicesSection}>
            <h4 className={styles.sectionTitle}>Servicios</h4>
            <ul className={styles.linksList}>
              <li><span className={styles.footerLink}>Serigrafía</span></li>
              <li><span className={styles.footerLink}>Impresión Digital</span></li>
              <li><span className={styles.footerLink}>Bordados Personalizados</span></li>
              <li><span className={styles.footerLink}>Vinilo Textil</span></li>
              <li><span className={styles.footerLink}>Diseño Personalizado</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Contacto</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>Lima, Perú</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>912 301 451</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>981 412 799</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>ciamar25@hotmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>juanky@hotmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 MAS PRINT PERÚ. Todos los derechos reservados.
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
