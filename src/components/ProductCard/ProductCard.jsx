import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className={styles.star} />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} className={`${styles.star} ${styles.halfStar}`} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className={`${styles.star} ${styles.emptyStar}`} />);
    }

    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name}
          className={styles.productImage}
        />
        <button 
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingBag size={20} />
        </button>
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        
        <div className={styles.rating}>
          <div className={styles.stars}>
            {renderStars(product.rating)}
          </div>
          <span className={styles.ratingText}>
            {product.rating} ({product.reviews} reseñas)
          </span>
        </div>
        
        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
