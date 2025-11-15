import React from 'react';
import { motion } from 'framer-motion';
import { FaGem, FaAward, FaHeart, FaUsers, FaShieldAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const About = () => {
  const values = [
    {
      icon: <FaGem className="w-8 h-8" />,
      title: 'Premium Quality',
      description: '100% certified quality with only BIS Hallmarked Jewellery'
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: 'Expert Craftsmanship',
      description: 'Decades of experience and traditional techniques passed down through generations.'
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: 'Ethical Sourcing',
      description: 'Responsibly sourced materials ensuring sustainability and fair trade practices.'
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Exceptional service and personalized attention for every customer.'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Lifetime Guarantee',
      description: 'We stand behind our work with comprehensive warranties and support.'
    },
    {
      icon: <FaStar className="w-8 h-8" />,
      title: 'Timeless Design',
      description: 'Creating pieces that transcend trends and remain beautiful for generations.'
    }
  ];

  const stats = [
    { number: '10+', label: 'Years of Excellence' },
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Unique Designs' },
    { number: '100%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 md:py-28 bg-gradient-to-br from-amber-50 via-white to-amber-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Crafting <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Timeless Elegance</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Welcome to Venkata Samba Siva Jewellery, where tradition meets innovation. For over more than 10 years, we have been crafting exquisite jewelry pieces that celebrate life's most precious moments.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                Our <span className="text-amber-600">Story</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-12 rounded-full"></div>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg text-justify">
                  Venkata Samba Siva Jewellerys & Diamonds – A name synonymous with trust, purity, and timeless beauty since 2013

                </p>
                <p className="text-lg text-justify">
                  With over 12 years of excellence, we’ve been committed to delivering jewellery that reflects tradition, craftsmanship, and authenticity. We exclusively offer BIS Hallmarked jewellery, ensuring the highest standards of purity and quality.
                </p>
                <p className="text-lg text-justify">
                  We specialize in custom-made jewellery, crafted to suit your unique taste and style. From timeless Bengali work and plain harams to elegant casting necklaces, vaddanams, vankis, pachi work harams, chandbalis, jumkis, and lockets — every piece is a work of art. Our extensive collection also includes bridal sets, antique items, rings, bangles, bracelets, kadiyams, and dazzling diamond jewellery.
                </p>
                <p className="text-lg text-justify">
                  Every ornament tells a story — of culture, celebration, and elegance.
Your search for excellence ends here. Looking for silver? We also offer a beautiful selection of silver articles for both traditional and modern needs.
                </p>
                <p className="text-lg text-center">
                  Why Choose Us?<br/><br/>
                      💎 100% Certified Quality<br/>
                      🔖 Only BIS Hallmarked Jewellery<br/>
                      🔒 Trusted by Generations<br/>
                      🌟 Unmatched Craftsmanship
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-amber-600">Values</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-amber-200"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Visit Our Showroom
            </h2>
            <p className="text-lg text-amber-50 mb-8 leading-relaxed">
              Experience our collections in person and let our experts help you find the perfect piece. We're here to make your jewelry dreams come true.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-300 shadow-lg">
                Book Appointment
              </a>
             
              <a href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300">
    Contact Us
</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
