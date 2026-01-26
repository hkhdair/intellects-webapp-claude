import React, { useMemo } from 'react';
import { UseAssessmentReturn } from '../useAssessment';
import ProgressIndicator from './ProgressIndicator';
import AssessmentIntro from './AssessmentIntro';
import QuestionCard from './QuestionCard';
import AssessmentResults from './AssessmentResults';

interface AssessmentWizardProps {
  assessment: UseAssessmentReturn;
}

const AssessmentWizard: React.FC<AssessmentWizardProps> = ({ assessment }) => {
  const {
    state,
    currentQuestion,
    progress,
    phases,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    startAssessment,
    resetAssessment,
    isFirstQuestion,
    isLastQuestion,
    calculateResults,
    totalQuestions
  } = assessment;

  const currentQuestionNumber = useMemo(() => {
    if (state.currentPhase === 0) return 0;

    let count = 0;
    for (let phase = 1; phase < state.currentPhase; phase++) {
      const phaseQuestions = phases.find(p => p.id === phase);
      if (phaseQuestions) {
        count += phase === 1 ? 5 : 9;
      }
    }
    return count + state.currentQuestionIndex + 1;
  }, [state.currentPhase, state.currentQuestionIndex, phases]);

  const results = useMemo(() => {
    if (state.currentPhase === 3) {
      return calculateResults();
    }
    return null;
  }, [state.currentPhase, calculateResults]);

  if (state.currentPhase === 0) {
    return (
      <div className="container py-8">
        <AssessmentIntro onStart={startAssessment} />
      </div>
    );
  }

  if (state.currentPhase === 3 && results) {
    return (
      <div className="container py-8">
        <AssessmentResults
          results={results}
          answers={state.answers}
          startedAt={state.startedAt}
          onReset={resetAssessment}
        />
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="container py-8">
      <ProgressIndicator
        phases={phases}
        currentPhase={state.currentPhase}
        progress={progress}
      />

      <div className="mb-4 text-center">
        <span className="text-sm text-text-muted">
          Phase {state.currentPhase}: {phases[state.currentPhase - 1]?.title}
        </span>
      </div>

      <QuestionCard
        question={currentQuestion}
        answer={state.answers.get(currentQuestion.id)}
        onAnswer={(answer) => answerQuestion(currentQuestion.id, answer)}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        isFirst={isFirstQuestion}
        isLast={isLastQuestion}
        questionNumber={currentQuestionNumber}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default AssessmentWizard;
