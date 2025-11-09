import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaMinus, FaPlus, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.jpg'; // Import the logo image

const Navbar = ({ cartItems = [], onIncreaseQuantity, onDecreaseQuantity, appliedPromo, onApplyPromo, onRemovePromo }) => {
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
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  // Handle apply promo code
  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setPromoMessage('Please enter a promo code');
      return;
    }
    
    const result = onApplyPromo(promoInput);
    setPromoMessage(result.message);
    
    if (result.success) {
      setPromoInput('');
      setTimeout(() => setPromoMessage(''), 3000);
    }
  };
  
  // Handle remove promo
  const handleRemovePromo = () => {
    onRemovePromo();
    setPromoInput('');
    setPromoMessage('');
  };

  // Handle send to WhatsApp
  const handleSendToWhatsApp = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to cart first.');
      return;
    }
    
    // Format cart items for WhatsApp message
    let cartMessage = 'Hello! I would like to order the following items:\n\n';
    
    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      cartMessage += `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${itemTotal.toLocaleString('en-IN')}\n`;
    });
    
    cartMessage += `\n━━━━━━━━━━━━━━━━━\n`;
    cartMessage += `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
    
    if (appliedPromo) {
      cartMessage += `Promo Code: ${appliedPromo.code}\n`;
      cartMessage += `Discount: -₹${discount.toLocaleString('en-IN')}\n`;
    }
    
    cartMessage += `Total: ₹${totalPrice.toLocaleString('en-IN')}\n`;
    cartMessage += `━━━━━━━━━━━━━━━━━\n\n`;
    cartMessage += `Please confirm availability and provide payment details.`;
    
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
              <Link to="/" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
                Home
              </Link>
              <Link to="/collections" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
                Collections
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              className="text-gray-700 hover:text-amber-600 relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <FaShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 4 ? '4+' : totalItems}
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
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/collections" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
      
      {/* Cart Panel */}
      {isCartOpen && totalItems > 0 && (
        <div className="absolute right-4 top-16 bg-white rounded-lg shadow-xl p-4 w-80 z-50 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-800 font-semibold text-lg">Your Cart ({totalItems} items)</h3>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div key={item.id} className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-medium text-sm">{item.name}</h4>
                    <p className="text-amber-600 font-semibold text-sm">₹{itemTotal.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onDecreaseQuantity && onDecreaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-amber-600 hover:bg-amber-50 font-bold text-lg"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onIncreaseQuantity && onIncreaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-amber-600 hover:bg-amber-50 font-bold text-lg"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Promo Code Section */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            {!appliedPromo ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Have a promo code?</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium text-sm transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`mt-2 text-xs ${promoMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-green-800">{appliedPromo.code}</p>
                    <p className="text-xs text-green-600">{appliedPromo.description}</p>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Total Section */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-2 mb-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-600">Discount:</span>
                  <span className="text-green-600">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-lg text-amber-700">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button
              onClick={handleSendToWhatsApp}
              className="w-full flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              Send Order via WhatsApp
            </button>
          </div>
        </div>
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