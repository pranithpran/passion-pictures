import React from 'react';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';

const Services: React.FC = () => {
  const { content, updateService, isEditing } = useContent();

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl mb-4 text-charcoal">Investment</h2>
          <p className="text-gold-600 uppercase tracking-[0.2em] text-sm font-bold">Transparent Packages</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {content.services.map((service, index) => (
            <div key={service.id} className="bg-white p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-gold-500 flex flex-col items-center text-center">
              <EditableText
                value={service.title}
                onSave={(val) => updateService(index, { ...service, title: val })}
                tag="h3"
                className="font-serif text-3xl mb-4 text-charcoal"
              />
              <EditableText
                value={service.price}
                onSave={(val) => updateService(index, { ...service, price: val })}
                tag="div"
                className="text-gold-600 text-4xl font-bold mb-6 font-serif"
              />
              <div className="w-12 h-[1px] bg-gray-200 mb-6"></div>
              <EditableText
                value={service.description}
                onSave={(val) => updateService(index, { ...service, description: val })}
                tag="p"
                multiline
                className="text-gray-500 mb-8 leading-relaxed"
              />
              
              <ul className="space-y-4 mb-10 w-full text-left">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-600 tracking-wide">
                    <span className="text-gold-500 mr-3 text-lg">✦</span>
                    {isEditing ? (
                      <input 
                        className="w-full border-b border-gray-200 outline-none focus:border-gold-500"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...service.features];
                          newFeatures[fIndex] = e.target.value;
                          updateService(index, { ...service, features: newFeatures });
                        }}
                      />
                    ) : (
                      feature
                    )}
                  </li>
                ))}
              </ul>

              <button className="mt-auto bg-charcoal text-white px-8 py-3 uppercase text-xs font-bold tracking-[0.2em] hover:bg-gold-600 transition-colors w-full">
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
