import { Routes, Route, useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FranchisePage from './components/FranchisePage';
import './App.css';

/**
 * Homepage component
 * Requirements: 1.3, 2.3, 3.3, 3.4, 5.2
 */
function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <main id="main-content">
      <HeroSection
        title="Welcome to Bún Mee"
        heroImageSrc="/hero-image.jpg"
        heroImageAlt="Delicious Vietnamese dishes including phở, bánh mì, and chả giò"
        onNavigate={handleNavigate}
      />
    </main>
  );
}

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
