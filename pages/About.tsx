import React from 'react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';

const About: React.FC = () => {
  const { content, updateContent, isEditing } = useContent();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent('about', { image: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <section id="about" className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 relative group">
          <div className="relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 border-4 border-gold-500 translate-x-4 translate-y-4 -z-10"></div>
             <img 
              src={content.about.image} 
              alt="Photographer" 
              className="w-full h-auto object-cover aspect-[3/4]"
            />
          </div>
          {isEditing && (
            <label className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-wide rounded cursor-pointer shadow-lg hover:bg-gold-500 hover:text-white transition-colors">
              Change Photo
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          )}
        </div>

        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <EditableText
            value={content.about.title}
            onSave={(val) => updateContent('about', { title: val })}
            tag="h2"
            className="font-serif text-5xl md:text-6xl text-charcoal leading-tight"
          />
          
          <div className="w-20 h-1 bg-gold-500 mx-auto md:mx-0"></div>
          
          <EditableText
            value={content.about.bio}
            onSave={(val) => updateContent('about', { bio: val })}
            tag="div"
            multiline
            className="text-gray-600 leading-loose text-lg font-light font-sans"
            label="Biography"
          />

          <div className="pt-8">
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-12 opacity-50 mx-auto md:mx-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
