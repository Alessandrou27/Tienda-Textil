import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Share2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './ProductDetail.module.css';

// Mock product data - in a real app, this would come from an API
const mockProduct = {
  id: 1,
  name: 'Camisa de Lino Premium',
  price: 89.99,
  originalPrice: 119.99,
  images: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop'
  ],
  rating: 4.8,
  reviews: 24,
  description: 'Una camisa de lino premium confeccionada con los más altos estándares de calidad. Perfecta para ocasiones especiales o uso diario elegante.',
  features: [
    '100% Lino natural',
    'Confección artesanal',
    'Corte clásico',
    'Lavable en máquina',
    'Planchado fácil'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Blanco', value: '#ffffff' },
    { name: 'Beige', value: '#f5f5dc' },
    { name: 'Azul Marino', value: '#000080' }
  ],
  inStock: true,
  stockCount: 15
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // In a real app, you would fetch the product by ID
  const product = mockProduct;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={20} className={styles.star} />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={20} className={`${styles.star} ${styles.halfStar}`} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={20} className={`${styles.star} ${styles.emptyStar}`} />);
    }

    return stars;
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/shop" className={styles.breadcrumbLink}>
            <ArrowLeft size={16} />
            Volver a la tienda
          </Link>
        </div>

        <div className={styles.content}>
          {/* Product Images */}
          <div className={styles.imagesSection}>
            <div className={styles.mainImage}>
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className={styles.productImage}
              />
            </div>
            <div className={styles.thumbnailImages}>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.infoSection}>
            <div className={styles.productHeader}>
              <h1 className={styles.productName}>{product.name}</h1>
              <div className={styles.productActions}>
                <button 
                  className={`${styles.actionButton} ${isWishlisted ? styles.active : ''}`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart size={20} />
                </button>
                <button className={styles.actionButton}>
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className={styles.rating}>
              <div className={styles.stars}>
                {renderStars(product.rating)}
              </div>
              <span className={styles.ratingText}>
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            <div className={styles.priceSection}>
              <div className={styles.currentPrice}>${product.price}</div>
              {product.originalPrice && (
                <div className={styles.originalPrice}>${product.originalPrice}</div>
              )}
              {product.originalPrice && (
                <div className={styles.discount}>
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className={styles.selectionGroup}>
              <label className={styles.selectionLabel}>Talla</label>
              <div className={styles.sizeOptions}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className={styles.selectionGroup}>
              <label className={styles.selectionLabel}>Color</label>
              <div className={styles.colorOptions}>
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`${styles.colorOption} ${selectedColor === color.name ? styles.selected : ''}`}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className={styles.selectionGroup}>
              <label className={styles.selectionLabel}>Cantidad</label>
              <div className={styles.quantitySelector}>
                <button 
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button 
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className={styles.addToCartSection}>
              <button 
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag size={20} />
                {product.inStock ? 'Agregar al Carrito' : 'Agotado'}
              </button>
            </div>

            {/* Stock Info */}
            <div className={styles.stockInfo}>
              {product.inStock ? (
                <span className={styles.inStock}>
                  ✓ En stock ({product.stockCount} disponibles)
                </span>
              ) : (
                <span className={styles.outOfStock}>✗ Agotado</span>
              )}
            </div>

            {/* Features */}
            <div className={styles.features}>
              <h3 className={styles.featuresTitle}>Características</h3>
              <ul className={styles.featuresList}>
                {product.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
