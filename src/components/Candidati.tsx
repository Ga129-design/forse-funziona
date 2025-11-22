'use client';
import React from 'react';
import { useState, useEffect } from 'react';

// Dati dei candidati
const candidatiData = {
  istituto: [
    { nome: 'Turiaco', classe: '5Q', genere: 'M' as const },
    { nome: 'Auditore', classe: '5F', genere: 'M' as const },
    { nome: 'Sottosanti', classe: '5N', genere: 'M' as const },
    { nome: 'Trifirò', classe: '4G', genere: 'M' as const },
    { nome: 'Felicia', classe: '2Q', genere: 'M' as const },
    { nome: 'Costa', classe: '3D', genere: 'F' as const },
    { nome: 'Totaro', classe: '4Q', genere: 'M' as const },
    { nome: 'Puleo', classe: '4G', genere: 'F' as const }
  ],
  consulta: [
    { nome: 'Mangano', classe: '4Q', genere: 'M' as const },
    { nome: 'Lombardo', classe: '5N', genere: 'M' as const }
  ],
  garanzia: [
    { nome: 'Costanzo', classe: '5N', genere: 'M' as const },
    { nome: 'Mellusi', classe: '4Q', genere: 'M' as const },
    { nome: 'Mezzasalma', classe: '4M', genere: 'F' as const }
  ]
};

// Componente Avatar Femminile
const FemaleAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="48" fill="#fce4ec" stroke="#e91e63" strokeWidth="2"/>
    <circle cx="50" cy="35" r="15" fill="#ffdbcb"/>
    <path d="M25 75 Q50 60 75 75" fill="#ffdbcb"/>
    <circle cx="42" cy="32" r="2" fill="#333"/>
    <circle cx="58" cy="32" r="2" fill="#333"/>
    <path d="M45 40 Q50 42 55 40" stroke="#333" strokeWidth="1" fill="none"/>
    <path d="M30 25 Q50 15 70 25" fill="#8d6e63" stroke="#5d4037" strokeWidth="1"/>
    <path d="M35 70 Q50 65 65 70" fill="#e91e63" stroke="#c2185b" strokeWidth="1"/>
  </svg>
);

// Componente Avatar Maschile
const MaleAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="48" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2"/>
    <circle cx="50" cy="35" r="15" fill="#ffdbcb"/>
    <path d="M25 75 Q50 60 75 75" fill="#ffdbcb"/>
    <circle cx="42" cy="32" r="2" fill="#333"/>
    <circle cx="58" cy="32" r="2" fill="#333"/>
    <path d="M45 40 Q50 42 55 40" stroke="#333" strokeWidth="1" fill="none"/>
    <path d="M35 25 Q50 20 65 25" fill="#5d4037" stroke="#3e2723" strokeWidth="1"/>
    <path d="M35 70 Q50 65 65 70" fill="#2196f3" stroke="#1976d2" strokeWidth="1"/>
  </svg>
);

// Componente Avatar del Candidato
interface CandidatoAvatarProps {
  candidato: { nome: string; classe: string; genere: 'M' | 'F' };
  size?: 'normal' | 'large';
}

const CandidatoAvatar: React.FC<CandidatoAvatarProps> = ({ candidato, size = 'normal' }) => {
  const [useAvatar, setUseAvatar] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const avatarSize = size === 'large' ? 'w-40 h-40' : 'w-24 h-24';
  const textSize = size === 'large' ? 'text-lg' : 'text-sm';
  const classeSize = size === 'large' ? 'text-base' : 'text-xs';
  
  // Genera il percorso dell'immagine
  const getImagePath = () => {
    // Prova diversi percorsi possibili
    const baseName = candidato.nome.toLowerCase().replace(/[àèéìòù]/g, (match) => {
      const replacements: { [key: string]: string } = {
        'à': 'a', 'è': 'e', 'é': 'e', 
        'ì': 'i', 'ò': 'o', 'ù': 'u'
      };
      return replacements[match] || match;
    });
    
    return `/images/candidati/${baseName}.jpg`;
  };
  
  // Gestisce l'errore di caricamento dell'immagine
  const handleImageError = () => {
    console.log(`Immagine non trovata per ${candidato.nome}, uso avatar SVG`);
    setUseAvatar(true);
  };
  
  // Gestisce il caricamento riuscito dell'immagine
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // Verifica se l'immagine esiste al mount del componente
  useEffect(() => {
  const getImagePath = () => {
    const baseName = candidato.nome.toLowerCase().replace(/[àèéìòù]/g, (match) => {
      const replacements: { [key: string]: string } = {
        'à': 'a', 'è': 'e', 'é': 'e', 
        'ì': 'i', 'ò': 'o', 'ù': 'u'
      };
      return replacements[match] || match;
    });
    
    return `/images/candidati/${baseName}.jpg`;
  };
  
  const img = new Image();
  img.src = getImagePath();
  
  img.onload = () => {
    setImageLoaded(true);
    setUseAvatar(false);
  };
  
  img.onerror = () => {
    setUseAvatar(true);
  };
}, [candidato.nome]);
  
  return (
    <div className="flex flex-col items-center">
      <div className={`${avatarSize} mb-2 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100`}>
        {!useAvatar ? (
          <img
            src={getImagePath()}
            alt={`Foto di ${candidato.nome}`}
            className={`w-full h-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full bg-white">
            {candidato.genere === 'F' ? <FemaleAvatar /> : <MaleAvatar />}
          </div>
        )}
        
        {/* Placeholder durante il caricamento */}
        {!useAvatar && !imageLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <p className={`${textSize} font-medium text-gray-800 text-center mb-1`}>
        {candidato.nome}
      </p>
      <p className={`${classeSize} text-gray-600 text-center`}>
        {candidato.classe}
      </p>
    </div>
  );
};

const Candidati = () => {
  return (
    <section id="candidati" className="py-16" style={{backgroundColor: '#f5f5f5'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            I nostri candidati
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Incontra il nostro team di candidati dedicati a rappresentare gli studenti e a migliorare la vita universitaria.
          </p>
        </div>

        {/* Sezioni dei candidati */}
        <div className="space-y-16">
          {/* Istituto */}
          <div className="mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">Istituto</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
              {candidatiData.istituto.map((candidato, index) => (
                <CandidatoAvatar key={`istituto-${index}`} candidato={candidato} />
              ))}
            </div>
          </div>

          {/* Consulta */}
          <div className="mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">Consulta</h3>
            <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
              {candidatiData.consulta.map((candidato, index) => (
                <CandidatoAvatar key={`consulta-${index}`} candidato={candidato} size="large" />
              ))}
            </div>
          </div>

          {/* Garanzia */}
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">Garanzia</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 justify-items-center max-w-md mx-auto">
              {candidatiData.garanzia.map((candidato, index) => (
                <CandidatoAvatar key={`garanzia-${index}`} candidato={candidato} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Pulsante Maggiori Informazioni */}
      <div className="mt-12 text-center">
        <button onClick={() => { if (typeof window !== 'undefined') { window.location.href = "/candidati";}}} 
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{
                backgroundColor: "#791A3C",
                boxShadow: "0 4px 6px rgba(121, 26, 60, 0.1)",
                }}>
            <span>Maggiori informazioni</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
        </button>
      </div>;
    </section>
  );
};

export default Candidati;