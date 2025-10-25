
import React, { useState, useEffect, useCallback } from 'react';
import { generateIQQuestions } from '../services/geminiService';
import { IQQuestion } from '../types';
import { TOTAL_QUESTIONS, TEST_DURATION_SECONDS } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface IQTestProps {
    onTestComplete: (score: number) => void;
}

const Timer: React.FC<{ timeLeft: number }> = ({ timeLeft }) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
        <div className="text-lg font-semibold text-brand-accent">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    );
};

const Question: React.FC<{ question: IQQuestion; onAnswer: (isCorrect: boolean) => void; }> = ({ question, onAnswer }) => {
    const [selected, setSelected] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        if (selected !== null) return;
        setSelected(index);
        setTimeout(() => {
            onAnswer(index === question.correctAnswerIndex);
            setSelected(null);
        }, 500);
    };

    return (
        <div className="flex flex-col items-center w-full animate-fade-in">
            <p className="text-sm font-medium text-brand-light/60 mb-2">{question.questionType}</p>
            {question.imageUrl && (
                <img src={question.imageUrl} alt="Question visual" className="rounded-lg mb-4 w-full h-auto max-h-48 object-cover" />
            )}
            <p className="text-lg text-center font-medium text-brand-light mb-6">{question.questionText}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {question.options.map((option, index) => {
                    const isSelected = selected === index;
                    const isCorrect = isSelected && index === question.correctAnswerIndex;
                    const isIncorrect = isSelected && index !== question.correctAnswerIndex;

                    return (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            disabled={selected !== null}
                            className={`p-4 rounded-lg text-left transition-all duration-300
                                ${isCorrect ? 'bg-green-500' : ''}
                                ${isIncorrect ? 'bg-red-500' : ''}
                                ${!isSelected ? 'bg-brand-secondary hover:bg-brand-secondary/70' : ''}
                                ${selected !== null ? 'cursor-not-allowed' : ''}
                            `}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};


const IQTest: React.FC<IQTestProps> = ({ onTestComplete }) => {
    const [questions, setQuestions] = useState<IQQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await generateIQQuestions();
                setQuestions(fetchedQuestions);
            } catch (err) {
                setError('Failed to load questions. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const finishTest = useCallback(() => {
        const score = 85 + Math.round((correctAnswers / TOTAL_QUESTIONS) * 60);
        onTestComplete(Math.min(score, 145)); // Cap score at 145 for realism
    }, [correctAnswers, onTestComplete]);
    
    useEffect(() => {
        if (!isLoading && questions.length > 0) {
            if (timeLeft === 0 || currentQuestionIndex >= TOTAL_QUESTIONS) {
                finishTest();
                return;
            }
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, currentQuestionIndex, isLoading, questions.length, finishTest]);

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setCorrectAnswers(count => count + 1);
        }
        setCurrentQuestionIndex(index => index + 1);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4">
                <LoadingSpinner />
                <p className="mt-4 text-brand-light/80">Generating your unique test...</p>
            </div>
        );
    }

    if (error) {
        return <div className="flex items-center justify-center h-full p-4 text-red-400">{error}</div>;
    }

    if (questions.length === 0) {
        return <div className="flex items-center justify-center h-full p-4">No questions available.</div>;
    }

    const progress = (currentQuestionIndex / TOTAL_QUESTIONS) * 100;
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex flex-col h-full p-6">
            <header className="flex items-center justify-between mb-6">
                <div className="text-sm font-medium">Question {currentQuestionIndex + 1}/{TOTAL_QUESTIONS}</div>
                <Timer timeLeft={timeLeft} />
            </header>
            
            <div className="w-full bg-brand-secondary rounded-full h-2.5 mb-6">
                <div className="bg-brand-accent h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>

            <main className="flex-grow flex items-center justify-center">
                {currentQuestion && <Question question={currentQuestion} onAnswer={handleAnswer} />}
            </main>
        </div>
    );
};

export default IQTest;
