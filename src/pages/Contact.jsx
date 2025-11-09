import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const phoneNumber = '918977173601'
    const message = `*New Contact Form Submission*%0A%0A` +
                   `*Name:* ${formData.name}%0A` +
                   `*Email:* ${formData.email}%0A` +
                   `*Message:*%0A${formData.message}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Contact us for inquiries, custom orders, or to schedule a consultation.
          </p>
        </div>
      </section>


      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Contact Form */}
                <div className="md:w-2/3 p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                    <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
                    <p className="text-gray-600 mt-4">
                      Have questions about our jewelry collection or custom designs? Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Tell us about your jewelry needs..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                      >
                        <span>Send Message</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Contact Information */}
                <div className="md:w-1/3 bg-gradient-to-b from-amber-600 to-amber-700 p-8 text-white md:flex md:flex-col md:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <p className="mb-6 text-amber-100">
                      We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Visit Our Store</h4>
                          <p className="text-amber-100 text-sm">123 Jewelry Street, Bangalore, Karnataka 560001</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaPhoneAlt className="mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Call Us</h4>
                          <a href="tel:+918977173601" className="text-amber-100 hover:text-white text-sm block">+91 8977173601</a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaEnvelope className="mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Email Us</h4>
                          <a href="mailto:info@shivajewellery.com" className="text-amber-100 hover:text-white text-sm block">info@shivajewellery.com</a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaClock className="mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Working Hours</h4>
                          <p className="text-amber-100 text-sm">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                          <p className="text-amber-100 text-sm">Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-amber-500">
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="text-white hover:text-amber-200 transition-colors duration-200">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-amber-200 transition-colors duration-200">
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-amber-200 transition-colors duration-200">
                        <span className="sr-only">WhatsApp</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.498 14.382v-.002c-.301-.733-1.506-1.363-1.96-1.436a.493.493 0 00-.54.21c-.146.22-.562.77-.69.933-.128.164-.254.18-.473.105-.22-.073-1.04-.2-1.98-1.19-.73-.845-1.194-1.846-1.333-2.156-.14-.31-.016-.48.105-.618.105-.128.21-.3.315-.472.105-.164.14-.28.21-.47.07-.19.035-.358-.018-.5-.053-.146-.468-1.23-.64-1.686-.17-.45-.35-.39-.468-.4h-.4a.9.9 0 00-.655.3c-.22.24-.84.82-.84 2.002 0 1.18.862 2.315.98 2.473.12.16 1.7 2.6 4.12 3.63 2.42 1.03 2.42.685 2.855.64.434-.04 1.4-.57 1.6-1.125.2-.56.2-1.04.14-1.13-.06-.09-.225-.14-.47-.25z" />
                          <path d="M12 22.75c-5.935 0-10.75-4.815-10.75-10.75S6.065 1.25 12 1.25 22.75 6.065 22.75 12c0 2.92-1.12 5.67-3.16 7.75-.06.06-.18.13-.3.2-.12.07-.31.1-.45.1-.15 0-.3-.04-.44-.13l-2.5-1.65c-1.25.5-2.6.8-4.03.8zm-9.5-10.75c0 5.26 4.29 9.5 9.5 9.5 1.29 0 2.55-.26 3.72-.76l2.2 1.45c.1.07.24.1.37.1.1 0 .17-.02.23-.05.06-.04.14-.09.18-.15 1.73-2.1 2.6-4.7 2.6-7.6 0-5.26-4.29-9.5-9.5-9.5-5.26 0-9.5 4.24-9.5 9.5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.004521144897!2d77.59441431482192!3d12.97196299085665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf5dfd3b8b9a0b9d5!2sBangalore%2C%20Karnataka%20560001!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Our Location on Map"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
