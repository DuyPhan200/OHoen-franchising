import { Routes, Route, useNavigate } from 'react-router-dom';
import FranchisePage from './components/FranchisePage';
import './App.css';

/**
 * Franchise page route component
 * Requirements: 11.6
 */
function FranchiseRoute() {
  return (
    <FranchisePage />
  );
}

/**
 * Main application component with routing
 * Default route is /franchise page
 * Requirements: 1.3, 2.3, 3.3, 3.4, 5.2, 11.6
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FranchiseRoute />} />
        <Route path="/franchise" element={<FranchiseRoute />} />
      </Routes>
    </div>
  );
}

export default App;
