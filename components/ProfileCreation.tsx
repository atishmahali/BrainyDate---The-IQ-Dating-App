
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';

interface ProfileCreationProps {
  onProfileCreated: (profile: Omit<UserProfile, 'iqScore'>) => void;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-light/50" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);


const ProfileCreation: React.FC<ProfileCreationProps> = ({ onProfileCreated }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && bio && photo) {
      onProfileCreated({ name, bio, photo });
    } else {
      alert("Please fill out all fields and upload a photo.");
    }
  };

  return (
    <div className="flex flex-col h-full p-6 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6">Create Your Profile</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-6">
        <div className="flex-grow space-y-6">
            <div className="flex justify-center">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 rounded-full bg-brand-secondary flex items-center justify-center overflow-hidden border-2 border-dashed border-brand-light/30 hover:border-brand-accent transition-colors"
                >
                    {photo ? (
                        <img src={photo} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                        <CameraIcon />
                    )}
                </button>
            </div>
        
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-light/80 mb-1">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-secondary p-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    placeholder="Your first name"
                    maxLength={20}
                />
            </div>
            
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-brand-light/80 mb-1">Your Bio</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-brand-secondary p-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-accent h-32 resize-none"
                    placeholder="A little something about you..."
                    maxLength={150}
                />
                <p className="text-right text-xs text-brand-light/50 mt-1">{bio.length}/150</p>
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-accent text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-brand-accent/30 hover:bg-red-500 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
          disabled={!name || !bio || !photo}
        >
          Find My Matches
        </button>
      </form>
    </div>
  );
};

export default ProfileCreation;
