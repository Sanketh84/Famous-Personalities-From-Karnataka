import { Personality } from './types';

export const PERSONALITIES: { [key: string]: Personality } = {
  'sir m. visvesvaraya': {
    name: 'Sir M. Visvesvaraya',
    image: 'https://www.priyakrishna.com/uploads/news_events/c743738631c1bc4584279dbfb37093fc.jpg'
  },
  'kuvempu': {
    name: 'Kuvempu',
    image: 'https://www.karnataka.com/wp-content/uploads/2011/10/kuvempu.jpg'
  },
  'dr. rajkumar': {
    name: 'Dr. Rajkumar',
    image: 'https://i.pinimg.com/474x/0c/3b/29/0c3b2946e8d49e2a4b3ab21035e78b1d.jpg'
  },
  'sudha murthy': {
    name: 'Sudha Murthy',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEl53XCG_Lx7QjHQRA3ey0uMPtUMPMqCWxLw&s'
  },
  'd. r. bendre': {
    name: 'D. R. Bendre',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/%E0%B2%A6._%E0%B2%B0%E0%B2%BE._%E0%B2%AC%E0%B3%87%E0%B2%82%E0%B2%A6%E0%B3%8D%E0%B2%B0%E0%B3%86_-_2.jpg/330px-%E0%B2%A6._%E0%B2%B0%E0%B2%BE._%E0%B2%AC%E0%B3%87%E0%B2%82%E0%B2%A6%E0%B3%8D%E0%B2%B0%E0%B3%86_-_2.jpg'
  },
  's. nijalingappa': {
    name: 'S. Nijalingappa',
    image: 'https://www.constitutionofindia.net/wp-content/uploads/2023/01/S-Nijalingappa.jpg'
  },
  'k. shivaram karanth': {
    name: 'K. Shivaram Karanth',
    image: 'https://i.pinimg.com/474x/93/ae/72/93ae72805bbd379df9271915357eac25.jpg'
  },
  'r. k. narayan': {
    name: 'R. K. Narayan',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP11txJkEC9lvdoG0zzlj7M2Tej66OSozPlQ&s'
  }
};

export const PERSONALITY_NAMES = Object.values(PERSONALITIES).map(p => p.name);