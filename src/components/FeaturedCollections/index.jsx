import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://api.sivajewellerysanddiamonds.com/api';

const FeaturedCollections = ({ 
  showOnlyFeatured = false, 
  updateCartItems, 
  cartItems = [],
  searchTerm = '',
  selectedCategory = 'All'
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch products from Django API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use latest_featured endpoint if showing only featured, otherwise get all
        const endpoint = showOnlyFeatured 
          ? `${API_BASE_URL}/products/latest_featured/`
          : `${API_BASE_URL}/products/`;
        
        const response = await axios.get(endpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        });
        
        // Transform Django API response to match component structure
        const transformedProducts = response.data.map(product => ({
          id: product.id,
          product_id: product.product_id,
          name: product.product_name,
          category: product.category_details?.category || 'Uncategorized',
          categorySlug: product.category_details?.slug || '',
          categoryId: product.category,
          size: product.size || 'One Size',
          image: product.image1,
          images: [
            product.image1,
            product.image2 || product.image1
          ].filter(Boolean),
          sizes: product.size ? [product.size] : ['One Size'],
          created_at: product.created_at
        }));
        
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [showOnlyFeatured]); // Re-fetch when showOnlyFeatured changes
  
  // Auto-slide images every 3 seconds
  useEffect(() => {
    if (products.length === 0) return;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => {
          const updated = { ...prev };
          products.forEach(item => {
            if (item.images && item.images.length > 1) {
              const currentIndex = prev[item.id] || 0;
              updated[item.id] = (currentIndex >= item.images.length - 1) ? 0 : currentIndex + 1;
            }
          });
          return updated;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [products]);

  // Filter products based on category and search term
  const filteredCollections = useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm && searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item => {
        const nameLower = item.name.toLowerCase();
        const categoryLower = item.category.toLowerCase();
        const productIdLower = item.product_id.toLowerCase();
        return nameLower.includes(searchLower) || 
               categoryLower.includes(searchLower) || 
               productIdLower.includes(searchLower);
      });
    }
    
    // If showOnlyFeatured and we got all products, limit to 4
    if (showOnlyFeatured && filtered.length > 4) {
      filtered = filtered.slice(0, 4);
    }
    
    return filtered;
  }, [products, selectedCategory, searchTerm, showOnlyFeatured]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }), []);

  // const handleAddToCart = useCallback((item) => {
  //   const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
  //   let newCartItems;
  //   if (existingItem) {
  //     newCartItems = cartItems.map(cartItem => 
  //       cartItem.id === item.id 
  //         ? { ...cartItem, quantity: cartItem.quantity + 1 } 
  //         : cartItem
  //     );
  //   } else {
  //     newCartItems = [...cartItems, { ...item, quantity: 1 }];
  //   }
    
  //   if (updateCartItems) {
  //     updateCartItems(newCartItems);
  //   }
  // }, [cartItems, updateCartItems]);
const handleAddToCart = useCallback((item) => {
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  
  // FIXED: Ensure size has a proper display value before adding to cart
  const itemWithSize = {
    ...item,
    size: item.size && item.size.trim() !== '' && item.size !== 'One Size' 
      ? item.size 
      : 'Standard Size' // Better than N/A
  };
  
  let newCartItems;
  if (existingItem) {
    newCartItems = cartItems.map(cartItem => 
      cartItem.id === item.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
        : cartItem
    );
  } else {
    newCartItems = [...cartItems, { ...itemWithSize, quantity: 1 }];
  }
  
  if (updateCartItems) {
    updateCartItems(newCartItems);
  }
}, [cartItems, updateCartItems]);

  const handleImageLoad = useCallback((itemId) => {
    setImagesLoaded(prev => ({ ...prev, [itemId]: true }));
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-red-600 mb-4">
              Error loading products: {error}
            </h3>
            <button 
              onClick={() => window.location.reload()}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Our Collections
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            {showOnlyFeatured ? 'Featured' : 'Our'} <span className="text-amber-600">Collections</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Discover our most exquisite jewelry pieces, handcrafted with precision and care.
          </p>
        </motion.div>

        {filteredCollections.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">
              No items found
              {selectedCategory && selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </h3>
          </div>
        ) : (
          <motion.div 
            key={`${selectedCategory}-${searchTerm}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCollections.map((item, index) => (
              <motion.div 
                key={item.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-gray-100"
                variants={itemVariants}
              >
                <div className="relative h-56 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-100">
                  {!imagesLoaded[item.id] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-pulse bg-gray-200 w-full h-full"></div>
                    </div>
                  )}
                  
                  <img 
                    src={item.images && item.images.length > 0 
                      ? item.images[currentImageIndex[item.id] || 0] 
                      : item.image} 
                    alt={item.name}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                      imagesLoaded[item.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    onLoad={() => handleImageLoad(item.id)}
                    width="400"
                    height="400"
                  />
                  
                  <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
                    {item.category}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors text-center">
                    {item.name}
                  </h3>
                  {/* <div className="text-center mb-2">
                    <div className="text-sm text-gray-500">ID: {item.product_id}</div>
                  </div> */}
                  {item.size && item.size !== 'One Size' && (
                    <div className="text-center mb-4">
                      <div className="text-sm font-medium text-amber-700">{item.size}</div>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="mt-auto w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {showOnlyFeatured && products.length > 4 && (
          <div className="text-center">
            <Link 
              to="/collections" 
              className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Explore All Collections
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

FeaturedCollections.propTypes = {
  showOnlyFeatured: PropTypes.bool,
  updateCartItems: PropTypes.func.isRequired,
  cartItems: PropTypes.array,
  searchTerm: PropTypes.string,
  selectedCategory: PropTypes.string,
};

FeaturedCollections.defaultProps = {
  showOnlyFeatured: false,
  cartItems: [],
  searchTerm: '',
  selectedCategory: 'All',
};

export default FeaturedCollections;
