import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 min-h-[85vh] md:min-h-[90vh] flex items-center">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" itemProp="headline">
              Automate Your Business.
              <div className="gradient-text text-2xl md:text-3xl lg:text-4xl font-bold mt-3">
                Automation that Works.
              </div>
              <div className="gradient-text text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                AI that Delivers.
              </div>
              <div className="gradient-text text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                Results that Matter.
              </div>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mt-4 mb-6" itemProp="description">
              Guaranteed!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="btn-primary">
                Explore Services
              </a>
              <a href="#contact" className="btn-outline">
                Request a Call Back
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="animate-float bg-background-light p-6 rounded-full shadow-lg"
                  >
                    <Bot size={80} className="text-primary" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Floating dots/particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary`}
                  style={{ 
                    top: `${20 + Math.random() * 60}%`, 
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;