
import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import IQTest from './components/IQTest';
import ResultsScreen from './components/ResultsScreen';
import ProfileCreation from './components/ProfileCreation';
import MatchingScreen from './components/MatchingScreen';
import { AppState, UserProfile } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [iqScore, setIqScore] = useState<number>(0);

  const handleTestStart = useCallback(() => {
    setAppState('testing');
  }, []);

  const handleTestComplete = useCallback((score: number) => {
    setIqScore(score);
    setAppState('results');
  }, []);

  const handleProfileCreationStart = useCallback(() => {
    setAppState('profile-creation');
  }, []);
  
  const handleProfileCreated = useCallback((profile: Omit<UserProfile, 'iqScore'>) => {
    setUserProfile({ ...profile, iqScore });
    setAppState('matching');
  }, [iqScore]);

  const renderContent = () => {
    switch (appState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleTestStart} />;
      case 'testing':
        return <IQTest onTestComplete={handleTestComplete} />;
      case 'results':
        return <ResultsScreen score={iqScore} onNext={handleProfileCreationStart} />;
      case 'profile-creation':
        return <ProfileCreation onProfileCreated={handleProfileCreated} />;
      case 'matching':
        return userProfile ? <MatchingScreen currentUser={userProfile} /> : <WelcomeScreen onStart={handleTestStart} />;
      default:
        return <WelcomeScreen onStart={handleTestStart} />;
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center font-sans overflow-hidden">
      <div className="relative w-full h-full sm:w-[400px] sm:h-[800px] sm:max-h-full bg-brand-primary sm:rounded-3xl sm:shadow-2xl sm:shadow-brand-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-bg to-brand-secondary opacity-50"></div>
        <div className="relative w-full h-full overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default App;
