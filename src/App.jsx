import { Routes, Route } from 'react-router-dom';
import LeadScoring from './LeadScoring';
import LeadScoringStandalone from './LeadScoringStandalone';

function App() {
  return (
    <Routes>
      <Route path="/test" element={<LeadScoring />} />
      <Route path="/embed" element={<LeadScoringStandalone />} />
    </Routes>
  );
}

export default App;

