import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, gradient }) => {
  return (
    <motion.div
      className={`bg-background-dark rounded-xl p-6 border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px]`}
      itemScope
      itemType="https://schema.org/Service"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      <div className={`w-20 h-20 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-br ${gradient}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3" itemProp="name">{title}</h3>
      <p className="text-text-secondary" itemProp="description">{description}</p>
      
      <motion.div 
        className="mt-6"
        initial={{ width: 0 }}
        whileInView={{ width: '40%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;