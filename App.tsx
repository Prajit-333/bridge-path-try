
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashView from './views/SplashView';
import LoginView from './views/LoginView';
import ChildDashboard from './views/child/ChildDashboard';
import AACBoard from './views/child/AACBoard';
import SpeechPractice from './views/child/SpeechPractice';
import LearningGames from './views/child/LearningGames';
import ChildProgress from './views/child/ChildProgress';
import ParentDashboard from './views/parent/ParentDashboard';
import TherapistDashboard from './views/therapist/TherapistDashboard';
import StudentProfile from './views/therapist/StudentProfile';
import AdminDashboard from './views/admin/AdminDashboard';
import { UserRole } from './types';

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Simulate initialization
    const timer = setTimeout(() => setIsInitializing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return <SplashView />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginView onLogin={(role) => setUserRole(role)} />} />
        
        {/* Child Routes */}
        <Route path="/child" element={userRole === 'Child' ? <ChildDashboard /> : <Navigate to="/login" />} />
        <Route path="/child/aac" element={<AACBoard />} />
        <Route path="/child/speech" element={<SpeechPractice />} />
        <Route path="/child/games" element={<LearningGames />} />
        <Route path="/child/progress" element={<ChildProgress />} />

        {/* Parent Routes */}
        <Route path="/parent" element={userRole === 'Parent' ? <ParentDashboard /> : <Navigate to="/login" />} />

        {/* Therapist Routes */}
        <Route path="/therapist" element={userRole === 'Therapist' ? <TherapistDashboard /> : <Navigate to="/login" />} />
        <Route path="/therapist/student/:id" element={<StudentProfile />} />

        {/* Admin Routes */}
        <Route path="/admin" element={userRole === 'Admin' ? <AdminDashboard /> : <Navigate to="/login" />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
