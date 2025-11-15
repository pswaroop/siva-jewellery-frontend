import React from 'react';
import { FaGem, FaHandsHelping, FaShieldAlt } from 'react-icons/fa';

const FeatureSection = () => {
  const features = [
    {
      icon: <FaGem className="w-8 h-8 mx-auto text-amber-600" />,
      title: 'Premium Quality',
      description: '100% certified quality with only BIS Hallmarked Jewellery',
    },
    {
      icon: <FaHandsHelping className="w-8 h-8 mx-auto text-amber-600" />,
      title: 'Expert Craftsmanship',
      description: 'Handcrafted by skilled artisans',
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 mx-auto text-amber-600" />,
      title: 'Secure Shopping',
      description: 'Safe and secure online transactions',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
