import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaMinus, FaPlus, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.jpg'; // Import the logo image

const Navbar = ({ cartItems = [], onIncreaseQuantity, onDecreaseQuantity, appliedPromo, onApplyPromo, onRemovePromo }) => {
  const navigate = useNavigate();
  
  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate discount
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      discount = (subtotal * appliedPromo.discount) / 100;
    } else if (appliedPromo.type === 'fixed') {
      discount = appliedPromo.discount;
    }
  }
  
  // Calculate total price after discount
  const totalPrice = Math.max(0, subtotal - discount);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle remove promo
  const handleRemovePromo = () => {
    onRemovePromo();
  };

  // Handle send to WhatsApp - FIXED
  const handleSendToWhatsApp = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to cart first.');
      return;
    }
    
    // Format cart items for WhatsApp message
    let cartMessage = 'Hello! I would like to order the following items:\n\n';
    
    cartItems.forEach((item, index) => {
      // FIXED: Use item.size instead of item.grams with proper fallback
      const displaySize = item.size && item.size.trim() !== '' && item.size !== 'One Size' 
        ? item.size 
        : 'Standard';
      
      cartMessage += `${index + 1}. ${item.name}\n`;
      cartMessage += `   Size: ${displaySize}\n`;
      cartMessage += `   Quantity: ${item.quantity}\n`;
      
      //Add product ID if available
      if (item.product_id) {
        cartMessage += `   Product ID: ${item.product_id}\n`;
      }
      
      cartMessage += `\n`;
    });
    
    cartMessage += `━━━━━━━━━━━━━━━━━\n`;
    cartMessage += `Total Items: ${totalItems}\n\n`;
    cartMessage += `Please confirm availability and provide price details.\n`;
    cartMessage += `Thank you!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(cartMessage);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/918977173601?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Close cart panel
    setIsCartOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-amber-800">
              <img src={logo} alt="Siva Jewellery Logo" className="h-16 w-auto" />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium transition-colors">
                Home
              </Link>
              <Link to="/collections" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium transition-colors">
                Collections
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-700 hover:text-amber-600 relative transition-colors"
              onClick={() => setIsCartOpen(!isCartOpen)}
              aria-label="Open cart"
            >
              <FaShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/collections" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
      
      {/* Cart Panel - FIXED */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Cart Dropdown */}
          <div className="absolute right-4 top-16 bg-white rounded-lg shadow-xl p-4 w-80 z-50 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-800 font-semibold text-lg">
                Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Close cart"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <FaShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/collections');
                  }}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Browse Collections
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    // FIXED: Use item.size instead of item.grams
                    const displaySize = item.size && item.size.trim() !== '' && item.size !== 'One Size'
                      ? item.size
                      : 'Standard Size';
                    
                    return (
                      <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="flex-1 pr-2">
                          <h4 className="text-gray-800 font-medium text-sm mb-1">{item.name}</h4>
                          {/* FIXED: Changed from item.grams to item.size */}
                          <p className="text-amber-600 font-semibold text-sm">
                            {displaySize}
                          </p>
                          {/* Show product ID if available */}
                          {item.product_id && (
                            <p className="text-gray-500 text-xs mt-1">
                              ID: {item.product_id}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => onDecreaseQuantity && onDecreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-amber-600 hover:bg-amber-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onIncreaseQuantity && onIncreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-amber-600 hover:bg-amber-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* WhatsApp Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FaWhatsapp className="w-5 h-5 mr-2" />
                    Send Order via WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  cartItems: PropTypes.array,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  appliedPromo: PropTypes.object,
  onApplyPromo: PropTypes.func,
  onRemovePromo: PropTypes.func
};

export default Navbar;
