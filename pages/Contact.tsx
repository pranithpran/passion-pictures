import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';

const Contact: React.FC = () => {
  const { content, updateContent, submitMessage } = useContent();
  const [formData, setFormData] = useState({ name: '', date: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleUpdateContact = (field: string, value: string) => {
    updateContent('contact', { [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    submitMessage({
      name: formData.name,
      date: formData.date,
      message: formData.message
    });
    setSent(true);
    setFormData({ name: '', date: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-12 max-w-6xl mx-auto">
      <div className="bg-white shadow-2xl p-8 md:p-20 border-t-8 border-gold-500 flex flex-col md:flex-row gap-16">
        
        {/* Contact Info */}
        <div className="w-full md:w-1/3 space-y-8">
          <h2 className="font-serif text-4xl mb-8 text-charcoal">Get in Touch</h2>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-2 text-gold-600">Address</h4>
            <EditableText
              value={content.contact.address}
              onSave={(val) => handleUpdateContact('address', val)}
              className="text-lg text-gray-600 font-light"
            />
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-2 text-gold-600">Email</h4>
            <EditableText
              value={content.contact.email}
              onSave={(val) => handleUpdateContact('email', val)}
              className="text-lg text-gray-600 font-light"
            />
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-2 text-gold-600">Phone</h4>
            <EditableText
              value={content.contact.phone}
              onSave={(val) => handleUpdateContact('phone', val)}
              className="text-lg text-gray-600 font-light"
            />
          </div>
          
          <div className="pt-8 border-t border-gray-100">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-gray-400">Follow Us</h4>
            <div className="flex gap-4">
               <EditableText
                  value={content.contact.instagram}
                  onSave={(val) => handleUpdateContact('instagram', val)}
                  className="text-blue-600 text-sm truncate max-w-[200px]"
                  label="IG Link"
               />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-2/3">
          <h2 className="font-serif text-4xl mb-2 text-charcoal">Let's Create Magic</h2>
          <p className="text-gray-500 mb-8 font-light">Tell us about your day, we'd love to hear your story.</p>
          
          {sent ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded text-center">
              <p className="font-bold text-xl mb-2">Message Sent!</p>
              <p>Thank you for reaching out. We will view your message in our server and get back to you shortly.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-4 outline-none focus:border-gold-500 transition-colors" 
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-400 mb-2">Event Date</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-4 outline-none focus:border-gold-500 transition-colors" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-gray-400 mb-2">Message</label>
                <textarea 
                  rows={6} 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 p-4 outline-none focus:border-gold-500 transition-colors resize-none"
                  placeholder="Tell us about your vision..."
                ></textarea>
              </div>
              <button className="w-full bg-charcoal text-white uppercase tracking-[0.2em] py-4 text-xs font-bold hover:bg-gold-600 transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
