import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AppLayout = lazy(() => import('./pages/AppLayout'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
