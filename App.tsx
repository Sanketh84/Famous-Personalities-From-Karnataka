import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';

import { ChatMessage, Personality, ModalData } from './types';
import { PERSONALITIES, PERSONALITY_NAMES } from './constants';
import { initializeChat, getChatResponse } from './services/geminiService';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import DetailedViewModal from './components/DetailedViewModal';
import FloatingIcons from './components/FloatingIcons';
import SuggestionChips from './components/SuggestionChips';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'landing' | 'chat'>('landing');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    chatRef.current = initializeChat();
  }, []);

  const findPersonalityInMessage = (message: string): Personality | undefined => {
    const lowerCaseMessage = message.toLowerCase();
    const foundKey = Object.keys(PERSONALITIES).find(key => lowerCaseMessage.includes(key));
    return foundKey ? PERSONALITIES[foundKey] : undefined;
  };

  const handleEnterChat = useCallback(async (personalityName?: string) => {
    setScreen('chat');

    if (personalityName) {
      setIsLoading(true);
      setMessages([]); // Start with an empty chat window

      try {
        if (!chatRef.current) {
          throw new Error('Chat not initialized');
        }
        
        const botResponseText = await getChatResponse(chatRef.current, `Briefly tell me about ${personalityName}.`);
        const personality = findPersonalityInMessage(personalityName);
  
        const botMessage: ChatMessage = {
          id: 'initial-personality',
          sender: 'bot',
          text: botResponseText,
          image: personality?.image,
          personalityName: personality?.name,
        };
        setMessages([botMessage]);
  
      } catch (error) {
        console.error('Error fetching initial personality info:', error);
        const errorMessage: ChatMessage = {
          id: 'initial-error',
          sender: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
        };
        setMessages([errorMessage]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Default entry via "Start Chatting" button
      setMessages([
        {
          id: 'initial-generic',
          sender: 'bot',
          text: "Hello! I can tell you about famous personalities from Karnataka. Who would you like to know about? Select one below or type a name.",
        },
      ]);
    }
  }, []);
  
  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        throw new Error('Chat not initialized');
      }
      
      const botResponseText = await getChatResponse(chatRef.current, `Briefly tell me about ${inputText}.`);
      const personality = findPersonalityInMessage(inputText);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        image: personality?.image,
        personalityName: personality?.name,
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleReadMore = useCallback(async (personalityName: string) => {
    const personality = findPersonalityInMessage(personalityName);
    if (!personality) return;

    setModalData({
        name: personality.name,
        image: personality.image,
        details: '',
    });
    setIsModalLoading(true);

    try {
      if (!chatRef.current) {
        throw new Error('Chat not initialized');
      }
      const detailedText = await getChatResponse(chatRef.current, `Give me an elaborated explanation about ${personalityName}.`);
      setModalData({
        name: personality.name,
        image: personality.image,
        details: detailedText,
      });
    } catch (error) {
       console.error('Error fetching details:', error);
       setModalData(prev => prev ? {...prev, details: 'Could not fetch details. Please try again.'} : null);
    } finally {
        setIsModalLoading(false);
    }

  }, []);

  const closeModal = () => {
    setModalData(null);
  };

  const handleGoBackToLanding = () => {
    setScreen('landing');
    setMessages([]); // Reset messages for a clean slate
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-yellow-400 to-red-600 font-sans">
      <FloatingIcons />
      
      {screen === 'landing' ? (
        <LandingPage onEnter={handleEnterChat} />
      ) : (
        <main className="relative z-10 flex flex-col h-full max-w-3xl mx-auto p-4 md:p-6 animate-chat-fade-in">
          <header className="relative flex-shrink-0 mb-4 text-center">
              <button
                  onClick={handleGoBackToLanding}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Go back to home"
                  title="Back to Home"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-white text-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                  Famous Personalities from Karnataka
              </h1>
              <p className="text-center text-white/90 text-lg mt-1">Your AI guide to the state's icons</p>
          </header>

          <div className="flex-grow bg-white/30 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/20">
              <ChatWindow messages={messages} onReadMore={handleReadMore} isLoading={isLoading} />
              <SuggestionChips suggestions={PERSONALITY_NAMES} onSuggestionClick={handleSendMessage} />
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
          <style>{`
            @keyframes chat-fade-in {
                from { opacity: 0; transform: scale(0.98); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-chat-fade-in { animation: chat-fade-in 0.5s ease-out forwards; }
          `}</style>
        </main>
      )}
      
      {modalData && (
        <DetailedViewModal 
            modalData={modalData}
            isLoading={isModalLoading}
            onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default App;