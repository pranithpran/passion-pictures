import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

const Gallery: React.FC = () => {
  const { content, addImage, deleteImage, isEditing } = useContent();
  const [activeTab, setActiveTab] = useState<'all' | 'wedding' | 'portrait' | 'event'>('all');

  const filteredImages = activeTab === 'all' 
    ? content.gallery 
    : content.gallery.filter(img => img.category === activeTab);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addImage({
          id: Date.now().toString(),
          url: reader.result as string,
          caption: 'New Memory',
          category: 'wedding' // Default, can be improved to have a selector
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 md:px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-6">
        <div>
          <h2 className="font-serif text-5xl mb-4 text-charcoal">Selected Works</h2>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            {['all', 'wedding', 'portrait', 'event'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 transition-colors relative ${activeTab === tab ? 'text-gold-600' : 'hover:text-charcoal'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-600"></div>}
              </button>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="flex flex-col gap-2 mt-6 md:mt-0">
            <label className="bg-charcoal text-white px-8 py-3 uppercase text-xs font-bold tracking-[0.2em] cursor-pointer hover:bg-gold-600 transition-colors text-center shadow-lg">
              + Upload Photo
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
            <p className="text-[10px] text-gray-400 text-center">Max 5MB. Jpeg/Png</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredImages.map((img) => (
          <div key={img.id} className="group relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-500">
            <img 
              src={img.url} 
              alt={img.caption} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
            />
            
            {/* Overlay for viewing caption */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
              <span className="text-white font-serif text-2xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{img.caption}</span>
              <span className="text-gold-400 text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">{img.category}</span>
            </div>

            {isEditing && (
              <button 
                onClick={() => deleteImage(img.id)}
                className="absolute top-4 right-4 bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Photo"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        
        {filteredImages.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 italic font-serif text-xl">
            No images in this category yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
