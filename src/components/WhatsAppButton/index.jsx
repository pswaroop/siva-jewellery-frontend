import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaWhatsapp, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';

const WhatsAppButton = ({ 
  phoneNumber = '918977173601', 
  message = `Hello!

I'm interested in your jewelry collection and would like some assistance. Could you please help me with:

• Product recommendations based on my preferences
• Pricing information
• Availability of specific items
• Custom design options

Please let me know the best time to connect. Thank you!`,
  cartItems = [],
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  appliedPromo,
  onApplyPromo,
  onRemovePromo
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

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
      // If cart is empty, send a general inquiry message
      const generalMessage = `Hello!

I'm interested in your jewelry collection and would like some assistance. Could you please help me with:

• Product recommendations based on my preferences
• Pricing information
• Availability of specific items
• Custom design options

Please let me know the best time to connect. Thank you!`;
      
      const encodedMessage = encodeURIComponent(generalMessage);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      return;
    }
    
    // Format cart items for WhatsApp message
    let cartMessage = 'Hello! I would like to order the following items:\n\n';
    
    cartItems.forEach((item, index) => {
      // FIXED: Use item.size with proper fallback (same as Navbar cart)
      const displaySize = item.size && item.size.trim() !== '' && item.size !== 'One Size'
        ? item.size
        : 'Standard Size';
      
      cartMessage += `${index + 1}. ${item.name}\n`;
      cartMessage += `   Size: ${displaySize}\n`;
      cartMessage += `   Quantity: ${item.quantity}\n\n`;
      //Add product ID if available
      if (item.product_id) {
        cartMessage += `   Product ID: ${item.product_id}\n`;
      }
    });
    
    cartMessage += `━━━━━━━━━━━━━━━━━\n`;
    cartMessage += `Total Items: ${totalItems}\n\n`;
    cartMessage += `Please confirm availability and provide payment details.\n`;
    cartMessage += `Thank you!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(cartMessage);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Cart Summary Panel */}
      {isOpen && cartItems.length > 0 && (
        <div className="bg-white rounded-lg shadow-xl p-4 mb-4 flex flex-col space-y-3 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-800 font-semibold text-lg">
              Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 transition-colors p-1 -mr-1"
              aria-label="Close cart"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="space-y-3">
            {cartItems.map((item) => {
              // FIXED: Display size with proper fallback (same as Navbar)
              const displaySize = item.size && item.size.trim() !== '' && item.size !== 'One Size'
                ? item.size
                : 'Standard Size';
              
              return (
                <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div className="flex-1 pr-2">
                    <h4 className="text-gray-800 font-medium text-sm mb-1">{item.name}</h4>
                    {/* FIXED: Show size instead of price */}
                    <p className="text-amber-600 font-semibold text-sm">
                      {displaySize}
                    </p>
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
          
          {/* Send Button */}
          <div className="pt-3 border-t border-gray-200">
            <button
              onClick={handleSendToWhatsApp}
              className="w-full flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              Send Order via WhatsApp
            </button>
          </div>
        </div>
      )}
      
      {/* Main WhatsApp Button */}
      <button
        onClick={() => {
          // If cart has items, toggle the panel. Otherwise, send general inquiry
          if (cartItems.length > 0) {
            setIsOpen(!isOpen);
          } else {
            handleSendToWhatsApp();
          }
        }}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 relative"
        aria-label={cartItems.length > 0 ? (isOpen ? 'Close cart' : 'Open cart') : 'Contact us on WhatsApp'}
      >
        <FaWhatsapp className="w-9 h-9" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

WhatsAppButton.propTypes = {
  phoneNumber: PropTypes.string,
  message: PropTypes.string,
  cartItems: PropTypes.array,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onRemoveItem: PropTypes.func,
  appliedPromo: PropTypes.object,
  onApplyPromo: PropTypes.func,
  onRemovePromo: PropTypes.func
};

export default WhatsAppButton;
