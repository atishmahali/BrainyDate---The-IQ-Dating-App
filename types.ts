
export type AppState = 'welcome' | 'testing' | 'results' | 'profile-creation' | 'matching';

export interface IQQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  questionType: string;
  imageUrl?: string | null;
}

export interface UserProfile {
  name: string;
  photo: string; // Base64 encoded string or a URL
  bio: string;
  iqScore: number;
}
