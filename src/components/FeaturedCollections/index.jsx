import React from 'react';
import { FaGem, FaHandsHelping, FaShieldAlt, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedCollections = ({ 
  showOnlyFeatured = false, 
  updateCartItems, 
  cartItems = [],
  searchTerm = ''
}) => {
  const collections = [
    // Head & Hair Jewellery
    {
      id: 1,
      name: 'Diamond Tiara',
      count: '5 items',
      category: 'Head & Hair',
      price: 45999,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
      sizes: ['One Size']
    },
    {
      id: 2,
      name: 'Maang Tikka',
      count: '12 items',
      category: 'Head & Hair',
      price: 25999,
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
      sizes: ['One Size']
    },
    {
      id: 3,
      name: 'Hair Comb Set',
      count: '8 items',
      category: 'Head & Hair',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
      sizes: ['One Size']
    },
    
    // Earrings
    {
      id: 4,
      name: 'Diamond Stud Earrings',
      count: '15 items',
      category: 'Earrings',
      price: 18999,
      image: 'https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1129/1661258687_692158ae086ac8038896.png',
      sizes: ['One Size']
    },
    {
      id: 5,
      name: 'Gold Jhumkas',
      count: '10 items',
      category: 'Earrings',
      price: 22999,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
      sizes: ['One Size']
    },
    {
      id: 6,
      name: 'Hoop Earrings',
      count: '20 items',
      category: 'Earrings',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
      sizes: ['One Size']
    },
    
    // Neck & Chest Jewellery
    {
      id: 7,
      name: 'Pearl Necklace',
      count: '7 items',
      category: 'Necklace',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
      sizes: ['16 inches', '18 inches', '20 inches']
    },
    {
      id: 8,
      name: 'Mangalsutra',
      count: '14 items',
      category: 'Necklace',
      price: 28999,
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
      sizes: ['16 inches', '18 inches', '20 inches']
    },
    {
      id: 9,
      name: 'Choker Necklace',
      count: '9 items',
      category: 'Necklace',
      price: 15999,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
    },
    
    // Arm & Hand Jewellery
    // {
    //   id: 10,
    //   name: 'Gold Bangle Set',
    //   count: '6 items',
    //   category: 'Bracelets',
    //   price: 39999,
    //   image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fgirirajjewellers.co.in%2Fbangles-bracelets%2F22k-gold-bangles%2Ffairytale-wedding-gold-bangles%3Fsrsltid%3DAfmBOooMM-ekM_LXnMusg8uGjkjxG-LG0o-f7Frgbb_HvoJx_mbg3j0f&psig=AOvVaw2DzxHcNyXjRUDE4Mf0e_po&ust=1762715255153000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDN25eg45ADFQAAAAAdAAAAABAE',
    // },
    {
      id: 11,
      name: 'Silver Cuff Bracelet',
      count: '11 items',
      category: 'Bracelets',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
    },
    
    // Finger Jewellery
    {
      id: 12,
      name: 'Engagement Ring',
      count: '18 items',
      category: 'Rings',
      price: 49999,
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
    },
    {
      id: 13,
      name: 'Cocktail Rings',
      count: '22 items',
      category: 'Rings',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
    },
    
    // Feet Jewellery
    {
      id: 14,
      name: 'Anklet Collection',
      count: '13 items',
      category: 'Feet Jewellery',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
    },
    
    // Body & Waist Jewellery
    {
      id: 15,
      name: 'Waist Chain',
      count: '8 items',
      category: 'Body Jewellery',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
    },
    
    // Nose Jewellery
    // {
    //   id: 16,
    //   name: 'Nose Rings',
    //   count: '16 items',
    //   category: 'Nose Jewellery',
    //   price: 3999,
    //   image: 'https://images.unsplash.com/photo-1535632066927-ab6c9ed70e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
    // },
  ];

  // Filter collections based on showOnlyFeatured prop
  let displayedCollections = showOnlyFeatured ? collections.slice(0, 4) : collections;
  
  // Filter collections based on search term
  if (searchTerm) {
    displayedCollections = displayedCollections.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const features = [
    {
      title: 'Premium Quality',
      description: 'Only the finest materials and craftsmanship',
      icon: <FaGem className="w-8 h-8 text-amber-600" />,
    },
    {
      title: 'Expert Craftsmanship',
      description: 'Handcrafted by skilled artisans',
      icon: <FaHandsHelping className="w-8 h-8 text-amber-600" />,
    },
    {
      title: 'Secure Shopping',
      description: 'Safe and secure online transactions',
      icon: <FaShieldAlt className="w-8 h-8 text-amber-600" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Handle add to cart functionality
  const handleAddToCart = (item) => {
    // Check if item is already in cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    let newCartItems;
    if (existingItem) {
      // If item exists, update quantity
      newCartItems = cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      );
    } else {
      // If item doesn't exist, add to cart with quantity 1
      newCartItems = [...cartItems, { ...item, quantity: 1 }];
    }
    
    // Update cart items in parent component
    if (updateCartItems) {
      updateCartItems(newCartItems);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

        {/* Collections Grid */}
        {displayedCollections.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No items found matching &quot;{searchTerm}&quot;</h3>
            <p className="text-gray-500 mt-2">Try a different search term or browse our collections</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {displayedCollections.map((item) => (
              <motion.div 
                key={item.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-gray-100"
                variants={itemVariants}
              >
                <div className="relative h-56 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                  <div className="w-full h-full">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    {item.category}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">{item.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                      </svg>
                      {item.count}
                    </p>
                    <div className="text-lg font-bold text-amber-700">₹{item.price.toLocaleString('en-IN')}</div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Explore All Button */}
      {showOnlyFeatured && (
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

export default FeaturedCollections;