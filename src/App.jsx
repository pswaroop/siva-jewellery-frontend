import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Collections from './pages/Collections';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [goldRate, setGoldRate] = useState(5500); // Default gold rate in INR per gram

  // Simulate fetching gold rate from admin panel
  useEffect(() => {
    // In a real application, this would be an API call to fetch the latest gold rate
    // For now, we'll simulate periodic updates
    const interval = setInterval(() => {
      // Simulate small fluctuations in gold rate
      const fluctuation = Math.random() * 20 - 10; // -10 to +10
      setGoldRate(prevRate => Math.max(5000, prevRate + fluctuation));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to update gold rate (would be called from admin panel)
  const updateGoldRate = (newRate) => {
    setGoldRate(newRate);
  };

  // Define available promo codes
  const promoCodes = {
    'WELCOME10': { discount: 10, type: 'percentage', description: '10% off on your order' },
    'SAVE500': { discount: 500, type: 'fixed', description: '₹500 off on your order' },
    'FESTIVE20': { discount: 20, type: 'percentage', description: '20% off festive special' },
    'GOLD15': { discount: 15, type: 'percentage', description: '15% off on gold jewelry' },
    'FIRST25': { discount: 25, type: 'percentage', description: '25% off for first-time buyers' }
  };

  // Function to validate and apply promo code
  const applyPromoCode = (code) => {
    const upperCode = code.toUpperCase().trim();
    if (promoCodes[upperCode]) {
      setAppliedPromo({ code: upperCode, ...promoCodes[upperCode] });
      return { success: true, message: `Promo code "${upperCode}" applied successfully!` };
    }
    return { success: false, message: 'Invalid promo code' };
  };

  // Function to remove promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Function to update cart items - will be passed to components that need it
  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    ));
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // If quantity is 1, remove item from cart
          return null;
        }
      }
      return item;
    }).filter(Boolean)); // Remove null items
  };

  // Handle remove item
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar 
        cartItems={cartItems} 
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        appliedPromo={appliedPromo}
        onApplyPromo={applyPromoCode}
        onRemovePromo={removePromoCode}
      />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home updateCartItems={updateCartItems} cartItems={cartItems} goldRate={goldRate} />} />
          <Route path="/home" element={<Home updateCartItems={updateCartItems} cartItems={cartItems} goldRate={goldRate} />} />
          <Route path="/collections" element={<Collections updateCartItems={updateCartItems} cartItems={cartItems} goldRate={goldRate} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton 
        phoneNumber="918977173601"
        message="Hello! I'm interested in your jewelry collection."
        cartItems={cartItems}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onRemoveItem={handleRemoveItem}
        appliedPromo={appliedPromo}
        onApplyPromo={applyPromoCode}
        onRemovePromo={removePromoCode}
      />
    </div>
  );
}

export default App;