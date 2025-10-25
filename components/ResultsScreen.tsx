
import React from 'react';

interface ResultsScreenProps {
  score: number;
  onNext: () => void;
}

const getScoreTier = (score: number) => {
    if (score < 100) return { title: "Above Average", color: "text-blue-400" };
    if (score < 115) return { title: "High Average", color: "text-green-400" };
    if (score < 130) return { title: "Gifted", color: "text-yellow-400" };
    return { title: "Highly Gifted / Genius", color: "text-purple-400" };
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, onNext }) => {
    const { title, color } = getScoreTier(score);
  
    return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle className="text-brand-secondary" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                <circle
                    className="text-brand-accent"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * (score - 70)) / (145-70)} // Scale from 70 to 145
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
            </svg>
            <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-brand-light">{score}</span>
                <span className="text-sm text-brand-light/70">IQ Score</span>
            </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
        <p className={`text-xl font-semibold mb-6 ${color}`}>{title}</p>
        
        <div className="animate-slide-up w-full max-w-xs">
            <p className="text-brand-light/70 mb-8">
                You've proven your brilliance. Now, let's find someone who can keep up.
            </p>
            <button
                onClick={onNext}
                className="w-full bg-brand-accent text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-brand-accent/30 hover:bg-red-500 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
            >
                Create Your Profile
            </button>
        </div>
    </div>
  );
};

export default ResultsScreen;
