import React from 'react';
import { motion } from 'framer-motion';
import { AssessmentPhase } from '../../../types/assessment';

interface ProgressIndicatorProps {
  phases: AssessmentPhase[];
  currentPhase: number;
  progress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  phases,
  currentPhase,
  progress
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="h-2 bg-background-light rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex justify-between">
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className={`flex flex-col items-center transition-colors ${
              index + 1 <= currentPhase ? 'text-primary' : 'text-text-muted'
            }`}
          >
            <span className="text-2xl mb-1">{phase.emoji}</span>
            <span className="text-xs md:text-sm font-medium hidden md:block text-center max-w-[100px]">
              {phase.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
