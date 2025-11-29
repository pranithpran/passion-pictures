import React from 'react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';

const Home: React.FC = () => {
  const { content, updateContent, isEditing } = useContent();

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent('home', { heroImage: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <section 
      id="home"
      className="relative h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${content.home.heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      {isEditing && (
        <div className="absolute top-4 right-4 z-20">
          <label className="bg-white text-black px-4 py-2 rounded shadow cursor-pointer text-xs font-bold uppercase tracking-wide hover:bg-gold-400 hover:text-white transition-colors">
            Upload Cover Photo
            <input type="file" className="hidden" accept="image/*" onChange={handleBgChange} />
          </label>
        </div>
      )}

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto flex flex-col items-center">
        <EditableText
          value={content.home.heroTitle}
          onSave={(val) => updateContent('home', { heroTitle: val })}
          tag="h1"
          className="font-serif text-5xl md:text-8xl mb-6 leading-none drop-shadow-xl"
          label="Hero Headline"
        />
        
        <div className="w-24 h-1 bg-gold-500 mb-8"></div>

        <EditableText
          value={content.home.heroSubtitle}
          onSave={(val) => updateContent('home', { heroSubtitle: val })}
          tag="p"
          className="font-sans text-lg md:text-2xl font-light tracking-[0.2em] uppercase opacity-90 mb-10"
          label="Subtitle"
        />
        
        <div>
          <a href="#contact" className="inline-block border-2 border-white text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-black transition-all duration-300">
            Book Your Session
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
