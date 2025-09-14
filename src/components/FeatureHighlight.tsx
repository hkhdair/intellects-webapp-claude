import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const FeatureHighlight: React.FC = () => {
  const features = [
    "Custom AI solutions tailored to your business",
    "Automated workflows that save time and reduce errors",
    "Intelligent data processing and analysis",
    "Scalable solutions that grow with your business",
    "Expert implementation and ongoing support"
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-background-dark to-background-light">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" id="features-heading">
              Next-generation <span className="gradient-text">AI technology</span> for your business
            </h2>
            <p className="text-text-secondary mb-8" role="doc-subtitle">
              We combine cutting-edge artificial intelligence with deep business expertise to create solutions that drive real results. Our experts works closely with you to understand your unique challenges and build systems that provide measurable value.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CheckCircle className="text-success mt-1 shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-3xl opacity-30"></div>
              <div className="relative bg-background-dark border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                  </div>
                  <div className="text-text-muted text-sm">intellects.tech</div>
                </div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-primary-light">intellects</span>
                    <span className="text-text-muted">:</span>
                    <span className="text-secondary-light">~</span>
                    <span className="text-text-muted">$</span>
                    <span className="ml-2">initialize_ai_solution</span>
                  </div>
                  <div>
                    <span className="text-accent">Initializing AI components...</span>
                  </div>
                  <div>
                    <span className="text-success">✓ Data preprocessing complete</span>
                  </div>
                  <div>
                    <span className="text-success">✓ Optimal model selected</span>
                  </div>
                  <div>
                    <span className="text-success">✓ Training pipeline configured</span>
                  </div>
                  <div>
                    <span className="text-success">✓ Deployment strategy verified</span>
                  </div>
                  <div>
                    <span className="text-primary-light">AI solution ready for implementation!</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Would you like to proceed? [Y/n]</span>
                    <span className="ml-2 inline-block w-2 h-4 bg-text-primary animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;