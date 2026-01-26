import { useState, useCallback, useMemo } from 'react';
import { AssessmentState, AssessmentAnswer, AssessmentResults, Recommendation, Question } from '../../types/assessment';
import { questions, assessmentPhases, getQuestionsByPhase, getTotalQuestionCount } from './data/assessmentQuestions';

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentPhase: 0,
    currentQuestionIndex: 0,
    answers: new Map(),
    startedAt: new Date()
  });

  const currentPhaseQuestions = useMemo(() =>
    state.currentPhase > 0 && state.currentPhase <= 2
      ? getQuestionsByPhase(state.currentPhase as 1 | 2)
      : [],
    [state.currentPhase]
  );

  const currentQuestion = currentPhaseQuestions[state.currentQuestionIndex];

  const progress = useMemo(() => {
    const totalQuestions = getTotalQuestionCount();
    const answeredQuestions = state.answers.size;
    return totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  }, [state.answers.size]);

  const answerQuestion = useCallback((questionId: string, answer: AssessmentAnswer) => {
    setState(prev => {
      const newAnswers = new Map(prev.answers);
      newAnswers.set(questionId, answer);
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const phaseQuestions = prev.currentPhase > 0 && prev.currentPhase <= 2
        ? getQuestionsByPhase(prev.currentPhase as 1 | 2)
        : [];

      if (prev.currentQuestionIndex < phaseQuestions.length - 1) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 };
      }

      const nextPhase = prev.currentPhase + 1;
      if (nextPhase <= 3) {
        return { ...prev, currentPhase: nextPhase, currentQuestionIndex: 0, completedAt: nextPhase === 3 ? new Date() : undefined };
      }

      return prev;
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQuestionIndex > 0) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 };
      }

      if (prev.currentPhase > 1) {
        const prevPhaseQuestions = getQuestionsByPhase((prev.currentPhase - 1) as 1 | 2);
        return {
          ...prev,
          currentPhase: prev.currentPhase - 1,
          currentQuestionIndex: prevPhaseQuestions.length - 1
        };
      }

      return prev;
    });
  }, []);

  const startAssessment = useCallback(() => {
    setState(prev => ({ ...prev, currentPhase: 1, startedAt: new Date() }));
  }, []);

  const resetAssessment = useCallback(() => {
    setState({
      currentPhase: 0,
      currentQuestionIndex: 0,
      answers: new Map(),
      startedAt: new Date()
    });
  }, []);

  const isFirstQuestion = state.currentPhase === 1 && state.currentQuestionIndex === 0;
  const isLastQuestion = useMemo(() => {
    if (state.currentPhase !== 2) return false;
    const phase2Questions = getQuestionsByPhase(2);
    return state.currentQuestionIndex === phase2Questions.length - 1;
  }, [state.currentPhase, state.currentQuestionIndex]);

  const calculateResults = useCallback((): AssessmentResults => {
    const tagScores = new Map<string, number>();
    let automationScore = 0;
    let aiScore = 0;
    let adoptionScore = 0;
    let automationMax = 0;
    let aiMax = 0;
    let adoptionMax = 0;

    state.answers.forEach((answer, questionId) => {
      const question = questions.find(q => q.id === questionId);
      if (!question) return;

      answer.selectedOptionIds.forEach(optionId => {
        const option = question.options.find(o => o.id === optionId);
        if (option) {
          option.tags?.forEach(tag => {
            tagScores.set(tag, (tagScores.get(tag) || 0) + option.value);
          });
        }
      });

      if (question.phase === 1 || question.section === 'automation-maturity') {
        automationScore += answer.score;
        const maxOption = Math.max(...question.options.map(o => o.value));
        automationMax += maxOption * question.weight * (question.type === 'multiple-choice' ? question.options.length : 1);
      }

      if (question.section === 'ai-opportunity') {
        aiScore += answer.score;
        const maxOption = Math.max(...question.options.map(o => o.value));
        aiMax += maxOption * question.weight;
      }

      if (question.section === 'people-adoption') {
        adoptionScore += answer.score;
        const maxOption = Math.max(...question.options.map(o => o.value));
        adoptionMax += maxOption * question.weight;
      }
    });

    const automationReadinessScore = automationMax > 0 ? (automationScore / automationMax) * 100 : 0;
    const aiOpportunityScore = aiMax > 0 ? (aiScore / aiMax) * 100 : 0;
    const adoptionReadinessScore = adoptionMax > 0 ? (adoptionScore / adoptionMax) * 100 : 0;

    const timeWastedAnswer = state.answers.get('q1-5');
    let timeWastedHoursPerWeek = 0;
    if (timeWastedAnswer) {
      const mapping: Record<string, number> = {
        'q1-5-a': 2.5,
        'q1-5-b': 7.5,
        'q1-5-c': 15,
        'q1-5-d': 30,
        'q1-5-e': 50
      };
      timeWastedHoursPerWeek = mapping[timeWastedAnswer.selectedOptionIds[0]] || 0;
    }

    const hoursSavedPerWeek = timeWastedHoursPerWeek * 0.6;
    const hourlyRate = 50;
    const weeksPerYear = 48;
    const estimatedAnnualSavings = hoursSavedPerWeek * hourlyRate * weeksPerYear;

    const recommendations = generateRecommendations(tagScores);

    const overallScore = (
      automationReadinessScore * 0.4 +
      aiOpportunityScore * 0.35 +
      adoptionReadinessScore * 0.25
    );

    return {
      overallScore,
      automationReadinessScore,
      aiOpportunityScore,
      adoptionReadinessScore,
      timeWastedHoursPerWeek,
      potentialROI: {
        hoursSavedPerWeek,
        estimatedAnnualSavings
      },
      recommendations,
      priorityActions: recommendations.filter(r => r.priority === 'high').slice(0, 3).map(r => r.title)
    };
  }, [state.answers]);

  return {
    state,
    currentQuestion,
    currentPhaseQuestions,
    progress,
    phases: assessmentPhases,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    startAssessment,
    resetAssessment,
    isFirstQuestion,
    isLastQuestion,
    calculateResults,
    totalQuestions: getTotalQuestionCount()
  };
};

function generateRecommendations(tagScores: Map<string, number>): Recommendation[] {
  const recommendations: Recommendation[] = [];

  const automationTags = ['automation', 'data', 'workflow', 'communication', 'analytics', 'marketing'];
  const automationTotal = automationTags.reduce((sum, tag) => sum + (tagScores.get(tag) || 0), 0);

  if (automationTotal >= 4) {
    recommendations.push({
      title: 'Workflow Automation',
      description: 'Your business has significant automation potential. Start with high-volume repetitive tasks to free up your team.',
      servicePath: '/services/business-process-automation',
      priority: automationTotal >= 8 ? 'high' : 'medium',
      tags: ['automation']
    });
  }

  const chatbotScore = (tagScores.get('chatbot') || 0) + (tagScores.get('support') || 0);
  if (chatbotScore >= 2) {
    recommendations.push({
      title: 'AI-Powered Customer Support',
      description: 'A chatbot or voice agent could handle routine inquiries and free up your team for complex issues.',
      servicePath: '/services/business-process-automation',
      priority: chatbotScore >= 6 ? 'high' : 'medium',
      tags: ['chatbot', 'support']
    });
  }

  const aiScore = (tagScores.get('ai') || 0) + (tagScores.get('document-processing') || 0) + (tagScores.get('analytics') || 0) + (tagScores.get('insights') || 0);
  if (aiScore >= 4) {
    recommendations.push({
      title: 'Custom AI Solution',
      description: 'Your data and document processing needs could benefit from custom AI models tailored to your business.',
      servicePath: '/services/custom-ai-solutions',
      priority: aiScore >= 8 ? 'high' : 'medium',
      tags: ['ai', 'documents']
    });
  }

  const knowledgeBotScore = (tagScores.get('knowledge-bot') || 0) + (tagScores.get('ai-assistant') || 0);
  if (knowledgeBotScore >= 4) {
    recommendations.push({
      title: 'Internal Knowledge Assistant',
      description: 'An AI assistant trained on your internal documents could help staff find answers quickly.',
      servicePath: '/services/custom-ai-solutions',
      priority: knowledgeBotScore >= 6 ? 'high' : 'medium',
      tags: ['knowledge-bot', 'ai-assistant']
    });
  }

  const trainingNeeded = (tagScores.get('training-needed') || 0) + (tagScores.get('change-management') || 0);
  if (trainingNeeded >= 2) {
    recommendations.push({
      title: 'Training & Change Support',
      description: 'Your team could benefit from structured training and change management support for new technology adoption.',
      servicePath: '/services/training-support',
      priority: trainingNeeded >= 4 ? 'high' : 'medium',
      tags: ['training', 'change-management']
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Automation Discovery Session',
      description: 'Let us help you identify the best automation opportunities for your specific situation.',
      servicePath: '/services/business-process-automation',
      priority: 'medium',
      tags: ['discovery']
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export type UseAssessmentReturn = ReturnType<typeof useAssessment>;
