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
              className={`${styles.navItem} ${pinnedDropdown === 'novedades' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('novedades')}
              onClick={() => handleDropdownClick('novedades')}
            >
              <Link 
                to="/" 
                className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
              >
                SERVICIOS
              </Link>
              {(activeDropdown === 'novedades' || pinnedDropdown === 'novedades') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('novedades')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>NOVEDADES</h3>
                      <Link to="/shop?category=guia-estilo">GUÍA DE ESTILO</Link>
                      <Link to="/shop?category=tennis-sets">TENNIS SETS</Link>
                      <Link to="/shop?category=nevermind-stories">NEVERMIND STORIES</Link>
                      <Link to="/shop?category=cachemire">CACHEMIRE</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>SERVICIOS EXCLUSIVOS</h3>
                      <Link to="/custom-orders">CASA CUCINELLI</Link>
                      <Link to="/shop?category=vicuna">VICUÑA</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>ABRIGOS Y CHAQUETAS</h3>
                      <Link to="/shop?category=novedades-mujer">NOVEDADES</Link>
                    </div>
                    <div className={styles.dropdownImages}>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'mujer' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('mujer')}
              onClick={() => handleDropdownClick('mujer')}
            >
              <Link 
                to="/shop?category=mujer" 
                className={`${styles.navLink} ${isActive('/shop') ? styles.active : ''}`}
              >
                CAMISETAS
              </Link>
              {(activeDropdown === 'mujer' || pinnedDropdown === 'mujer') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('mujer')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>ROPA</h3>
                      <Link to="/shop?category=abrigos">Abrigos y Chaquetas</Link>
                      <Link to="/shop?category=prendas-punto">Prendas de Punto</Link>
                      <Link to="/shop?category=vestidos">Vestidos y Monos</Link>
                      <Link to="/shop?category=blusas">Blusas y Camisas</Link>
                      <Link to="/shop?category=camisetas">Camisetas y Tops</Link>
                      <Link to="/shop?category=faldas">Faldas</Link>
                      <Link to="/shop?category=pantalones">Pantalones</Link>
                      <Link to="/shop?category=vaqueros">Vaqueros</Link>
                      <Link to="/shop?category=beachwear">Beachwear</Link>
                      <Link to="/shop?category=todo-ropa">Toda la Ropa</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>ZAPATOS</h3>
                      <Link to="/shop?category=sandalias">Sandalias de Tacón</Link>
                      <Link to="/shop?category=zapatos-planos">Zapatos Planos</Link>
                      <Link to="/shop?category=mocasines">Mocasines</Link>
                      <Link to="/shop?category=botas">Botas</Link>
                      <Link to="/shop?category=sandalias-planas">Sandalias</Link>
                      <Link to="/shop?category=todo-zapatos">Todos los Zapatos</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>ACCESORIOS</h3>
                      <Link to="/shop?category=gafas">Gafas</Link>
                      <Link to="/shop?category=pequena-marroquineria">Pequeña Marroquinería</Link>
                      <Link to="/shop?category=creacion-joyas">Creación de Joyas</Link>
                      <Link to="/shop?category=bufandas">Bufandas</Link>
                      <Link to="/shop?category=sombreros">Sombreros</Link>
                      <Link to="/shop?category=cinturones">Cinturones</Link>
                      <Link to="/shop?category=otras-accesorios">Otras Accesorios</Link>
                      <Link to="/shop?category=todo-accesorios">Todos los Accesorios</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>NOVEDADES</h3>
                      <Link to="/shop?category=guia-estilo">GUÍA DE ESTILO</Link>
                      <Link to="/shop?category=tennis-sets">TENNIS SETS</Link>
                      <Link to="/shop?category=nevermind-stories">NEVERMIND STORIES</Link>
                      <Link to="/shop?category=cachemire">CACHEMIRE</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>SERVICIOS EXCLUSIVOS</h3>
                      <Link to="/custom-orders">CASA CUCINELLI</Link>
                      <Link to="/shop?category=vicuna">VICUÑA</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>BOLSOS</h3>
                      <Link to="/shop?category=bolsos-pequenos">Bolsos pequeños y Carteras de Mano</Link>
                      <Link to="/shop?category=bandoleras">Bandoleras</Link>
                      <Link to="/shop?category=bolsos-mano">Bolsos de Mano y Shopper</Link>
                      <Link to="/shop?category=todo-bolsos">Todos los Bolsos</Link>
                    </div>
                    <div className={styles.dropdownImages}>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'hombre' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('hombre')}
              onClick={() => handleDropdownClick('hombre')}
            >
              <Link 
                to="/shop?category=hombre" 
                className={`${styles.navLink} ${isActive('/custom-orders') ? styles.active : ''}`}
              >
                SUDADERAS
              </Link>
              {(activeDropdown === 'hombre' || pinnedDropdown === 'hombre') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('hombre')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>ROPA</h3>
                      <Link to="/shop?category=abrigos-hombre">Abrigos y Chaquetas</Link>
                      <Link to="/shop?category=prendas-punto-hombre">Prendas de Punto</Link>
                      <Link to="/shop?category=trajes-hombre">Trajes y Blazers</Link>
                      <Link to="/shop?category=camisas-hombre">Camisas</Link>
                      <Link to="/shop?category=camisetas-hombre">Camisetas y Polos</Link>
                      <Link to="/shop?category=pantalones-hombre">Pantalones</Link>
                      <Link to="/shop?category=vaqueros-hombre">Vaqueros</Link>
                      <Link to="/shop?category=beachwear-hombre">Beachwear</Link>
                      <Link to="/shop?category=todo-ropa-hombre">Toda la Ropa</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>ZAPATOS</h3>
                      <Link to="/shop?category=zapatos-vestir">Zapatos de Vestir</Link>
                      <Link to="/shop?category=mocasines-hombre">Mocasines</Link>
                      <Link to="/shop?category=sneakers">Sneakers</Link>
                      <Link to="/shop?category=botas-hombre">Botas</Link>
                      <Link to="/shop?category=sandalias-hombre">Sandalias</Link>
                      <Link to="/shop?category=todo-zapatos-hombre">Todos los Zapatos</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>ACCESORIOS</h3>
                      <Link to="/shop?category=gafas-hombre">Gafas</Link>
                      <Link to="/shop?category=pequena-marroquineria-hombre">Pequeña Marroquinería</Link>
                      <Link to="/shop?category=relojes">Relojes</Link>
                      <Link to="/shop?category=bufandas-hombre">Bufandas</Link>
                      <Link to="/shop?category=sombreros-hombre">Sombreros</Link>
                      <Link to="/shop?category=cinturones-hombre">Cinturones</Link>
                      <Link to="/shop?category=otras-accesorios-hombre">Otras Accesorios</Link>
                      <Link to="/shop?category=todo-accesorios-hombre">Todos los Accesorios</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>NOVEDADES</h3>
                      <Link to="/shop?category=guia-estilo-hombre">GUÍA DE ESTILO</Link>
                      <Link to="/shop?category=tennis-sets-hombre">TENNIS & GOLF SETS</Link>
                      <Link to="/shop?category=nevermind-stories-hombre">NEVERMIND STORIES</Link>
                      <Link to="/shop?category=cachemire-hombre">CACHEMIRE</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>SERVICIOS EXCLUSIVOS</h3>
                      <Link to="/custom-orders">SARTORIA SOLOMEO</Link>
                      <Link to="/custom-orders">CASA CUCINELLI</Link>
                      <Link to="/shop?category=vicuna-hombre">VICUÑA</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>BOLSOS</h3>
                      <Link to="/shop?category=bolsos-duo">BC Duo</Link>
                      <Link to="/shop?category=bolsos-pequenos-hombre">Bolsos pequeños y Carteras de Mano</Link>
                      <Link to="/shop?category=bandoleras-hombre">Bandoleras</Link>
                      <Link to="/shop?category=bolsos-mano-hombre">Bolsos de Mano y Shopper</Link>
                      <Link to="/shop?category=todo-bolsos-hombre">Todos los Bolsos</Link>
                    </div>
                    <div className={styles.dropdownImages}>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'ninos' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('ninos')}
              onClick={() => handleDropdownClick('ninos')}
            >
              <Link 
                to="/shop?category=ninos" 
                className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
              >
                GORRAS
              </Link>
              {(activeDropdown === 'ninos' || pinnedDropdown === 'ninos') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('ninos')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>NIÑO (4-12 AÑOS)</h3>
                      <Link to="/shop?category=shop-by-look-nino">Shop by Look</Link>
                      <Link to="/shop?category=prendas-punto-nino">Prendas de Punto</Link>
                      <Link to="/shop?category=abrigos-chaquetas-nino">Abrigos y Chaquetas</Link>
                      <Link to="/shop?category=trajes-blazers-nino">Trajes y Blazers</Link>
                      <Link to="/shop?category=camisetas-polos-nino">Camisetas y Polos</Link>
                      <Link to="/shop?category=pantalones-nino">Pantalones</Link>
                      <Link to="/shop?category=traiswear-nino">Traiswear</Link>
                      <Link to="/shop?category=calzado-nino">Calzado</Link>
                      <Link to="/shop?category=accesorios-nino">Accesorios</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>NIÑA (4-12 AÑOS)</h3>
                      <Link to="/shop?category=shop-by-look-nina">Shop by Look</Link>
                      <Link to="/shop?category=prendas-punto-nina">Prendas de Punto</Link>
                      <Link to="/shop?category=abrigos-chaquetas-nina">Abrigos y Chaquetas</Link>
                      <Link to="/shop?category=vestidos-monos-nina">Vestidos y Monos</Link>
                      <Link to="/shop?category=camisetas-coordinated-nina">Camisetas Coordinadas</Link>
                      <Link to="/shop?category=camisetas-faldas-nina">Camisetas y Faldas</Link>
                      <Link to="/shop?category=pantalones-nina">Pantalones</Link>
                      <Link to="/shop?category=traiswear-nina">Traiswear</Link>
                      <Link to="/shop?category=calzado-nina">Calzado</Link>
                      <Link to="/shop?category=accesorios-nina">Accesorios</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>BEBÉ (0-36 MESES)</h3>
                      <Link to="/shop?category=ropa-bebe">Ropa</Link>
                      <Link to="/shop?category=bodys-pijamas-bebe">Bodys y Pijamas</Link>
                      <Link to="/shop?category=regalos-nacimiento">Regalos de Nacimiento</Link>
                      <Link to="/shop?category=pequenos-sueños">Pequeños Sueños</Link>
                      <Link to="/shop?category=accesorios-bebe">Accesorios</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>NOVEDADES</h3>
                      <Link to="/shop?category=tennis-sets-ninos">TENNIS SETS</Link>
                      <Link to="/shop?category=regalos-nina">REGALOS NIÑA</Link>
                      <Link to="/shop?category=regalos-nino">REGALOS NIÑO</Link>
                    </div>
                    <div className={styles.dropdownImages}>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre más</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`${styles.navItem} ${pinnedDropdown === 'regalos' ? styles.pinned : ''}`}
              onMouseEnter={() => handleDropdownEnter('regalos')}
              onClick={() => handleDropdownClick('regalos')}
            >
              <Link 
                to="/shop?category=regalos" 
                className={styles.navLink}
              >
                ACCESORIOS
              </Link>
              {(activeDropdown === 'regalos' || pinnedDropdown === 'regalos') && (
                <div 
                  className={styles.dropdown}
                  onMouseEnter={() => handleDropdownEnter('regalos')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownSection}>
                      <h3>REGALOS MUJER</h3>
                      <Link to="/shop?category=regalos-mujer">Descubre la Selección</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>REGALOS HOMBRE</h3>
                      <Link to="/shop?category=regalos-hombre">Descubre la Selección</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>REGALOS NIÑA</h3>
                      <Link to="/shop?category=regalos-nina">Descubre la Selección</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>REGALOS NIÑO</h3>
                      <Link to="/shop?category=regalos-nino">Descubre la Selección</Link>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h3>REGALOS LIFESTYLE</h3>
                      <Link to="/shop?category=regalos-lifestyle">Descubre la Selección</Link>
                    </div>
                    <div className={styles.dropdownImages}>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre la Selección</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre la Selección</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre la Selección</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre la Selección</p>
                      </div>
                      <div className={styles.dropdownImage}>
                        <img src={heroImage} alt="Descubre más" />
                        <p>Descubre la Selección</p>
                      </div>
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
