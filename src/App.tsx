import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Unsubscribe from './components/Unsubscribe';
import JobsScreeningPage from './components/JobsScreeningPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/job_screening" element={<JobsScreeningPage />} />
      </Routes>
    </Router>
  );
}

export default App;