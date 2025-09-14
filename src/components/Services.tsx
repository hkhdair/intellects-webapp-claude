import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { Settings, Brain, Users } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Business Process Automation",
      description: "Automate repetitive workflows, eliminate manual errors, and optimise operations with intelligent process automation. Free up your team's time to focus on strategy and innovation while driving measurable efficiency gains.",
      icon: <Settings className="text-primary w-12 h-12" />,
      gradient: "from-primary/20 to-primary/10"
    },
    {
      id: 2,
      title: "Custom AI Solutions",
      description: "Unlock the power of artificial intelligence with tailored solutions that deliver actionable insights and smarter decisions. From predictive analytics to computer vision and natural language processing, we build AI systems designed to solve your unique business challenges.",
      icon: <Brain className="text-secondary w-12 h-12" />,
      gradient: "from-secondary/20 to-secondary/10"
    },
    {
      id: 3,
      title: "Training & Change Management",
      description: "Ensure smooth adoption of AI and automation with expert-led training and change management support. Empower your teams with practical skills, foster a culture of innovation, and guide your organization through every step of the transformation journey.",
      icon: <Users className="text-accent w-12 h-12" />,
      gradient: "from-accent/20 to-accent/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-background-light">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" id="services-heading">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary" role="doc-subtitle">
            We provide innovative solutions tailored to your business needs, combining cutting-edge technology with strategic implementation.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              title={service.title}
              description={service.description}
              icon={service.icon}
              gradient={service.gradient}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;