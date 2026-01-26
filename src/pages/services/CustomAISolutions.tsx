import React from 'react';
import ServicePageLayout from './ServicePageLayout';

const CustomAISolutions: React.FC = () => {
  const pageData = {
    title: "Custom AI Solutions",
    subtitle: "Fine‑tuned AI and Retrieval‑Augmented Generation (RAG) for your data — evaluated, deployed, and built with privacy in mind.",
    deliverBullets: [
      "Data readiness check + preparation guidance",
      "Model fine‑tuning, RAG pipeline setup, or custom training",
      "Evaluation (accuracy, safety, bias checks where relevant)",
      "Deployment (API, internal tool, or embedded workflow)",
      "Privacy-by-design practices (general*, not legal advice)",
      "Documentation + handover, optional monitoring"
    ],
    idealForBullets: [
      "Organisations with proprietary knowledge/data",
      "Teams needing better predictions or classification",
      "Products needing smarter search/assistants",
      "Teams wanting accurate, context‑aware AI answers powered by their internal documents"
    ],
    steps: [
      {
        number: 1,
        title: "Scope + success metrics",
        description: "Define your AI goals and how we'll measure success"
      },
      {
        number: 2,
        title: "Data prep + baseline",
        description: "Assess and prepare your data, establish baseline performance"
      },
      {
        number: 3,
        title: "Fine‑tune / Knowledge‑augment + evaluate",
        description: "Train the model and enhance it with retrieval from your data to deliver precise, trustworthy answers"
      },
      {
        number: 4,
        title: "Deploy + integrate",
        description: "Launch the model via API or embed in your workflow"
      },
      {
        number: 5,
        title: "Monitor + iterate",
        description: "Track performance and improve based on real-world use"
      }
    ],
    useCases: [
      {
        title: "Private knowledge assistant over internal docs",
        description: "Build an AI assistant that understands your company's internal documentation, policies, and knowledge base to help employees find answers quickly."
      },
      {
        title: "Forecasting/predictive analytics model",
        description: "Create custom models that predict sales, demand, churn, or other business metrics based on your historical data and patterns."
      },
      {
        title: "(EdTech) Personalised tutoring assistant",
        description: "Leverage our EdTech expertise to develop adaptive learning tools (for example, personalised tutoring systems) that adjust content difficulty and teaching style based on each student's progress and learning patterns."
      }
    ],
    faqs: [
      {
        question: "Do you train on our private data?",
        answer: "Yes, but with strict privacy controls. Your data is used only to train your model and never shared or mixed with other clients. We can work with on-premises deployment or secure cloud environments based on your requirements."
      },
      {
        question: "How do you evaluate model quality?",
        answer: "We use metrics appropriate to your use case (accuracy, precision, fairness, etc.) and test on held-out data. We also conduct real-world scenario testing and check for potential biases or edge cases."
      },
      {
        question: "Where can it be deployed?",
        answer: "We can deploy via API (cloud or on-premises), integrate into existing applications, create standalone tools, or embed in workflows. Deployment method depends on your security requirements and use case."
      },
      {
        question: "What about Australian privacy requirements?",
        answer: "We design with privacy-by-design principles following the Australian Privacy Principles (APPs). This includes data minimisation, secure storage, and appropriate handling of personal information. Note: this is general implementation guidance, not legal advice."
      },
      {
        question: "Do we need a big dataset?",
        answer: "Not always. Fine-tuning can work with smaller datasets (hundreds to thousands of examples). The exact requirements depend on your task complexity. We'll assess your data during the scoping phase and recommend the best approach."
      }
    ],
    ctaBandText: "Share your use case and data context. We'll recommend the simplest approach.",
    heroCta: {
      text: "Get Free AI & Automation Assessment",
      href: "/assessment"
    }
  };

  return <ServicePageLayout {...pageData} />;
};

export default CustomAISolutions;
