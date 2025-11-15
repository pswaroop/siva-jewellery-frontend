import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import axios from 'axios';

const FeaturedCollections = lazy(() => import('../../components/FeaturedCollections'));

const API_BASE_URL = 'https://api.sivajewellerysanddiamonds.com/api';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CollectionsPage = ({ updateCartItems, cartItems }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState(['All']);
  const [goldRate, setGoldRate] = useState(0);
  const [silverRate, setSilverRate] = useState(0);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const debouncedSearchTerm = useDebounce(inputValue, 400);

  // Fetch categories from Django API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/categories/`, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        });
        
        // Extract category names and add 'All' at the beginning
        const categoryNames = response.data.map(cat => cat.category);
        setCategories(['All', ...categoryNames]);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Keep default categories on error
        setCategories(['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles']);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch latest gold and silver prices from Django API
  useEffect(() => {
    const fetchPrices = async () => {
      setLoadingPrices(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/prices/latest/`, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        });
        
        if (response.data) {
          setGoldRate(parseFloat(response.data.gold_price) || 0);
          setSilverRate(parseFloat(response.data.silver_price) || 0);
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
        // Set default values on error
        setGoldRate(0);
        setSilverRate(0);
      } finally {
        setLoadingPrices(false);
      }
    };

    fetchPrices();
  }, []);

  // Initialize from URL on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || 'All';
    const searchFromUrl = searchParams.get('search') || '';
    
    setSelectedCategory(categoryFromUrl);
    setSearchTerm(searchFromUrl);
    setInputValue(searchFromUrl);
  }, []);

  // Update search term when debounced value changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchTerm]);

  const handleSearch = useCallback((e) => {
    e?.preventDefault();
    const trimmedValue = inputValue.trim();
    setSearchTerm(trimmedValue);
    
    const params = {};
    if (selectedCategory !== 'All') params.category = selectedCategory;
    if (trimmedValue) params.search = trimmedValue;
    setSearchParams(params);
  }, [inputValue, selectedCategory, setSearchParams]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleCategoryFilter = useCallback((category) => {
    setSelectedCategory(category);
    setInputValue('');
    setSearchTerm('');
    
    const params = {};
    if (category !== 'All') params.category = category;
    setSearchParams(params);
  }, [setSearchParams]);

  const handleWhatsAppConsultation = useCallback(() => {
    const phoneNumber = '918977173601';
    const message = `Hello!

I'm interested in your jewelry collections and would like to:
• Get more information about a specific piece
• Schedule a consultation
• Check availability and pricing

Please let me know the best time to connect. Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  }, []);

  const handleNavigateToContact = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  const LoadingFallback = useMemo(() => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>
  ), []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex" role="search">
              <div className="relative flex-grow">
                <input
                  type="search"
                  placeholder="Search collections..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 pl-12 text-gray-700 bg-gray-50 rounded-l-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all"
                  aria-label="Search collections"
                  autoComplete="off"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {inputValue !== debouncedSearchTerm && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
                  </div>
                )}
              </div>
              <button 
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-r-2xl font-semibold transition-colors duration-300 shadow-sm active:bg-amber-800"
                aria-label="Submit search"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Gold Rate Display */}
      {!loadingPrices && goldRate > 0 && (
        <section className="py-4 bg-amber-50 border-b border-amber-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-sm px-6 py-3 flex items-center border border-amber-200">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <span className="text-amber-800 font-medium mr-2">24K Gold:</span>
                    <span className="text-amber-600 font-bold text-lg flex items-center">
                      <FaRupeeSign className="text-base mr-1" aria-hidden="true" />
                      {Math.round(goldRate).toLocaleString('en-IN')}
                      <span className="text-sm ml-1">/g</span>
                    </span>
                  </div>
                  {silverRate > 0 && (
                    <>
                      <div className="h-8 w-px bg-gray-300" aria-hidden="true"></div>
                      <div className="flex items-center">
                        <span className="text-amber-800 font-medium mr-2">Silver:</span>
                        <span className="text-amber-600 font-bold text-lg flex items-center">
                          <FaRupeeSign className="text-base mr-1" aria-hidden="true" />
                          {Math.round(silverRate).toLocaleString('en-IN')}
                          <span className="text-sm ml-1">/g</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loadingCategories ? (
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              <div className="flex flex-nowrap gap-3 min-w-max justify-center mx-auto" role="tablist" aria-label="Product categories">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                        isActive
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Filter by ${category}`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={LoadingFallback}>
            <FeaturedCollections 
              updateCartItems={updateCartItems} 
              cartItems={cartItems} 
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              showOnlyFeatured={false}
            />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-lg text-amber-50 mb-8 leading-relaxed">
              Our expert consultants are here to guide you in selecting the perfect piece that matches your style and occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleWhatsAppConsultation}
                className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600"
                aria-label="Chat with us on WhatsApp"
              >
                Chat on WhatsApp
              </button>
              <button 
                onClick={handleNavigateToContact}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600"
                aria-label="Navigate to contact page"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

CollectionsPage.propTypes = {
  updateCartItems: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
};

export default CollectionsPage;
