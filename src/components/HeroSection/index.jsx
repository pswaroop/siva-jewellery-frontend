import React, { useState, useEffect, useCallback } from "react";
import { FaArrowRight, FaChevronRight, FaChevronLeft, FaRupeeSign } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const HeroSection = ({ goldRate, silverRate, banners = [] }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // FIXED: Use Django MEDIA_URL properly
  const BACKEND_URL = "https://api.sivajewellerysanddiamonds.com/media/";

  // Fallback slides
  const fallbackSlides = [
    {
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1920&q=85",
      cta: "Explore Collection",
      buttonVariant: "primary",
      overlay: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)",
    },
    {
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1920&q=85",
      cta: "View Diamonds",
      buttonVariant: "secondary",
      overlay: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
    },
    {
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85",
      cta: "Explore Categories",
      buttonVariant: "primary",
      overlay: "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)",
    },
  ];

  // FIXED: Convert backend banners with proper image URLs
  const slides = banners.length > 0
    ? banners.map((banner) => {
        // Handle both absolute and relative image paths
        const imageUrl = banner.image.startsWith('http') 
          ? banner.image 
          : `${BACKEND_URL}${banner.image}`;
        
        return {
          image: imageUrl,
          cta: "Explore Collections",
          buttonVariant: "primary",
          overlay: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)",
        };
      })
    : fallbackSlides;

  // Debug log
  useEffect(() => {
    console.log('🎨 HeroSection received:', {
      goldRate,
      silverRate,
      banners,
      slides
    });
  }, [goldRate, silverRate, banners, slides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(nextSlide, 6000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, slides.length]);

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        key={currentSlide}
        className="absolute inset-0 w-full h-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
        }}
        initial="hidden"
        animate="visible"
        variants={slideVariants}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{ background: slides[currentSlide].overlay }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-end justify-center h-full pb-16">
          <motion.div
            className="max-w-2xl text-white text-center w-full"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate("/collections")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-full font-medium transition-all duration-300 text-sm tracking-wider uppercase flex items-center justify-center ${
                  slides[currentSlide].buttonVariant === "primary"
                    ? "bg-white text-gray-900 hover:bg-opacity-90 shadow-lg"
                    : "bg-amber-600 text-white hover:bg-amber-700"
                }`}
              >
                {slides[currentSlide].cta}
                <FaArrowRight className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* FIXED: Show rates only if they exist and are > 0 */}
        {(goldRate > 0 || silverRate > 0) && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-xl flex items-center z-20 shadow-lg space-x-6">
            {goldRate > 0 && (
              <div className="flex items-center">
                <span className="text-base font-semibold mr-2">24K Gold:</span>
                <FaRupeeSign className="text-amber-400 mr-1" />
                <span className="text-xl font-bold text-amber-400">
                  {Math.round(goldRate).toLocaleString("en-IN")}
                </span>
                <span className="text-sm ml-1">/g</span>
              </div>
            )}
            {silverRate > 0 && (
              <>
                {goldRate > 0 && <div className="h-6 w-px bg-white/30"></div>}
                <div className="flex items-center">
                  <span className="text-base font-semibold mr-2">Silver:</span>
                  <FaRupeeSign className="text-gray-200 mr-1" />
                  <span className="text-xl font-bold text-gray-200">
                    {Math.round(silverRate).toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm ml-1">/g</span>
                </div>
              </>
            )}
          </div>
        )}
      </motion.div>

      {slides.length > 1 && (
        <>
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              x: isHovered ? 0 : -10,
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
              x: isHovered ? 0 : 10,
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

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </>
      )}
    </section>
  );
};

HeroSection.propTypes = {
  goldRate: PropTypes.number,
  silverRate: PropTypes.number,
  banners: PropTypes.array,
};

HeroSection.defaultProps = {
  goldRate: 0,
  silverRate: 0,
  banners: [],
};

export default HeroSection;
