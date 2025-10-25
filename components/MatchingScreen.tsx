
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface MatchingScreenProps {
  currentUser: UserProfile;
}

// Mock data for potential matches
const mockMatches: Omit<UserProfile, 'bio'>[] = [
    { name: 'Sophia', photo: 'https://picsum.photos/400/600?random=10', iqScore: 135 },
    { name: 'Liam', photo: 'https://picsum.photos/400/600?random=11', iqScore: 128 },
    { name: 'Chloe', photo: 'https://picsum.photos/400/600?random=12', iqScore: 141 },
    { name: 'Ethan', photo: 'https://picsum.photos/400/600?random=13', iqScore: 132 },
    { name: 'Ava', photo: 'https://picsum.photos/400/600?random=14', iqScore: 125 },
];

const Header: React.FC<{ user: UserProfile }> = ({ user }) => (
    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-brand-accent" />
                <span className="font-bold">{user.name}</span>
            </div>
            <div className="flex items-center space-x-2 bg-brand-secondary/50 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm">IQ</span>
                <span className="font-bold text-brand-accent">{user.iqScore}</span>
            </div>
        </div>
    </div>
);

const MatchCard: React.FC<{ user: Omit<UserProfile, 'bio'>; onRemove: () => void }> = ({ user, onRemove }) => {
    return (
        <div className="absolute inset-0 bg-brand-secondary rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
            <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-3xl font-bold">{user.name}</h3>
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full w-fit mt-2">
                    <span className="text-sm">IQ Score</span>
                    <span className="font-bold text-brand-accent text-lg">{user.iqScore}</span>
                </div>
            </div>
        </div>
    );
};

const ActionButtons: React.FC<{ onDislike: () => void; onLike: () => void }> = ({ onDislike, onLike }) => (
    <div className="flex justify-center items-center space-x-8">
        <button onClick={onDislike} className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-red-500 hover:bg-white/20 transform hover:scale-110 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <button onClick={onLike} className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-green-400 hover:bg-white/20 transform hover:scale-110 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
);

const MatchingScreen: React.FC<MatchingScreenProps> = ({ currentUser }) => {
    const [matches, setMatches] = useState(mockMatches);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAction = () => {
        setCurrentIndex(prev => prev + 1);
    };

    const currentMatch = matches[currentIndex];

    return (
        <div className="flex flex-col h-full w-full relative">
            <Header user={currentUser} />
            <div className="flex-grow flex flex-col justify-center items-center p-4 pt-20 pb-4">
                <div className="relative w-full aspect-[3/4] max-w-full">
                    {currentMatch ? (
                        <MatchCard user={currentMatch} onRemove={handleAction} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center bg-brand-secondary rounded-2xl p-4">
                            <h3 className="text-2xl font-bold">That's everyone for now!</h3>
                            <p className="text-brand-light/70 mt-2">Check back later for new potential matches.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="py-6">
                {currentMatch && <ActionButtons onDislike={handleAction} onLike={handleAction} />}
            </div>
        </div>
    );
};

export default MatchingScreen;
