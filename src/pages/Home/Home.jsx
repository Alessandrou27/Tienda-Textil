import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Scissors, Users, ArrowRight, Star, ShoppingBag, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Home.module.css';
import heroImage from '../../assets/hero.jpg';
import hombreElegante from '../../assets/hombreElegante.avif';
import abrigo from '../../assets/abrigo.webp';
import blusa from '../../assets/blusa.webp';
import falda from '../../assets/falda.webp';
import tacos from '../../assets/tacos.webp';
import tacos2 from '../../assets/tacos2.webp';
import home2 from '../../assets/home2.webp';

// Mock data for women's products
const womenProducts = [
  {
    id: 1,
    name: 'Falda Sartorial Pencil',
    price: 2180.00,
    image: falda,
    category: 'Faldas',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Botas City en piel de ante con Manila',
    price: 2300.00,
    image: tacos,
    category: 'Calzado',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Abrigo Dazzling Croc Motif',
    price: 14000.00,
    image: abrigo,
    category: 'Abrigos',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: 'Chaquetón Crop en piel de cordero Fuzzy',
    price: 11950.00,
    image: blusa,
    category: 'Chaquetas',
    rating: 4.8,
    reviews: 203
  }
];

// Mock data for men's products (placeholder structure ready)
const menProducts = [
  {
    id: 5,
    name: 'Traje Elegante Masculino',
    price: 2500.00,
    image: '/placeholder-men-1.jpg', // Placeholder for future image
    category: 'Trajes',
    rating: 4.8,
    reviews: 95
  },
  {
    id: 6,
    name: 'Zapatos Oxford Premium',
    price: 1800.00,
    image: '/placeholder-men-2.jpg', // Placeholder for future image
    category: 'Calzado',
    rating: 4.9,
    reviews: 112
  },
  {
    id: 7,
    name: 'Camisa Formal de Lujo',
    price: 800.00,
    image: '/placeholder-men-3.jpg', // Placeholder for future image
    category: 'Camisas',
    rating: 4.7,
    reviews: 87
  },
  {
    id: 8,
    name: 'Abrigo Masculino Premium',
    price: 3200.00,
    image: '/placeholder-men-4.jpg', // Placeholder for future image
    category: 'Abrigos',
    rating: 4.8,
    reviews: 156
  }
];

const Home = () => {
  const [selectedGender, setSelectedGender] = useState('women');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector(`.${styles.featuredProducts}`);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const currentProducts = selectedGender === 'women' ? womenProducts : menProducts;
  return (
    <div className={styles.home}>
      {/* Hero Section - Brunello Cucinelli Style */}
      <section className={styles.videoHero}>
        <img 
          src={heroImage}
          alt="TEXTIL - Elegancia y Calidad en Cada Detalle"
          className={styles.heroVideo}
        />
        <div className={styles.videoOverlay}>
          <h1 className={styles.videoTitle}>Colección OI25</h1>
          <div className={styles.heroButtons}>
            <Link to="/shop?category=mujer" className={styles.heroButton}>
              NOVEDADES MUJER
            </Link>
            <Link to="/shop?category=hombre" className={styles.heroButton}>
              NOVEDADES HOMBRE
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTextContent}>
              <h1 className={styles.heroTitle}>
                Textiles de <span className={styles.highlight}>Alta Calidad</span>
              </h1>
              <p className={styles.heroDescription}>
                Descubre nuestra colección exclusiva de prendas artesanales y 
                servicios de confección personalizada. Cada pieza cuenta una historia única.
              </p>
              <div className={styles.heroActions}>
                <Link to="/shop" className={styles.primaryButton}>
                  <span>Explorar Colección</span>
                  <ArrowRight size={20} />
                </Link>
                <Link to="/custom-orders" className={styles.secondaryButton}>
                  Encargos Personalizados
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imageContainer}>
              <img 
                src={hombreElegante} 
                alt="Textiles de alta calidad"
                className={styles.heroImg}
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitsHeader}>
            <h2 className={styles.benefitsTitle}>¿Por qué elegirnos?</h2>
            <p className={styles.benefitsSubtitle}>Descubre las ventajas que nos hacen únicos</p>
          </div>
          <div className={styles.benefitsGrid}>
            <div className={`${styles.benefitCard} ${styles.animateCard1}`}>
              <div className={styles.benefitIcon}>
                <Truck size={40} />
              </div>
              <div className={styles.benefitContent}>
                <h3>Envío Gratis</h3>
                <p>En compras superiores a $150</p>
              </div>
            </div>
            <div className={`${styles.benefitCard} ${styles.animateCard2}`}>
              <div className={styles.benefitIcon}>
                <Shield size={40} />
              </div>
              <div className={styles.benefitContent}>
                <h3>Garantía Total</h3>
                <p>30 días de garantía en todos los productos</p>
              </div>
            </div>
            <div className={`${styles.benefitCard} ${styles.animateCard3}`}>
              <div className={styles.benefitIcon}>
                <Star size={40} />
              </div>
              <div className={styles.benefitContent}>
                <h3>Calidad Premium</h3>
                <p>Materiales de la más alta calidad</p>
              </div>
            </div>
            <div className={`${styles.benefitCard} ${styles.animateCard4}`}>
              <div className={styles.benefitIcon}>
                <ShoppingBag size={40} />
              </div>
              <div className={styles.benefitContent}>
                <h3>Fácil Devolución</h3>
                <p>Proceso de devolución sin complicaciones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <motion.section 
        className={`${styles.featuredProducts} ${isVisible ? styles.visible : ''}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.fullWidthContainer}>
          <motion.div 
            className={styles.productsHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionMainTitle}>Novedades</h2>
            <p className={styles.sectionSubtitle}>Inspírate con el encanto contemporáneo de las últimas creaciones.</p>
            <div className={styles.genderTabs}>
              <button 
                className={`${styles.genderTab} ${selectedGender === 'women' ? styles.active : ''}`}
                onClick={() => setSelectedGender('women')}
              >
                PARA ELLA
              </button>
              <button 
                className={`${styles.genderTab} ${selectedGender === 'men' ? styles.active : ''}`}
                onClick={() => setSelectedGender('men')}
              >
                PARA ÉL
              </button>
            </div>
          </motion.div>
          <motion.div 
            className={`${styles.productsGrid} ${isVisible ? styles.animateProducts : ''}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {currentProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                className={`${styles.productWrapper} ${styles[`animateProduct${index + 1}`]}`}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6 + (index * 0.1),
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className={styles.services}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.container}>
          <div className={styles.servicesContent}>
            <motion.div 
              className={styles.servicesText}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>Servicios Especializados</h2>
              <p className={styles.servicesDescription}>
                Ofrecemos una amplia gama de servicios textiles para satisfacer 
                todas tus necesidades, desde reparaciones hasta creaciones completamente personalizadas.
              </p>
              <motion.ul 
                className={styles.servicesList}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {['Bordados personalizados', 'Corte y confección a medida', 'Reparaciones y ajustes', 'Consultoría en diseño textil', 'Restauración de prendas vintage'].map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    {service}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Link to="/custom-orders" className={styles.primaryButton}>
                  Solicitar Servicio
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className={styles.servicesImage}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img 
                src={home2} 
                alt="Servicios textiles"
                className={styles.servicesImg}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        className={styles.contactForm}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.container}>
          <div className={styles.formContent}>
            <motion.div 
              className={styles.formHeader}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.formTitle}>¿Listo para tu próximo proyecto textil?</h2>
              <p className={styles.formDescription}>
                Contacta con nosotros y descubre cómo podemos hacer realidad tu visión.
              </p>
            </motion.div>
            
            <motion.form 
              className={styles.form}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className={styles.formRow}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Nombre completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className={styles.formInput}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Correo electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={styles.formInput}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.formRow}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Teléfono</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className={styles.formInput}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="projectType" className={styles.formLabel}>Tipo de proyecto</label>
                  <select 
                    id="projectType" 
                    name="projectType" 
                    className={styles.formSelect}
                    required
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="bordado">Bordado personalizado</option>
                    <option value="confeccion">Corte y confección</option>
                    <option value="reparacion">Reparaciones y ajustes</option>
                    <option value="consultoria">Consultoría en diseño</option>
                    <option value="restauracion">Restauración vintage</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.formGroup}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className={styles.formLabel}>Describe tu proyecto</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4"
                  className={styles.formTextarea}
                  placeholder="Cuéntanos sobre tu proyecto textil, ideas, materiales preferidos, plazos, etc."
                  required
                ></textarea>
              </motion.div>
              
              <motion.div 
                className={styles.formActions}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <motion.button 
                  type="submit" 
                  className={styles.primaryButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Comenzar Proyecto
                  <ArrowRight size={20} />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/shop" className={styles.secondaryButton}>
                    Ver Productos
                  </Link>
                </motion.div>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
