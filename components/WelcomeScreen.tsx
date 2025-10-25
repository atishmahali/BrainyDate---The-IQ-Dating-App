
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-brand-accent mb-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.29 15.58c-.83.35-1.74.52-2.71.52-2.76 0-5-2.24-5-5s2.24-5 5-5c.97 0 1.88.17 2.71.52.2.09.43.14.65.14.55 0 1-.45 1-1s-.45-1-1-1c-1.12-.45-2.34-.7-3.65-.7-3.86 0-7 3.14-7 7s3.14 7 7 7c1.31 0 2.53-.25 3.65-.7.55-.22 1.05-.68 1.3-1.24.25-.56.17-1.2-.21-1.69-.38-.49-1-.62-1.54-.39zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm3.29 8.58c.83-.35 1.74-.52 2.71-.52 2.76 0 5 2.24 5 5s-2.24 5-5 5c-.97 0-1.88-.17-2.71-.52-.2-.09-.43-.14-.65-.14-.55 0-1 .45-1 1s.45 1 1 1c1.12.45 2.34.7 3.65.7 3.86 0 7-3.14 7-7s-3.14-7-7-7c-1.31 0-2.53.25-3.65.7-.55.22-1.05.68-1.3 1.24-.25.56-.17-1.2.21-1.69.38-.49 1 .62 1.54.39z" />
    </svg>
);


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
      <BrainIcon />
      <h1 className="text-4xl font-bold text-brand-light mb-2">BrainyDate</h1>
      <p className="text-xl text-brand-light/80 mb-8">Find your intellectual match.</p>
      
      <div className="w-full max-w-xs space-y-4 animate-slide-up">
        <p className="text-brand-light/70">
          Ready to test your wits and connect with someone on your wavelength?
        </p>
        <button
          onClick={onStart}
          className="w-full bg-brand-accent text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-brand-accent/30 hover:bg-red-500 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
        >
          Start Your Brainy Journey
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
