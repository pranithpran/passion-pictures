export interface SiteContent {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
  };
  about: {
    title: string;
    bio: string;
    image: string;
  };
  services: ServiceItem[];
  gallery: ImageItem[];
  videos: VideoItem[];
  contact: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
    whatsapp: string;
    facebook: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
}

export interface ImageItem {
  id: string;
  url: string; // Base64 or URL
  caption: string;
  category: 'wedding' | 'portrait' | 'event';
}

export interface VideoItem {
  id: string;
  url: string; // Embed URL or video file URL
  title: string;
}

export interface InboxMessage {
  id: string;
  name: string;
  date: string;
  message: string;
  timestamp: number;
}
