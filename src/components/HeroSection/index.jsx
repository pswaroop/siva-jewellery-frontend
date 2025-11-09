import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowRight, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // High-quality jewelry images with optimized formats
  const hero1 = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85';
  const hero2 = 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85';
  const hero3 = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85';
  
  const slides = [
    {
      image: hero1,
      title: '',
      subtitle: '',
      cta: 'Explore Collection',
      highlight: '',
      buttonVariant: 'primary',
      overlay: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
    },
    {
      image: hero2,
      title: '',
      subtitle: '',
      cta: 'View Diamonds',
      highlight: '',
      buttonVariant: 'secondary',
      overlay: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    },
    {
      image: hero3,
      title: '',
      subtitle: '',
      cta: 'Explore Categories',
      highlight: '',
      buttonVariant: 'primary',
      overlay: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Auto-sliding functionality with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Preload images to prevent white flash
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3, duration: 0.6 }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
        <motion.div
          key={currentSlide}
          className="absolute inset-0 w-full h-full bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
          initial="hidden"
          animate="visible"
          variants={slideVariants}
        >
          {/* Overlay with gradient */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ background: slides[currentSlide].overlay }}
          />
          
          {/* Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-end justify-center h-full pb-16">
            <motion.div 
              className="max-w-2xl text-white text-center w-full"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="inline-block bg-white/20 backdrop-blur-sm text-sm px-4 py-1.5 rounded-full mb-6 font-medium tracking-wider">
                {slides[currentSlide].highlight}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-lg leading-relaxed text-gray-100">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  onClick={() => navigate('/collections')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-4 rounded-full font-medium transition-all duration-300 text-sm tracking-wider uppercase flex items-center justify-center ${
                    slides[currentSlide].buttonVariant === 'primary' 
                      ? 'bg-white text-gray-900 hover:bg-opacity-90 shadow-lg' 
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {slides[currentSlide].cta}
                  <FaArrowRight className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

      {/* Navigation Arrows */}
      <motion.div 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0.7,
          x: isHovered ? 0 : -10 
        }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={prevSlide}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 shadow-lg"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
      </motion.div>
      
      <motion.div 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0.7,
          x: isHovered ? 0 : 10 
        }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={nextSlide}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 shadow-lg"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Slide Indicators */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: 0.8,
            duration: 0.6 
          }
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;