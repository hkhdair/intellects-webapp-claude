import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import AssessmentWizard from './components/AssessmentWizard';
import { useAssessment } from './useAssessment';

const assessmentJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free AI & Automation Readiness Assessment | Intellects AI",
    "url": "https://intellectsai.au/assessment",
    "description": "Take our free assessment to discover how AI and automation can transform your business. No signup required, instant results, 100% confidential.",
    "isPartOf": { "@id": "https://intellectsai.au/" },
    "breadcrumb": { "@id": "https://intellectsai.au/assessment#breadcrumb" }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://intellectsai.au/assessment#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://intellectsai.au/" },
      { "@type": "ListItem", "position": 2, "name": "Free AI Readiness Assessment", "item": "https://intellectsai.au/assessment" }
    ]
  }
];

const AssessmentPage: React.FC = () => {
  const assessment = useAssessment();

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <SEOHead
        title="Free AI & Automation Readiness Assessment"
        description="Take our free assessment to discover how AI and automation can transform your business. No signup required, instant results, 100% confidential."
        canonicalPath="/assessment"
        jsonLd={assessmentJsonLd}
      />
      <Header />

      <main className="flex-1 pt-24">
        <div className="bg-background-light/50 py-3 border-b border-gray-800">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <span className="text-green-400">✓</span> No signup required
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-400">✓</span> 100% confidential
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Instant results
              </span>
            </div>
          </div>
        </div>

        <AssessmentWizard assessment={assessment} />
      </main>

      <Footer />
    </div>
  );
};

export default AssessmentPage;
