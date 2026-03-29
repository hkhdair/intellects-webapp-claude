import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToHash from './components/ScrollToHash';

const HomePage = lazy(() => import('./components/HomePage'));
const Unsubscribe = lazy(() => import('./components/Unsubscribe'));
const BusinessProcessAutomation = lazy(() => import('./pages/services/BusinessProcessAutomation'));
const CustomAISolutions = lazy(() => import('./pages/services/CustomAISolutions'));
const TrainingSupport = lazy(() => import('./pages/services/TrainingSupport'));
const AssessmentPage = lazy(() => import('./pages/assessment/AssessmentPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Suspense fallback={<div className="min-h-screen bg-background-dark" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/services/business-process-automation" element={<BusinessProcessAutomation />} />
          <Route path="/services/custom-ai-solutions" element={<CustomAISolutions />} />
          <Route path="/services/training-support" element={<TrainingSupport />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
