import React from 'react';
import { motion } from 'framer-motion';
import { FaGem, FaHandsHelping, FaShieldAlt } from 'react-icons/fa';
import HeroSection from '../../components/HeroSection';
import FeaturedCollections from '../../components/FeaturedCollections';

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

const Home = ({ updateCartItems, cartItems, goldRate }) => {
  return (
    <>
      <HeroSection goldRate={goldRate} />
      <FeaturedCollections showOnlyFeatured={true} updateCartItems={updateCartItems} cartItems={cartItems} />
          {/* Why Choose Us Section */}
        <motion.section 
          className="relative py-16 md:py-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider shadow-md">
                Our Promise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Luxury Jewelry</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full mx-auto mb-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-amber-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-amber-200 transition-shadow duration-500">
                      <div className="text-white text-2xl">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-amber-600 font-medium text-sm mt-6 group-hover:text-amber-700 transition-colors duration-300">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
    </>
  );
};

export default Home;