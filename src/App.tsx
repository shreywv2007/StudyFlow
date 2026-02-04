import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Landing } from './pages/Landing';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { DeadlineTracker } from './pages/DeadlineTracker';
import { StudyPlanner } from './pages/StudyPlanner';
import { GPACalculator } from './pages/GPACalculator';
import { NotesOrganizer } from './pages/NotesOrganizer';
import { Progress } from './pages/Progress';
import { Wellbeing } from './pages/Wellbeing';
import { Settings } from './pages/Settings';
import { AnimatePresence, motion } from 'framer-motion';
export function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignUp onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'deadlines':
        return <DeadlineTracker />;
      case 'planner':
        return <StudyPlanner />;
      case 'gpa':
        return <GPACalculator />;
      case 'notes':
        return <NotesOrganizer />;
      case 'progress':
        return <Progress />;
      case 'wellbeing':
        return <Wellbeing />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };
  const isAuthPage = ['landing', 'signup'].includes(currentPage);
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {!isAuthPage &&
      <Navigation activePage={currentPage} onNavigate={setCurrentPage} />
      }

      <main className={`${!isAuthPage ? 'md:pl-64 pb-20 md:pb-0' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{
              duration: 0.3
            }}>

            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>);

}