import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center py-12"
    >
      <div className="mb-8">
        <span className="text-6xl">🎯</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Free AI & Automation Assessment
      </h1>

      <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
        Discover how AI and automation can transform your business. Get a personalised readiness score, ROI estimates, and actionable recommendations in just 12-15 minutes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background-light rounded-xl p-6 border border-gray-800"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">12-15 Minutes</h3>
          <p className="text-sm text-text-secondary">Quick and focused questions about your business</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-background-light rounded-xl p-6 border border-gray-800"
        >
          <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="font-semibold mb-2">Instant Results</h3>
          <p className="text-sm text-text-secondary">Get your personalised score and recommendations immediately</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-background-light rounded-xl p-6 border border-gray-800"
        >
          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold mb-2">100% Confidential</h3>
          <p className="text-sm text-text-secondary">No signup required, your data stays private</p>
        </motion.div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Automation readiness score',
            'AI opportunity areas',
            'Team adoption readiness',
            'ROI estimates',
            'Personalised recommendations'
          ].map((item, index) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="px-4 py-2 bg-background-light rounded-full text-sm border border-gray-800"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.button
        onClick={onStart}
        className="btn-primary text-lg px-8 py-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Assessment
        <ArrowRight className="ml-2 w-5 h-5" />
      </motion.button>

      <p className="mt-6 text-sm text-text-muted">
        No email required to see your results
      </p>
    </motion.div>
  );
};

export default AssessmentIntro;
