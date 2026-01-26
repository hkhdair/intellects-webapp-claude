import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AssessmentWizard from './components/AssessmentWizard';
import { useAssessment } from './useAssessment';

const AssessmentPage: React.FC = () => {
  const assessment = useAssessment();

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
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
