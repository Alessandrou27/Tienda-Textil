import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, Scissors } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Home.module.css';

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Camisa de Lino Premium',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    name: 'Vestido Bordado Artesanal',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    rating: 4.9,
    reviews: 18
  },
  {
    id: 3,
    name: 'Chal de Seda Natural',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1601925260369-0a0b4b5a0b4b?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 31
  }
];

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Video Hero Section */}
      <section className={styles.videoHero}>
        <video 
          className={styles.heroVideo}
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source 
            src="https://media.brunellocucinelli.com/video/upload/q_auto/f_auto,vc_auto/vc_vp9/v1/inspiration-2025/09_SETTEMBRE/CATALOGO_FW25_PT2_REFRESH/ESECUTIVI/HOMEPAGE/30-09-25_riga_4_style01_HP_Brunello_Cucinelli.webm?_s=vp-1.8.0" 
            type="video/webm" 
          />
          Tu navegador no soporta el elemento de video.
        </video>
        <div className={styles.videoOverlay}>
          <h1 className={styles.videoTitle}>TEXTIL</h1>
          <p className={styles.videoSubtitle}>Elegancia y Calidad en Cada Detalle</p>
        </div>
      </section>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Textiles de <span className={styles.highlight}>Alta Calidad</span>
            </h1>
            <p className={styles.heroDescription}>
              Descubre nuestra colección exclusiva de prendas artesanales y 
              servicios de confección personalizada. Cada pieza cuenta una historia única.
            </p>
            <div className={styles.heroActions}>
              <Link to="/shop" className={styles.primaryButton}>
                Explorar Colección
                <ArrowRight size={20} />
              </Link>
              <Link to="/custom-orders" className={styles.secondaryButton}>
                Encargos Personalizados
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop" 
              alt="Textiles de alta calidad"
              className={styles.heroImg}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>¿Por qué elegir TEXTIL?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Award size={32} />
              </div>
              <h3>Calidad Premium</h3>
              <p>Materiales seleccionados y técnicas artesanales que garantizan durabilidad y elegancia.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Scissors size={32} />
              </div>
              <h3>Confección Personalizada</h3>
              <p>Servicios de corte y confección adaptados a tus necesidades y estilo personal.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Users size={32} />
              </div>
              <h3>Atención Personalizada</h3>
              <p>Asesoramiento experto y seguimiento personalizado en cada proyecto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredProducts}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Productos Destacados</h2>
            <Link to="/shop" className={styles.viewAllLink}>
              Ver todos los productos
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.servicesContent}>
            <div className={styles.servicesText}>
              <h2 className={styles.sectionTitle}>Servicios Especializados</h2>
              <p className={styles.servicesDescription}>
                Ofrecemos una amplia gama de servicios textiles para satisfacer 
                todas tus necesidades, desde reparaciones hasta creaciones completamente personalizadas.
              </p>
              <ul className={styles.servicesList}>
                <li>Bordados personalizados</li>
                <li>Corte y confección a medida</li>
                <li>Reparaciones y ajustes</li>
                <li>Consultoría en diseño textil</li>
                <li>Restauración de prendas vintage</li>
              </ul>
              <Link to="/custom-orders" className={styles.primaryButton}>
                Solicitar Servicio
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className={styles.servicesImage}>
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop" 
                alt="Servicios textiles"
                className={styles.servicesImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>¿Listo para tu próximo proyecto textil?</h2>
            <p className={styles.ctaDescription}>
              Contacta con nosotros y descubre cómo podemos hacer realidad tu visión.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/custom-orders" className={styles.primaryButton}>
                Comenzar Proyecto
                <ArrowRight size={20} />
              </Link>
              <Link to="/shop" className={styles.secondaryButton}>
                Ver Productos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
