import { Routes, Route, useNavigate } from 'react-router-dom';
import FranchisePage from './components/FranchisePage';
import './App.css';

/**
 * Franchise page route component
 * Requirements: 11.6
 */
function FranchiseRoute() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <FranchisePage
      heroImageSrc="/herosection.png"
      heroImageAlt="Vietnamese cuisine including bánh mì, phở, and chả giò"
      onNavigate={handleNavigate}
    />
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
