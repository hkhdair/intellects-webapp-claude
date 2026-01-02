import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Unsubscribe from './components/Unsubscribe';
import JobsScreeningPage from './components/JobsScreeningPage';
import ScrollToHash from './components/ScrollToHash';
import BusinessProcessAutomation from './pages/services/BusinessProcessAutomation';
import CustomAISolutions from './pages/services/CustomAISolutions';
import TrainingSupport from './pages/services/TrainingSupport';

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/job_screening" element={<JobsScreeningPage />} />
        <Route path="/services/business-process-automation" element={<BusinessProcessAutomation />} />
        <Route path="/services/custom-ai-solutions" element={<CustomAISolutions />} />
        <Route path="/services/training-support" element={<TrainingSupport />} />
      </Routes>
    </Router>
  );
}

export default App;