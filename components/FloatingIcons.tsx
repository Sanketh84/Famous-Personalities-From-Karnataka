import React from 'react';

const icons = [
  'M12 6v6m0 0v6m0-6h6m-6 0H6', // Plus
  'M13 10V3L4 14h7v7l9-11h-7z', // Lightning Bolt
  'M5 12h14', // Minus
  'M15 12a3 3 0 11-6 0 3 3 0 016 0z', // Circle (part of another icon)
  'M12 18h.01' // Dot
];

const FloatingIcons: React.FC = () => {
  const iconCount = 20;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {Array.from({ length: iconCount }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 10}s`,
          animationDelay: `${Math.random() * 10}s`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`,
          opacity: Math.random() * 0.5 + 0.2,
        };
        const iconPath = icons[Math.floor(Math.random() * icons.length)];

        return (
          <div key={i} className="absolute top-[-10%] animate-drop" style={style}>
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d={iconPath}
              />
            </svg>
          </div>
        );
      })}
      <style>{`
        @keyframes drop {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-drop {
          animation-name: drop;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingIcons;
