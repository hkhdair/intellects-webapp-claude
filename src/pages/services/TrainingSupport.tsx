import React from 'react';
import ServicePageLayout from './ServicePageLayout';

const TrainingSupport: React.FC = () => {
  const pageData = {
    title: "Training & Support",
    subtitle: "Adoption that sticks — practical training, rollout support, and maintenance options.",
    deliverBullets: [
      "Onboarding sessions (live or async)",
      "Playbooks, SOPs, and quick reference guides",
      "Adoption plan + success metrics",
      "Change management support (comms + champions)",
      "Maintenance options (short/long-term)",
      "Iteration & optimisation after launch"
    ],
    idealForBullets: [
      "Teams launching one of our AI products, such as a chatbot or automation",
      "Organisations needing consistent operations",
      "Leaders managing change and risk",
      "Organisations wanting ongoing improvements"
    ],
    steps: [
      {
        number: 1,
        title: "Current-state assessment",
        description: "Understand your team's readiness and potential challenges"
      },
      {
        number: 2,
        title: "Enablement plan",
        description: "Design training and rollout strategy (who/what/when)"
      },
      {
        number: 3,
        title: "Training + rollout",
        description: "Deliver hands-on training and support the launch"
      },
      {
        number: 4,
        title: "Support window + feedback loop",
        description: "Provide immediate post-launch assistance and gather insights"
      },
      {
        number: 5,
        title: "Maintenance or monthly optimisation",
        description: "Ongoing support to keep solutions effective and improving"
      }
    ],
    useCases: [
      {
        title: "Team onboarding for chatbot + escalation",
        description: "Train your support team on how to monitor bot conversations, when to intervene, and how to improve the bot's responses over time."
      },
      {
        title: "Operating model for automated workflows",
        description: "Create clear SOPs and playbooks so your team knows how to manage, monitor, and troubleshoot automated processes confidently."
      },
      {
        title: "Monthly maintenance + improvements",
        description: "Regular check-ins to review performance, implement updates, fix issues, and add features based on evolving needs."
      },
      {
        title: "AI usage guidelines + safe rollout",
        description: "Develop policies and training for responsible AI use, addressing ethical considerations, limitations, and best practices for your organisation."
      }
    ],
    faqs: [
      {
        question: "Do you train non-technical teams?",
        answer: "Absolutely. We specialise in making AI and automation accessible to everyone. Training is tailored to your team's technical level, using plain language and hands-on examples relevant to their daily work."
      },
      {
        question: "What does ongoing support include?",
        answer: "Ongoing support can include troubleshooting, performance monitoring, updates, new feature additions, and optimisation. We offer flexible arrangements from ad-hoc help to monthly retainers depending on your needs."
      },
      {
        question: "Can you support tools you didn't build?",
        answer: "Yes. We can provide training and support for AI/automation tools from other providers. We'll learn your system and help your team use it effectively, though deep customisation may have limitations."
      },
      {
        question: "How do we measure adoption?",
        answer: "We help you define success metrics like usage rates, task completion times, user satisfaction scores, or error reduction. We'll set up tracking and regular reviews to measure progress and identify areas for improvement."
      }
    ],
    ctaBandText: "Launch confidently. We'll help your team use the solution effectively."
  };

  return <ServicePageLayout {...pageData} />;
};

export default TrainingSupport;
