import { AssessmentAnswer, AssessmentResults } from '../types/assessment';

interface AssessmentSubmission {
  answers: Record<string, {
    questionId: string;
    selectedOptionIds: string[];
    score: number;
  }>;
  results: AssessmentResults;
  startedAt: string;
  completedAt: string;
  userAgent: string;
  referrer: string;
  email?: string;
  requestDetailedReport: boolean;
}

export async function submitAssessment(
  answers: Map<string, AssessmentAnswer>,
  results: AssessmentResults,
  startedAt: Date,
  completedAt: Date,
  email?: string
): Promise<{ success: boolean; error?: string }> {
  const answersObject: Record<string, { questionId: string; selectedOptionIds: string[]; score: number }> = {};
  answers.forEach((answer, key) => {
    answersObject[key] = {
      questionId: answer.questionId,
      selectedOptionIds: answer.selectedOptionIds,
      score: answer.score
    };
  });

  const submission: AssessmentSubmission = {
    answers: answersObject,
    results,
    startedAt: startedAt.toISOString(),
    completedAt: completedAt.toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    email: email || undefined,
    requestDetailedReport: !!email
  };

  try {
    const response = await fetch('https://wflow.intellects.tech/webhook/ai_assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit assessment: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Assessment submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
