import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Heart, User, Globe, Phone, Mail, MapPin, Headphones } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, getTotalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      {/* Top Utility Bar - Always visible */}
      <div className={`${styles.utilityBar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.utilityContainer}>
          <div className={styles.utilityLeft}>
            <div className={styles.utilityItem}>
              <Globe size={12} />
              <span>ESPAÑA</span>
            </div>
            <div className={styles.utilityItem}>
              <Headphones size={12} />
              <span>CONTÁCTANOS</span>
            </div>
            <div className={styles.utilityItem}>
              <MapPin size={12} />
              <span>BOUTIQUE</span>
            </div>
            <div className={styles.utilityItem}>
              <Phone size={12} />
              <span>+34 919 03 00 95</span>
            </div>
            <div className={styles.utilityItem}>
              <Mail size={12} />
              <span>NEWSLETTER</span>
            </div>
          </div>
          
          {/* Navigation in utility bar when main header is hidden */}
          {isScrolled && (
            <div className={styles.utilityNav}>
              <Link 
                to="/" 
                className={`${styles.utilityNavLink} ${isActive('/') ? styles.active : ''}`}
              >
                INICIO
              </Link>
              <Link 
                to="/shop" 
                className={`${styles.utilityNavLink} ${isActive('/shop') ? styles.active : ''}`}
              >
                TIENDA
              </Link>
              <Link 
                to="/custom-orders" 
                className={`${styles.utilityNavLink} ${isActive('/custom-orders') ? styles.active : ''}`}
              >
                ENCARGOS
              </Link>
              <Link 
                to="/about" 
                className={`${styles.utilityNavLink} ${isActive('/about') ? styles.active : ''}`}
              >
                NOSOTROS
              </Link>
              <Link 
                to="/contact" 
                className={`${styles.utilityNavLink} ${isActive('/contact') ? styles.active : ''}`}
              >
                CONTACTO
              </Link>
            </div>
          )}
          
          <div className={styles.utilityRight}>
            <button className={styles.utilityIcon}>
              <Search size={14} />
            </button>
            <button className={styles.utilityIcon}>
              <Heart size={14} />
            </button>
            <button className={styles.utilityIcon}>
              <User size={14} />
            </button>
            <button 
              className={styles.utilityIcon}
              onClick={toggleCart}
            >
              <ShoppingBag size={14} />
              {getTotalItems() > 0 && (
                <span className={styles.cartBadge}>{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header - Hidden on scroll */}
      <div className={`${styles.mainHeader} ${isScrolled ? styles.mainHeaderHidden : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoEmblem}>
              <div className={styles.emblemIcon}>T</div>
            </div>
            <span className={styles.logoText}>TEXTIL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            >
              Inicio
            </Link>
            <Link 
              to="/shop" 
              className={`${styles.navLink} ${isActive('/shop') ? styles.active : ''}`}
            >
              Tienda
            </Link>
            <Link 
              to="/custom-orders" 
              className={`${styles.navLink} ${isActive('/custom-orders') ? styles.active : ''}`}
            >
              Encargos
            </Link>
            <Link 
              to="/about" 
              className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
            >
              Nosotros
            </Link>
            <Link 
              to="/contact" 
              className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuButton}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={styles.mobileNav}>
          <Link 
            to="/" 
            className={`${styles.mobileNavLink} ${isActive('/') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link 
            to="/shop" 
            className={`${styles.mobileNavLink} ${isActive('/shop') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Tienda
          </Link>
          <Link 
            to="/custom-orders" 
            className={`${styles.mobileNavLink} ${isActive('/custom-orders') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Encargos
          </Link>
          <Link 
            to="/about" 
            className={`${styles.mobileNavLink} ${isActive('/about') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Nosotros
          </Link>
          <Link 
            to="/contact" 
            className={`${styles.mobileNavLink} ${isActive('/contact') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className={styles.cartOverlay} onClick={toggleCart}>
          <div className={styles.cartSidebar} onClick={(e) => e.stopPropagation()}>
            <div className={styles.cartHeader}>
              <h3>Carrito de Compras</h3>
              <button onClick={toggleCart} className={styles.closeCart}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.cartContent}>
              {items.length === 0 ? (
                <p className={styles.emptyCart}>Tu carrito está vacío</p>
              ) : (
                <div className={styles.cartItems}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemInfo}>
                        <h4>{item.name}</h4>
                        <p>${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
