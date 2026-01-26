import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Question, AssessmentAnswer } from '../../../types/assessment';
import AnswerOptions from './AnswerOptions';

interface QuestionCardProps {
  question: Question;
  answer?: AssessmentAnswer;
  onAnswer: (answer: AssessmentAnswer) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswer,
  onNext,
  onPrev,
  isFirst,
  isLast,
  questionNumber,
  totalQuestions
}) => {
  const handleOptionSelect = (optionIds: string[]) => {
    console.log('QuestionCard received selection:', optionIds);
    const selectedOptions = question.options.filter(o => optionIds.includes(o.id));
    const score = selectedOptions.reduce((sum, o) => sum + o.value, 0) * question.weight;

    onAnswer({
      questionId: question.id,
      selectedOptionIds: optionIds,
      score
    });
  };

  const canProceed = answer && answer.selectedOptionIds.length > 0;

  return (
    <div className="bg-background-light rounded-2xl p-6 md:p-10 border border-gray-800 max-w-2xl mx-auto">
      <div className="text-sm text-text-muted mb-4">
        Question {questionNumber} of {totalQuestions}
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-3">
        {question.question}
      </h2>

      {question.description && (
        <p className="text-text-secondary mb-6">
          {question.description}
        </p>
      )}

      <AnswerOptions
        question={question}
        selectedIds={answer?.selectedOptionIds || []}
        onSelect={handleOptionSelect}
      />

      <div className="flex justify-between mt-8 gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className={`btn-outline flex items-center ${isFirst ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`btn-primary flex items-center ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLast ? 'See Results' : 'Next'}
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
