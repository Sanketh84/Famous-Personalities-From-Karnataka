import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  onReadMore: (personalityName: string) => void;
  isLoading: boolean;
}

const BotMessage: React.FC<{ message: ChatMessage; onReadMore: (name: string) => void }> = ({ message, onReadMore }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
      K
    </div>
    <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 max-w-md">
      {message.image && (
        <img src={message.image} alt={message.personalityName} className="rounded-lg mb-2 w-full max-h-60 object-cover" />
      )}
      <p className="text-gray-800 text-sm leading-relaxed">{message.text}</p>
      {message.personalityName && (
        <button
          onClick={() => onReadMore(message.personalityName!)}
          className="mt-3 bg-red-600 text-white text-xs font-semibold py-1 px-3 rounded-full hover:bg-red-700 transition-colors duration-200"
        >
          Elaborate
        </button>
      )}
    </div>
  </div>
);

const UserMessage: React.FC<{ message: ChatMessage }> = ({ message }) => (
  <div className="flex justify-end">
    <div className="bg-yellow-400 text-gray-900 rounded-xl rounded-tr-none p-3 max-w-md">
      <p className="text-sm leading-relaxed">{message.text}</p>
    </div>
  </div>
);

const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex-shrink-0 flex items-center justify-center text-white font-bold">K</div>
        <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
    </div>
);


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onReadMore, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
      {messages.map((msg) =>
        msg.sender === 'bot' ? (
          <BotMessage key={msg.id} message={msg} onReadMore={onReadMore} />
        ) : (
          <UserMessage key={msg.id} message={msg} />
        )
      )}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatWindow;
