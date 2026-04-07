import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppLayout />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
