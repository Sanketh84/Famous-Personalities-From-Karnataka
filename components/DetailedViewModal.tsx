import React from 'react';
import { ModalData } from '../types';

interface DetailedViewModalProps {
    modalData: ModalData;
    isLoading: boolean;
    onClose: () => void;
}

const DetailedViewModal: React.FC<DetailedViewModalProps> = ({ modalData, isLoading, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative">
          <img src={modalData.image} alt={modalData.name} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <h2 className="absolute bottom-0 left-0 p-6 text-4xl font-bold text-white">{modalData.name}</h2>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors"
          >
            &times;
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{modalData.details}</p>
          )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
       `}</style>
    </div>
  );
};

export default DetailedViewModal;
