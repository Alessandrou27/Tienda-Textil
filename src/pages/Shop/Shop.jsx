import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Shop.module.css';

// Mock data for products
const products = [
  {
    id: 1,
    name: 'Camisa de Lino Premium',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 24,
    category: 'ropa',
    tags: ['lino', 'premium', 'casual']
  },
  {
    id: 2,
    name: 'Vestido Bordado Artesanal',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    rating: 4.9,
    reviews: 18,
    category: 'ropa',
    tags: ['bordado', 'artesanal', 'elegante']
  },
  {
    id: 3,
    name: 'Chal de Seda Natural',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1601925260369-0a0b4b5a0b4b?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 31,
    category: 'accesorios',
    tags: ['seda', 'natural', 'accesorio']
  },
  {
    id: 4,
    name: 'Pantalón de Algodón Orgánico',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
    rating: 4.6,
    reviews: 22,
    category: 'ropa',
    tags: ['algodón', 'orgánico', 'sostenible']
  },
  {
    id: 5,
    name: 'Bufanda de Lana Merino',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1601925260369-0a0b4b5a0b4b?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 15,
    category: 'accesorios',
    tags: ['lana', 'merino', 'invierno']
  },
  {
    id: 6,
    name: 'Blusa de Encaje Vintage',
    price: 95.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    rating: 4.9,
    reviews: 28,
    category: 'ropa',
    tags: ['encaje', 'vintage', 'femenino']
  }
];

const categories = [
  { value: 'all', label: 'Todos los productos' },
  { value: 'ropa', label: 'Ropa' },
  { value: 'accesorios', label: 'Accesorios' }
];

const priceRanges = [
  { value: 'all', label: 'Todos los precios' },
  { value: '0-50', label: 'Menos de $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-150', label: '$100 - $150' },
  { value: '150+', label: 'Más de $150' }
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesPrice = (() => {
        if (selectedPriceRange === 'all') return true;
        const [min, max] = selectedPriceRange.split('-').map(Number);
        if (selectedPriceRange === '150+') return product.price >= 150;
        return product.price >= min && product.price <= max;
      })();
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSortBy('name');
  };

  return (
    <div className={styles.shop}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Tienda</h1>
          <p className={styles.subtitle}>
            Descubre nuestra colección de textiles de alta calidad
          </p>
        </div>

        {/* Search and Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInput}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.input}
              />
            </div>
            <button 
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={20} />
              Filtros
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className={styles.filtersPanel}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Categoría</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.select}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Rango de Precio</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className={styles.select}
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.select}
                >
                  <option value="name">Nombre</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Valorados</option>
                </select>
              </div>

              <button className={styles.clearFilters} onClick={clearFilters}>
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className={styles.resultsHeader}>
          <div className={styles.resultsInfo}>
            <span className={styles.resultsCount}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className={styles.viewControls}>
            <button
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`${styles.productsContainer} ${viewMode === 'list' ? styles.listView : ''}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No se encontraron productos que coincidan con tu búsqueda.</p>
              <button className={styles.clearSearch} onClick={clearFilters}>
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
