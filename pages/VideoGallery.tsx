import React from 'react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';

const VideoGallery: React.FC = () => {
  const { content, updateContent, isEditing } = useContent();

  const handleVideoUrlChange = (id: string, newUrl: string) => {
    // Simple conversion for standard YouTube links to embed format
    let embedUrl = newUrl;
    if (newUrl.includes('youtube.com/watch?v=')) {
        const videoId = newUrl.split('v=')[1]?.split('&')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (newUrl.includes('youtu.be/')) {
        const videoId = newUrl.split('youtu.be/')[1];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    const newVideos = content.videos.map(v => v.id === id ? { ...v, url: embedUrl } : v);
    updateContent('videos', newVideos);
  };

  return (
    <section id="video" className="py-24 bg-charcoal text-white relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl mb-4 text-white">Cinematic Films</h2>
          <p className="text-gray-400 uppercase tracking-[0.2em] text-sm">Relive the emotion in motion</p>
        </div>

        <div className="grid md:grid-cols-1 gap-16">
          {content.videos.map((video) => (
            <div key={video.id} className="w-full max-w-5xl mx-auto">
              <div className="relative pt-[56.25%] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-800">
                <iframe 
                  src={video.url} 
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-4">
                <EditableText
                   value={video.title}
                   onSave={(val) => {
                     const newVideos = content.videos.map(v => v.id === video.id ? { ...v, title: val } : v);
                     updateContent('videos', newVideos);
                   }}
                   tag="h3"
                   className="font-serif text-3xl text-gold-500"
                />
                
                {isEditing && (
                  <div className="w-full md:w-auto flex flex-col items-end">
                    <label className="text-[10px] uppercase text-gray-500 mb-1 font-bold">YouTube URL</label>
                    <input 
                      type="text" 
                      value={video.url}
                      onChange={(e) => handleVideoUrlChange(video.id, e.target.value)}
                      className="bg-gray-900 border border-gray-700 text-gray-300 text-xs p-2 rounded w-full md:w-80 focus:border-gold-500 outline-none"
                      placeholder="Paste YouTube Link Here"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
