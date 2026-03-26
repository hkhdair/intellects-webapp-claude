import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import FeatureHighlight from './FeatureHighlight';
import Newsletter from './Newsletter';
import Contact from './Contact';
import Footer from './Footer';
import SEOHead from './SEOHead';

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Intellects AI",
    "alternateName": "intellectsai.au",
    "url": "https://intellectsai.au",
    "logo": "https://intellectsai.au/favicon.svg",
    "image": "https://intellectsai.au/og/intellects-ai-1200x630.jpg",
    "description": "Australian AI and automation agency delivering intelligent automation, custom AI solutions, and AI training for businesses and education. We help organisations streamline processes, adopt AI responsibly, and improve operational efficiency.",
    "areaServed": [{ "@type": "Country", "name": "Australia" }],
    "founder": { "@type": "Person", "name": "Hisham Khdair" },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "451 Pulteney St",
      "addressLocality": "Adelaide",
      "addressRegion": "SA",
      "postalCode": "5000",
      "addressCountry": "AU"
    },
    "sameAs": ["https://linkedin.com/company/intellects-tech"],
    "knowsAbout": [
      "artificial intelligence",
      "business process automation",
      "machine learning",
      "retrieval-augmented generation",
      "chatbots",
      "voice agents",
      "CRM integration",
      "AI training and adoption",
      "workflow automation",
      "responsible AI"
    ],
    "priceRange": "Contact for quote",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Intellects AI Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Strategy & Roadmapping",
            "description": "Assess readiness, define use-cases, data needs, risk & governance, and create a 90-day AI roadmap aligned to business outcomes."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automation & Workflows",
            "description": "Design and implement automated workflows, agentic assistants, and integrations to remove manual work and improve throughput."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Product Development",
            "description": "Prototype and ship AI-enabled products (RAG, chatbots, computer vision, analytics) with model evaluation and safety controls."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Training & Change Management",
            "description": "Leadership enablement and staff training with adoption plans, policy templates, and measurable capability uplift."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "Voxify - AI Voice Agent",
            "url": "https://voxify.intellectsai.au/",
            "applicationCategory": "BusinessApplication",
            "description": "Voxify is an AI-powered voice agent that handles calls, answers questions, and automates phone interactions for Australian businesses."
          }
        }
      ]
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": "+61 8 6171 2665",
      "areaServed": "AU",
      "availableLanguage": ["en"],
      "url": "https://intellectsai.au/#contact"
    }]
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Voxify",
    "alternateName": "Voxify - AI Voice Agent",
    "url": "https://voxify.intellectsai.au/",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered voice agent for Australian businesses. Handles inbound and outbound calls, answers FAQs, and automates phone interactions 24/7.",
    "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" },
    "creator": {
      "@type": "Organization",
      "name": "Intellects AI",
      "url": "https://intellectsai.au"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Intellects AI",
    "url": "https://intellectsai.au/"
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <SEOHead
        title="AI & Automation Agency for Businesses in Australia"
        description="Intellects AI is an Australian AI and automation agency delivering intelligent automation, custom AI solutions, and AI training for businesses as well as education. We help organisations streamline processes, adopt AI responsibly, and improve operational efficiency."
        canonicalPath="/"
        jsonLd={homepageJsonLd}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <FeatureHighlight />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
