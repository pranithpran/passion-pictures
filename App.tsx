import React from 'react';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import VideoGallery from './pages/VideoGallery';
import Contact from './pages/Contact';

function App() {
  return (
    <ContentProvider>
      <Layout>
        <Home />
        <About />
        <Services />
        <Gallery />
        <VideoGallery />
        <Contact />
      </Layout>
    </ContentProvider>
  );
}

export default App;
