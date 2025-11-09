import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.jpg'; // Import the logo image

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { 
      title: 'Shop', 
      items: ['New Arrivals', 'Best Sellers', 'Rings', 'Necklaces', 'Earrings', 'Watches'] 
    },
    { 
      title: 'Customer Service', 
      items: ['Contact Us', 'FAQs', 'Shipping & Returns', 'Size Guide', 'Payment Methods', 'Track Order'] 
    },
    { 
      title: 'About Us', 
      items: ['Our Story', 'Sustainability', 'Careers', 'Press', 'Blog', 'Privacy Policy'] 
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook className="w-4 h-4" />, url: "#" },
    { icon: <FaTwitter className="w-4 h-4" />, url: "#" },
    { icon: <FaInstagram className="w-4 h-4" />, url: "https://www.instagram.com/siva_jewellerys?igsh=anJkc2UyNno2bTQx&utm_source=qr" },
    { icon: <FaPinterest className="w-4 h-4" />, url: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-wrap items-start justify-between gap-8 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Logo and Description */}
          <motion.div className="w-full sm:w-auto" variants={itemVariants}>
            <img src={logo} alt="Siva Jewellery Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              Timeless elegance in every piece. Crafting beautiful jewelry since 1995.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.url} 
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-gray-300 hover:bg-amber-600 hover:text-white transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  aria-label={`Follow us on ${social.icon.type.name.replace('Fa', '')}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Single Row */}
          <motion.div className="flex flex-wrap gap-8" variants={itemVariants}>
            {links.map((section, sectionIndex) => (
              <div key={sectionIndex} className="min-w-[140px]">
                <h3 className="text-sm font-semibold text-white mb-3 pb-1 border-b border-amber-600">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="text-xs"
                    >
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Contact Info - Compact */}
          <motion.div variants={itemVariants} className="min-w-[250px]">
            <h3 className="text-sm font-semibold text-white mb-3 pb-1 border-b border-amber-600">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-amber-400 text-sm mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-400">Shivdu Bomma center, Narasaraopet, Palnadu District</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-amber-400 text-sm mr-3" />
                <a 
                  href="tel:+918977173601" 
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  +91 89771 73601
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-amber-400 text-sm mr-3" />
                <a 
                  href="mailto:info@sivajewellery.com" 
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  info@sivajewellery.com
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar - Single Line */}
        <motion.div 
          className="border-t border-gray-800 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            &copy; {currentYear} Siva Jewellery. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-200">
              Terms of Service
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-200">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;