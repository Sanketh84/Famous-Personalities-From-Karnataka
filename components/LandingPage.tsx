import React from 'react';
import { PERSONALITIES } from '../constants';

interface LandingPageProps {
  onEnter: (personalityName?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const personalities = Object.values(PERSONALITIES);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4 text-center overflow-hidden">
        <header className="mb-8 animate-fade-in-down w-full max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-shadow-lg" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.5)'}}>
                Famous Personalities from Karnataka
            </h1>
            <p className="text-xl md:text-2xl mt-2 text-white/90">
                Explore the legacies of the state's icons.
            </p>
        </header>

        <div className="w-full flex-grow flex items-center justify-center">
            <div className="flex space-x-6 overflow-x-auto py-8 px-4 w-full snap-x snap-mandatory scrollbar-hide">
                {personalities.map((p, index) => (
                    <div 
                        key={p.name} 
                        className="snap-center flex-shrink-0 w-64 h-96 rounded-2xl shadow-xl group cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
                        style={{ animation: `fade-in-up 0.8s ease-out ${index * 100}ms backwards` }}
                        onClick={() => onEnter(p.name)}
                        title={`Learn about ${p.name}`}
                    >
                        <div 
                            style={{ backgroundImage: `url(${p.image})` }}
                            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="relative h-full flex flex-col justify-end p-6 text-left">
                            <h3 className="text-2xl font-bold text-white leading-tight">{p.name}</h3>
                            <p className="text-yellow-300 text-sm mt-1">Click to learn more</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-8 mb-4 animate-fade-in-up" style={{ animationDelay: `${personalities.length * 100}ms` }}>
            <button
                onClick={() => onEnter()}
                className="bg-white text-red-600 font-bold py-3 px-10 rounded-full text-lg shadow-xl hover:bg-yellow-200 transition-all duration-300 transform hover:scale-105"
            >
                Start General Chat
            </button>
        </div>

        <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            @keyframes fade-in-down {
                0% { opacity: 0; transform: translateY(-20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-down { animation-name: fade-in-down; animation-duration: 0.8s; animation-timing-function: ease-out; animation-fill-mode: forwards; }
            .animate-fade-in-up { animation-name: fade-in-up; animation-fill-mode: forwards; }
        `}</style>
    </div>
  );
};

export default LandingPage;
