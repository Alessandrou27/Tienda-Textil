import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Heart, User, Globe, Phone, Mail, MapPin, Headphones } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import heroImage from '../../assets/hero.jpg';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [pinnedDropdown, setPinnedDropdown] = useState(null);
  const { items: cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const location = useLocation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when navigating to a new page
  useEffect(() => {
    setActiveDropdown(null);
    setPinnedDropdown(null);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleDropdownEnter = (dropdown) => {
    // Cancelar cualquier timeout pendiente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Siempre activar el dropdown cuando se pasa el cursor, a menos que haya uno pinned diferente
    if (!pinnedDropdown || pinnedDropdown === dropdown) {
      setActiveDropdown(dropdown);
    }
  };

  const handleDropdownLeave = () => {
    if (!pinnedDropdown) {
      // Crear un timeout de 300ms antes de cerrar el dropdown
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
        timeoutRef.current = null;
      }, 100);
    }
  };

  const handleDropdownClick = (dropdown) => {
    if (pinnedDropdown === dropdown) {
      setPinnedDropdown(null);
      setActiveDropdown(null);
    } else {
      setPinnedDropdown(dropdown);
      setActiveDropdown(dropdown);
    }
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setPinnedDropdown(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className={styles.header}>
      {/* Top Utility Bar - Always visible */}
      <div className={`${styles.utilityBar} ${isScrolled || !isHomePage ? styles.scrolled : ''}`}>
        <div className={styles.utilityContainer}>
          <div className={styles.utilityLeft}>
            <div className={styles.utilityItem}>
              <Globe size={12} />
              <span>Perú</span>
            </div>
            <div className={styles.utilityItem}>
              <Mail size={12} />
              <span>ciamar25@hotmail.com</span>
            </div>
            <div className={styles.utilityItem}>
              <Mail size={12} />
              <span>juanky@hotmail.com</span>
            </div>
            <div className={styles.utilityItem}>
              <Phone size={12} />
              <span>912 301 451</span>
            </div>
            <div className={styles.utilityItem}>
              <Phone size={12} />
              <span>981 412 799</span>
            </div>
          </div>
          
          {/* Navigation in utility bar when main header is hidden */}
          {(isScrolled || !isHomePage) && (
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
                PRODUCTOS
              </Link>
              <Link 
                to="/custom-orders" 
                className={`${styles.utilityNavLink} ${isActive('/custom-orders') ? styles.active : ''}`}
              >
                ESTAMPADOS
              </Link>
              <Link 
                to="/about" 
                className={`${styles.utilityNavLink} ${isActive('/about') ? styles.active : ''}`}
              >
                EMPRESA
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

      {/* Main Header - Only visible on home page and hidden on scroll */}
      {isHomePage && (
        <div className={`${styles.mainHeader} ${isScrolled ? styles.mainHeaderHidden : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoEmblem}>
              <img src="/logo.png" alt="Logo" className={styles.logoImage} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className={styles.nav}
            onMouseLeave={handleDropdownLeave}
          >
            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'servicios' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('servicios')}
              onClick={() => handleDropdownClick('servicios')}
            >
              <Link 
                to="/" 
                className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
              >
                SERVICIOS
              </Link>
              {(activeDropdown === 'servicios' || pinnedDropdown === 'servicios') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('servicios')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>SERVICIOS DE ESTAMPADO</h3>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Serigrafía</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Impresión Digital</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Bordados</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Vinilo Textil</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>CONSULTORÍA</h3>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Diseño Personalizado</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Asesoramiento Técnico</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'productos' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('productos')}
              onClick={() => handleDropdownClick('productos')}
            >
              <Link 
                to="/shop" 
                className={`${styles.navLink} ${isActive('/shop') ? styles.active : ''}`}
              >
                PRODUCTOS
              </Link>
              {(activeDropdown === 'productos' || pinnedDropdown === 'productos') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('productos')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>PRENDAS</h3>
                      <Link to="/shop?category=camisetas" onClick={handleLinkClick}>Camisetas</Link>
                      <Link to="/shop?category=sudaderas" onClick={handleLinkClick}>Sudaderas</Link>
                      <Link to="/shop?category=gorras" onClick={handleLinkClick}>Gorras</Link>
                      <Link to="/shop?category=pantalones" onClick={handleLinkClick}>Pantalones</Link>
                      <Link to="/shop?category=vestidos" onClick={handleLinkClick}>Vestidos</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>ACCESORIOS</h3>
                      <Link to="/shop?category=bolsas" onClick={handleLinkClick}>Bolsas</Link>
                      <Link to="/shop?category=cinturones" onClick={handleLinkClick}>Cinturones</Link>
                      <Link to="/shop?category=gafas" onClick={handleLinkClick}>Gafas</Link>
                      <Link to="/shop?category=relojes" onClick={handleLinkClick}>Relojes</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'estampados' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('estampados')}
              onClick={() => handleDropdownClick('estampados')}
            >
              <Link 
                to="/custom-orders" 
                className={`${styles.navLink} ${isActive('/custom-orders') ? styles.active : ''}`}
              >
                ESTAMPADOS
              </Link>
              {(activeDropdown === 'estampados' || pinnedDropdown === 'estampados') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('estampados')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>TIPOS DE ESTAMPADO</h3>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Serigrafía</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Impresión Digital</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Bordados</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Vinilo Textil</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>PRODUCTOS</h3>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Camisetas</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Sudaderas</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Gorras</Link>
                      <Link to="/custom-orders" onClick={handleLinkClick}>Bolsas</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>


            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'empresa' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('empresa')}
              onClick={() => handleDropdownClick('empresa')}
            >
              <Link 
                to="/about" 
                className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
              >
                EMPRESA
              </Link>
              {(activeDropdown === 'empresa' || pinnedDropdown === 'empresa') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('empresa')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>SOBRE NOSOTROS</h3>
                      <Link to="/about" onClick={handleLinkClick}>Nuestra Historia</Link>
                      <Link to="/about" onClick={handleLinkClick}>Misión y Visión</Link>
                      <Link to="/about" onClick={handleLinkClick}>Equipo</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>INFORMACIÓN</h3>
                      <Link to="/about" onClick={handleLinkClick}>Políticas</Link>
                      <Link to="/about" onClick={handleLinkClick}>Términos y Condiciones</Link>
                      <Link to="/about" onClick={handleLinkClick}>Privacidad</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'contacto' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('contacto')}
              onClick={() => handleDropdownClick('contacto')}
            >
              <Link 
                to="/contact" 
                className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
              >
                CONTACTO
              </Link>
              {(activeDropdown === 'contacto' || pinnedDropdown === 'contacto') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('contacto')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>CONTACTO</h3>
                      <Link to="/contact" onClick={handleLinkClick}>Información de Contacto</Link>
                      <Link to="/contact" onClick={handleLinkClick}>Ubicación</Link>
                      <Link to="/contact" onClick={handleLinkClick}>Horarios</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>SOPORTE</h3>
                      <Link to="/contact" onClick={handleLinkClick}>Preguntas Frecuentes</Link>
                      <Link to="/contact" onClick={handleLinkClick}>Soporte Técnico</Link>
                      <Link to="/contact" onClick={handleLinkClick}>Garantías</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>


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
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={styles.mobileNav}>
          <Link 
            to="/" 
            className={`${styles.mobileNavLink} ${isActive('/') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link 
            to="/shop" 
            className={`${styles.mobileNavLink} ${isActive('/shop') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Productos
          </Link>
          <Link 
            to="/custom-orders" 
            className={`${styles.mobileNavLink} ${isActive('/custom-orders') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Estampados
          </Link>
          <Link 
            to="/about" 
            className={`${styles.mobileNavLink} ${isActive('/about') ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Empresa
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
              {cart.length === 0 ? (
                <p className={styles.emptyCart}>Tu carrito está vacío</p>
              ) : (
                <div className={styles.cartItems}>
                  {cart.map((item) => (
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
