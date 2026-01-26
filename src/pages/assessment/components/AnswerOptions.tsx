import React from 'react';
import { Check } from 'lucide-react';
import { Question } from '../../../types/assessment';

interface AnswerOptionsProps {
  question: Question;
  selectedIds: string[];
  onSelect: (optionIds: string[]) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  question,
  selectedIds,
  onSelect
}) => {
  const handleSelect = (optionId: string) => {
    console.log('Option clicked:', optionId);
    if (question.type === 'single-choice') {
      onSelect([optionId]);
    } else {
      const newSelection = selectedIds.includes(optionId)
        ? selectedIds.filter(id => id !== optionId)
        : [...selectedIds, optionId];
      onSelect(newSelection);
    }
  };

  return (
    <div className="space-y-3">
      {question.options.map((option) => {
        const isSelected = selectedIds.includes(option.id);

        return (
          <div
            key={option.id}
            onClick={() => handleSelect(option.id)}
            style={{ cursor: 'pointer' }}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
              isSelected
                ? 'border-primary bg-primary/10'
                : 'border-gray-700 bg-background-dark hover:border-gray-600 hover:bg-background-dark/80'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isSelected
                  ? 'border-primary bg-primary'
                  : 'border-gray-600'
              }`}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <span className={`flex-1 ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>
              {option.label}
            </span>
          </div>
        );
      })}

      {question.type === 'multiple-choice' && (
        <p className="text-sm text-text-muted mt-2">
          Select all that apply
        </p>
      )}
    </div>
  );
};

export default AnswerOptions;
