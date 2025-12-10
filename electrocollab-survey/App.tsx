import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SurveyForm from './components/SurveyForm';
import Thanks from './components/Thanks';
import { DEMO_TRACKS } from './constants';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    // GitHub Pages Deployment Fix:
    // If the user lands on ".../qwq/" without a hash, force it to ".../qwq/#/"
    // This prevents relative path issues and ensures consistent routing state.
    if (!window.location.hash) {
        window.location.hash = '#/';
    }

    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neon-dark text-slate-200 font-sans selection:bg-neon-pink selection:text-white">
      {/* 
        Sidebar is kept outside the route switching logic for visual persistence,
        though on mobile it stacks on top. 
      */}
      <Sidebar tracks={DEMO_TRACKS} />

      <main className="flex-1 relative overflow-x-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(19,19,31,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(19,19,31,0.8)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

        {route === '#/thanks' ? (
          <Thanks />
        ) : (
          <SurveyForm />
        )}
      </main>
    </div>
  );
};

export default App;
