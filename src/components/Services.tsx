import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { Settings, Brain, GraduationCap } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Business Process Automation",
      description: "Automate repetitive workflows with chatbots, voice agents, and CRM-connected processes that reduce manual work and errors.",
      icon: <Settings className="text-primary w-12 h-12" />,
      gradient: "from-primary/20 to-primary/10",
      link: "/services/business-process-automation",
      outcomes: [
        "Cut manual data entry and follow-ups",
        "Connect forms, inboxes, and CRMs",
        "Deploy chat/voice assistants with handover"
      ]
    },
    {
      id: 2,
      title: "Custom AI Solutions",
      description: "Fine-tuned models on your data, evaluated and deployed securely — with privacy-by-design for Australian organisations.",
      icon: <Brain className="text-secondary w-12 h-12" />,
      gradient: "from-secondary/20 to-secondary/10",
      link: "/services/custom-ai-solutions",
      outcomes: [
        "Fine-tune + evaluate on your data",
        "Deploy via API or lightweight app",
        "Privacy-first implementation"
      ]
    },
    {
      id: 3,
      title: "Training & Support",
      description: "Enable adoption with practical onboarding, playbooks, and ongoing support so solutions stick.",
      icon: <GraduationCap className="text-accent w-12 h-12" />,
      gradient: "from-accent/20 to-accent/10",
      link: "/services/training-support",
      outcomes: [
        "Team training + operating playbooks",
        "Change management and rollout support",
        "Maintenance and improvements"
      ]
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
              link={service.link}
              outcomes={service.outcomes}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;