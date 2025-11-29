import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SiteContent, ServiceItem, ImageItem, VideoItem, InboxMessage } from '../types';

// Initial default content
const defaultContent: SiteContent = {
  home: {
    heroTitle: "Capturing Life's Eternal Moments",
    heroSubtitle: "Premium Wedding & Lifestyle Photography",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  },
  about: {
    title: "About Passion Pictures",
    bio: "We are a team of dedicated photographers passionate about storytelling. Every click is a memory preserved for eternity. With over 10 years of experience in capturing the subtle nuances of human emotion, we turn fleeting moments into everlasting art.",
    image: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1935&auto=format&fit=crop",
  },
  services: [
    {
      id: '1',
      title: 'Golden Wedding Package',
      price: '$2,500',
      description: 'Perfect for intimate ceremonies. Includes full day coverage with 2 photographers to capture every angle.',
      features: ['10 Hours Coverage', 'Online Gallery', 'Hardcover Album']
    },
    {
      id: '2',
      title: 'Diamond Wedding Package',
      price: '$4,000',
      description: 'The ultimate luxury experience for grand celebrations. We ensure no moment is missed.',
      features: ['Unlimited Hours', 'Drone Videography', '3 Albums', 'Engagement Shoot']
    }
  ],
  gallery: [
    { id: '1', url: 'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop', caption: 'Sunset Vows', category: 'wedding' },
    { id: '2', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop', caption: 'The First Dance', category: 'wedding' },
    { id: '3', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop', caption: 'Bridal Portrait', category: 'portrait' },
    { id: '4', url: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop', caption: 'Reception Joy', category: 'event' },
  ],
  videos: [
    { id: 'v1', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', title: 'Highlight Reel 2024' }
  ],
  contact: {
    email: "contact@passionpictures.com",
    phone: "+1 (555) 123-4567",
    address: "123 Creative Studio Blvd, Art City",
    instagram: "https://instagram.com/passionpictures",
    whatsapp: "https://wa.me/15551234567",
    facebook: "https://facebook.com/passionpictures",
  }
};

interface ContentContextType {
  content: SiteContent;
  messages: InboxMessage[];
  isEditing: boolean;
  isAuthenticated: boolean;
  toggleEditing: () => void;
  login: (password: string) => boolean;
  logout: () => void;
  updateContent: (section: keyof SiteContent, data: any) => void;
  updateService: (index: number, service: ServiceItem) => void;
  addImage: (image: ImageItem) => void;
  updateImage: (id: string, newUrl: string) => void;
  deleteImage: (id: string) => void;
  submitMessage: (msg: Omit<InboxMessage, 'id' | 'timestamp'>) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children?: ReactNode }) => {
  // Load content from local storage or use default
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const [messages, setMessages] = useState<InboxMessage[]>(() => {
    const savedMessages = localStorage.getItem('siteMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync to local storage whenever content changes
  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('siteMessages', JSON.stringify(messages));
  }, [messages]);

  const toggleEditing = () => setIsEditing(prev => !prev);

  const login = (password: string) => {
    // Check against the owner password
    if (password === "76600@vara") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsEditing(false);
  };

  const updateContent = (section: keyof SiteContent, data: any) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const updateService = (index: number, service: ServiceItem) => {
    const newServices = [...content.services];
    newServices[index] = service;
    setContent(prev => ({ ...prev, services: newServices }));
  };

  const addImage = (image: ImageItem) => {
    setContent(prev => ({ ...prev, gallery: [image, ...prev.gallery] }));
  };

  const updateImage = (id: string, newUrl: string) => {
    setContent(prev => ({
      ...prev,
      gallery: prev.gallery.map(img => img.id === id ? { ...img, url: newUrl } : img)
    }));
  };

  const deleteImage = (id: string) => {
    setContent(prev => ({
      ...prev,
      gallery: prev.gallery.filter(img => img.id !== id)
    }));
  };

  const submitMessage = (msg: Omit<InboxMessage, 'id' | 'timestamp'>) => {
    const newMessage: InboxMessage = {
      ...msg,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const resetContent = () => {
    if (window.confirm("Are you sure you want to reset all content to default? This cannot be undone.")) {
      setContent(defaultContent);
      localStorage.removeItem('siteContent');
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      messages,
      isEditing,
      isAuthenticated, 
      toggleEditing, 
      login,
      logout,
      updateContent, 
      updateService,
      addImage,
      updateImage,
      deleteImage,
      submitMessage,
      resetContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within a ContentProvider");
  return context;
};