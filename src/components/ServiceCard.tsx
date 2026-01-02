import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  link: string;
  outcomes: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, gradient, link, outcomes }) => {
  return (
    <motion.div
      className={`bg-background-dark rounded-xl p-6 border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] flex flex-col h-full`}
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
      <p className="text-text-secondary mb-4" itemProp="description">{description}</p>
      
      <ul className="space-y-2 mb-6 flex-grow">
        {outcomes.map((outcome, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        to={link}
        className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium group"
      >
        Learn more
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;