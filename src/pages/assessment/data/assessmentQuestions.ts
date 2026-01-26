import { Question, AssessmentPhase } from '../../../types/assessment';

export const assessmentPhases: AssessmentPhase[] = [
  {
    id: 1,
    title: "Business Reality Check",
    subtitle: "Let's understand your current situation",
    emoji: "🎯",
    estimatedTime: "5-7 mins"
  },
  {
    id: 2,
    title: "Automation & AI Readiness",
    subtitle: "Evaluating your automation potential",
    emoji: "🔍",
    estimatedTime: "7-10 mins"
  },
  {
    id: 3,
    title: "Your Results",
    subtitle: "Personalized recommendations",
    emoji: "📊",
    estimatedTime: "Instant"
  }
];

export const questions: Question[] = [
  // ============================================
  // PHASE 1: Business Reality Check
  // ============================================
  {
    id: 'q1-1',
    phase: 1,
    question: "Which of these best describes your role?",
    type: 'single-choice',
    options: [
      { id: 'q1-1-a', label: 'Founder / Director', value: 3, tags: ['decision-maker'] },
      { id: 'q1-1-b', label: 'Ops / IT / Digital Lead', value: 3, tags: ['operations', 'technical'] },
      { id: 'q1-1-c', label: 'Manager / Team Lead', value: 2, tags: ['management'] },
      { id: 'q1-1-d', label: 'Other', value: 1, tags: ['team'] }
    ],
    required: true,
    weight: 1
  },
  {
    id: 'q1-2',
    phase: 1,
    question: "Where does your team lose the most time each week?",
    description: "Select all that apply to your situation.",
    type: 'multiple-choice',
    options: [
      { id: 'q1-2-a', label: 'Manual data entry', value: 2, tags: ['automation', 'data'] },
      { id: 'q1-2-b', label: 'Email follow-ups / approvals', value: 2, tags: ['automation', 'communication'] },
      { id: 'q1-2-c', label: 'Reporting & spreadsheets', value: 2, tags: ['automation', 'analytics'] },
      { id: 'q1-2-d', label: 'Customer enquiries', value: 2, tags: ['chatbot', 'support'] },
      { id: 'q1-2-e', label: 'Marketing execution', value: 2, tags: ['automation', 'marketing'] },
      { id: 'q1-2-f', label: 'Internal handovers', value: 2, tags: ['automation', 'workflow'] }
    ],
    required: true,
    weight: 3
  },
  {
    id: 'q1-3',
    phase: 1,
    question: "If this problem disappeared tomorrow, what would improve first?",
    type: 'single-choice',
    options: [
      { id: 'q1-3-a', label: 'Speed', value: 2, tags: ['efficiency'] },
      { id: 'q1-3-b', label: 'Cost', value: 3, tags: ['cost-savings'] },
      { id: 'q1-3-c', label: 'Accuracy', value: 2, tags: ['quality'] },
      { id: 'q1-3-d', label: 'Customer experience', value: 3, tags: ['customer', 'chatbot'] },
      { id: 'q1-3-e', label: 'Staff workload', value: 2, tags: ['efficiency', 'wellbeing'] }
    ],
    required: true,
    weight: 2
  },
  {
    id: 'q1-4',
    phase: 1,
    question: "How would you describe these problems?",
    type: 'single-choice',
    options: [
      { id: 'q1-4-a', label: 'Annoying but manageable', value: 1 },
      { id: 'q1-4-b', label: 'Slowing growth', value: 2 },
      { id: 'q1-4-c', label: 'Actively costing money', value: 3 },
      { id: 'q1-4-d', label: 'Blocking scale', value: 4 }
    ],
    required: true,
    weight: 3
  },
  {
    id: 'q1-5',
    phase: 1,
    question: "How many hours per week does your team spend on repetitive manual tasks?",
    description: "Think about data entry, copy-pasting, email follow-ups, report generation, etc.",
    type: 'single-choice',
    options: [
      { id: 'q1-5-a', label: 'Less than 5 hours', value: 1 },
      { id: 'q1-5-b', label: '5-10 hours', value: 2 },
      { id: 'q1-5-c', label: '10-20 hours', value: 3 },
      { id: 'q1-5-d', label: '20-40 hours', value: 4 },
      { id: 'q1-5-e', label: 'More than 40 hours', value: 5 }
    ],
    required: true,
    weight: 3
  },

  // ============================================
  // PHASE 2A: Automation Maturity
  // ============================================
  {
    id: 'q2-1',
    phase: 2,
    section: 'automation-maturity',
    question: "What automation tools do you currently use?",
    description: "Select all that apply.",
    type: 'multiple-choice',
    options: [
      { id: 'q2-1-a', label: 'Zapier / Make / Power Automate', value: 3, tags: ['automation-user'] },
      { id: 'q2-1-b', label: 'CRM automations (HubSpot, Salesforce, etc.)', value: 3, tags: ['crm', 'automation-user'] },
      { id: 'q2-1-c', label: 'Custom scripts or workflows', value: 4, tags: ['technical', 'automation-user'] },
      { id: 'q2-1-d', label: 'None / Mostly manual', value: 1, tags: ['automation-opportunity'] }
    ],
    required: true,
    weight: 2
  },
  {
    id: 'q2-2',
    phase: 2,
    section: 'automation-maturity',
    question: "Which of these system connections do you currently have?",
    description: "Select all that apply.",
    type: 'multiple-choice',
    options: [
      { id: 'q2-2-a', label: 'Website → CRM', value: 2, tags: ['integration'] },
      { id: 'q2-2-b', label: 'CRM → Email marketing', value: 2, tags: ['integration'] },
      { id: 'q2-2-c', label: 'Finance → Reporting', value: 2, tags: ['integration'] },
      { id: 'q2-2-d', label: 'None of the above', value: 0, tags: ['integration-opportunity'] }
    ],
    required: true,
    weight: 2
  },
  {
    id: 'q2-3',
    phase: 2,
    section: 'automation-maturity',
    question: "Which of these statements apply to your business?",
    description: "These are common signs of automation opportunities.",
    type: 'multiple-choice',
    options: [
      { id: 'q2-3-a', label: '"We export data to Excel regularly"', value: 2, tags: ['automation', 'data'] },
      { id: 'q2-3-b', label: '"Someone checks this manually every day"', value: 2, tags: ['automation'] },
      { id: 'q2-3-c', label: '"This process depends on one person"', value: 3, tags: ['automation', 'risk'] },
      { id: 'q2-3-d', label: '"We know this shouldn\'t be manual"', value: 2, tags: ['automation'] },
      { id: 'q2-3-e', label: '"We tried tools but they didn\'t work"', value: 1, tags: ['custom-solution'] }
    ],
    required: true,
    weight: 2
  },

  // ============================================
  // PHASE 2B: AI Opportunity Scan
  // ============================================
  {
    id: 'q2-4',
    phase: 2,
    section: 'ai-opportunity',
    question: "Do you have repeated customer questions that could be answered automatically?",
    description: "Think about FAQs, support tickets, or common inquiries.",
    type: 'single-choice',
    options: [
      { id: 'q2-4-a', label: 'Yes, many', value: 4, tags: ['chatbot', 'ai-assistant'] },
      { id: 'q2-4-b', label: 'Yes, some', value: 2, tags: ['chatbot', 'ai-assistant'] },
      { id: 'q2-4-c', label: 'Not really', value: 0 }
    ],
    required: true,
    weight: 3
  },
  {
    id: 'q2-5',
    phase: 2,
    section: 'ai-opportunity',
    question: "Do you have documents that require manual review or processing?",
    description: "Examples: invoices, contracts, applications, forms.",
    type: 'single-choice',
    options: [
      { id: 'q2-5-a', label: 'Yes, frequently', value: 4, tags: ['document-processing', 'ai'] },
      { id: 'q2-5-b', label: 'Yes, occasionally', value: 2, tags: ['document-processing', 'ai'] },
      { id: 'q2-5-c', label: 'No', value: 0 }
    ],
    required: true,
    weight: 3
  },
  {
    id: 'q2-6',
    phase: 2,
    section: 'ai-opportunity',
    question: "Do you have historical data that you\'re not currently analysing?",
    description: "Sales data, customer behaviour, operational metrics, etc.",
    type: 'single-choice',
    options: [
      { id: 'q2-6-a', label: 'Yes, lots of it', value: 4, tags: ['analytics', 'ai', 'insights'] },
      { id: 'q2-6-b', label: 'Yes, some', value: 2, tags: ['analytics', 'ai'] },
      { id: 'q2-6-c', label: 'No / Not sure', value: 0 }
    ],
    required: true,
    weight: 2
  },
  {
    id: 'q2-7',
    phase: 2,
    section: 'ai-opportunity',
    question: "Do staff frequently answer the same internal questions?",
    description: "Questions about processes, policies, or how to do things.",
    type: 'single-choice',
    options: [
      { id: 'q2-7-a', label: 'Yes, all the time', value: 4, tags: ['knowledge-bot', 'ai-assistant'] },
      { id: 'q2-7-b', label: 'Yes, sometimes', value: 2, tags: ['knowledge-bot'] },
      { id: 'q2-7-c', label: 'No', value: 0 }
    ],
    required: true,
    weight: 2
  },

  // ============================================
  // PHASE 2C: People & Adoption Reality
  // ============================================
  {
    id: 'q2-8',
    phase: 2,
    section: 'people-adoption',
    question: "If automation/AI were introduced tomorrow, how would your team react?",
    type: 'single-choice',
    options: [
      { id: 'q2-8-a', label: 'Excited', value: 4, tags: ['ready'] },
      { id: 'q2-8-b', label: 'Nervous but open', value: 2, tags: ['training-needed'] },
      { id: 'q2-8-c', label: 'Would need training', value: 2, tags: ['training-needed'] },
      { id: 'q2-8-d', label: 'Would likely resist', value: 0, tags: ['change-management'] }
    ],
    required: true,
    weight: 2
  },
  {
    id: 'q2-9',
    phase: 2,
    section: 'people-adoption',
    question: "How would you rate your team\'s technical comfort level?",
    type: 'single-choice',
    options: [
      { id: 'q2-9-a', label: 'Very comfortable with new tech', value: 4, tags: ['ready'] },
      { id: 'q2-9-b', label: 'Comfortable with guidance', value: 3, tags: ['training-needed'] },
      { id: 'q2-9-c', label: 'Prefer familiar tools', value: 1, tags: ['training-needed', 'change-management'] },
      { id: 'q2-9-d', label: 'Struggle with new technology', value: 0, tags: ['change-management'] }
    ],
    required: true,
    weight: 2
  }
];

// Helper to get questions by phase
export const getQuestionsByPhase = (phase: 1 | 2): Question[] => {
  return questions.filter(q => q.phase === phase);
};

// Helper to get total question count
export const getTotalQuestionCount = (): number => {
  return questions.length;
};
