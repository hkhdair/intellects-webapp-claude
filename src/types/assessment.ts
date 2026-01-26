export type QuestionType = 'single-choice' | 'multiple-choice';

export interface AnswerOption {
  id: string;
  label: string;
  value: number;
  tags?: string[];
}

export interface Question {
  id: string;
  phase: 1 | 2;
  section?: 'automation-maturity' | 'ai-opportunity' | 'people-adoption';
  question: string;
  description?: string;
  type: QuestionType;
  options: AnswerOption[];
  required: boolean;
  weight: number;
}

export interface AssessmentPhase {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  estimatedTime: string;
}

export interface AssessmentAnswer {
  questionId: string;
  selectedOptionIds: string[];
  score: number;
}

export interface AssessmentState {
  currentPhase: number;
  currentQuestionIndex: number;
  answers: Map<string, AssessmentAnswer>;
  startedAt: Date;
  completedAt?: Date;
}

export interface Recommendation {
  title: string;
  description: string;
  servicePath: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

export interface AssessmentResults {
  overallScore: number;
  automationReadinessScore: number;
  aiOpportunityScore: number;
  adoptionReadinessScore: number;
  timeWastedHoursPerWeek: number;
  potentialROI: {
    hoursSavedPerWeek: number;
    estimatedAnnualSavings: number;
  };
  recommendations: Recommendation[];
  priorityActions: string[];
}
