export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  image?: string;
  personalityName?: string;
}

export interface Personality {
  name: string;
  image: string;
}

export interface ModalData {
  name: string;
  image: string;
  details: string;
}
