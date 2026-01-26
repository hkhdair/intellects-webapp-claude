import React from 'react';
import ServicePageLayout from './ServicePageLayout';

const BusinessProcessAutomation: React.FC = () => {
  const pageData = {
    title: "Business Process Automation",
    subtitle: "Workflows, assistants, and integrations that remove busywork and keep systems in sync.",
    deliverBullets: [
      "Workflow automation across tools",
      "Forms + data-entry automation",
      "CRM integrations (HubSpot/Salesforce/Zoho/etc.)",
      "Chatbots, personal assistants, voice agents",
      "Monitoring, analytics, and safe handover",
      "Retail marketing workflows (ads, UGC, scheduling)"
    ],
    idealForBullets: [
      "Teams drowning in repetitive admin",
      "Sales/ops needing clean CRM data",
      "Customer support wanting fast triage",
      "Retail/eCom needing consistent content ops"
    ],
    steps: [
      {
        number: 1,
        title: "Discovery",
        description: "Map workflows + goals"
      },
      {
        number: 2,
        title: "Build",
        description: "Automation + assistant + integrations"
      },
      {
        number: 3,
        title: "Test",
        description: "Edge cases, accuracy, security"
      },
      {
        number: 4,
        title: "Launch",
        description: "Deploy + dashboards + handover"
      },
      {
        number: 5,
        title: "Improve",
        description: "Iteration based on usage"
      }
    ],
    useCases: [
      {
        title: "Lead capture → CRM → follow-up automation",
        description: "Automatically capture leads from forms, sync to your CRM, and trigger personalised follow-up sequences without manual intervention."
      },
      {
        title: "Support chatbot triage + human handoff",
        description: "Deploy an AI chatbot to handle common questions and seamlessly hand over complex issues to your support team with full context."
      },
      {
        title: "Voice agent for bookings/FAQs",
        description: "Let customers interact with a voice assistant to book appointments, check availability, or get answers to frequently asked questions."
      },
      {
        title: "Retail content pipeline (UGC collection → approval → scheduling)",
        description: "Automate the collection of user-generated content, route it for approval, and schedule approved content across your social channels."
      }
    ],
    faqs: [
      {
        question: "What tools can you integrate with?",
        answer: "We work with popular CRMs (HubSpot, Salesforce, Zoho), email platforms, databases, spreadsheets, and most tools with APIs. If your tool has an API or webhook support, we can likely integrate it."
      },
      {
        question: "Can this work with our existing CRM?",
        answer: "Yes. We specialise in connecting automation to your current systems rather than replacing them. We'll assess your CRM's capabilities and build integrations that enhance what you already have."
      },
      {
        question: "How do you handle handover to a human?",
        answer: "We design handover points where the bot recognises it needs help (e.g., complex questions, upset customers) and routes to your team with full conversation context. You define the handover rules."
      },
      {
        question: "What does 'voice agent' mean in practice?",
        answer: "A voice agent is an AI that can understand and respond to spoken questions via phone or voice interface. Think of it as a chatbot you can talk to, handling bookings, FAQs, or routing calls."
      },
      {
        question: "How long does a typical build take?",
        answer: "Simple automations can be ready in 1-2 weeks. More complex solutions with chatbots, voice agents, and multiple integrations typically take 4-8 weeks. We'll scope your specific timeline during discovery."
      }
    ],
    ctaBandText: "Tell us what you want to automate. We'll propose a simple, phased plan.",
    heroCta: {
      text: "Get Free AI & Automation Assessment",
      href: "/assessment"
    }
  };

  return <ServicePageLayout {...pageData} />;
};

export default BusinessProcessAutomation;
