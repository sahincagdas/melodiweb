
export interface SongProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

export enum Page {
  Home = 'home',
  Catalog = 'catalog',
  AIComposer = 'ai-composer',
  Pricing = 'pricing',
  Contact = 'contact',
  Order = 'order'
}
