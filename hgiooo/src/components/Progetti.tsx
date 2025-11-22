'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Progetto {
  id: number;
  nome: string;
  descrizione: string;
  progresso: number;
  stato: 'In Corso' | 'Completato' | 'Pianificato';
  immagine?: string; // Nome del file immagine (opzionale)
}

const progetti: Progetto[] = [
  {
    id: 1,
    nome: "School Cup",
    descrizione: "Competizione Calcistica Con Montepremi",
    progresso: 50,
    stato: 'Pianificato',
    immagine: 'schoolcup.jpg' // Specifica il nome del file immagine
  },
  {
    id: 2,
    nome: "Card Horizon",
    descrizione: "Card Di Scontistiche Per Gli Studenti Della Nostra Scuola",
    progresso: 90,
    stato: 'In Corso',
    immagine: 'card.jpg'
  },
  {
    id: 3,
    nome: "Sport Day",
    descrizione: "Giornata Sportiva Con Altre Scuole Per Divertirci Insieme",
    progresso: 100,
    stato: 'Completato',
    immagine: 'sportday.jpg'
  }
];

// Componente per gestire le immagini dei progetti
const ProjectImage: React.FC<{ progetto: Progetto }> = ({ progetto }) => {
  const [imgSrc, setImgSrc] = useState('/hero.png');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (progetto.immagine) {
      const img = new Image();
      const imagePath = `/images/progetti/${progetto.immagine}`;
      
      img.onload = () => {
        setImgSrc(imagePath);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        console.log(`Immagine non trovata per ${progetto.nome}, uso immagine di default`);
        setImgSrc('/hero.png');
        setIsLoading(false);
      };
      
      img.src = imagePath;
    } else {
      setIsLoading(false);
    }
  }, [progetto.immagine, progetto.nome]);

  const handleImageError = () => {
    setImgSrc('/hero.png');
  };

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={`Immagine di ${progetto.nome}`}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleImageError}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

const Progetti = () => {
  const [animatedProgress, setAnimatedProgress] = useState<{[key: number]: number}>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
  const currentRef = sectionRef.current; // Salva il riferimento
  
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        progetti.forEach((progetto, index) => {
          setTimeout(() => {
            setAnimatedProgress(prev => ({
              ...prev,
              [progetto.id]: progetto.progresso
            }));
          }, index * 200);
        });
      }
    },
    { threshold: 0.3 }
  );

  if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    if (currentRef) { // Usa currentRef invece di sectionRef.current
      observer.unobserve(currentRef);
    }
  };
}, [isVisible]);

  return (
    <section id="progetti" ref={sectionRef} className="py-16" style={{backgroundColor: '#f5f5f5'}}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-gray-900">
            I Nostri Progetti
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Scopri i progetti che stiamo portando avanti per migliorare la vita scolastica.
          </p>
        </div>
        

        <div className="space-y-8">
          {progetti.map((progetto, index) => {
            const currentProgress = animatedProgress[progetto.id] || 0;
            return (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center ${
                  isVisible ? 'animate-fadeIn' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Immagine del progetto */}
                <ProjectImage progetto={progetto} />
                
                {/* Contenuto del progetto con bordo verticale */}
                <div className="flex-1 border-l-4 pl-6 py-4 rounded-r-lg" style={{borderLeftColor: '#791A3C'}}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2" style={{color: '#791A3C'}}>
                        {progetto.nome}
                      </h4>
                      <p className="text-gray-600 mb-3">
                        {progetto.descrizione}
                      </p>
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progresso</span>
                          <span className="text-sm font-bold" style={{color: '#791A3C'}}>
                            {Math.round(currentProgress)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-300 h-4 border rounded-full">
                          <div 
                            className="h-4 transition-all duration-1000 ease-out rounded-full" 
                            style={{width: `${currentProgress}%`, backgroundColor: '#791A3C'}}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="sm:ml-6">
                      <span className="inline-block px-4 py-2 text-sm font-semibold text-white border-2 rounded-full" 
                            style={{backgroundColor: '#791A3C', borderColor: '#791A3C'}}>
                        {progetto.stato}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Pulsante Maggiori Informazioni */}
        <div className="mt-12 text-center">
          <button onClick={() => { if (typeof window !== 'undefined') { window.location.href = "/progetti"; }}}  
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
        </div>

      {/* Stili per l'animazione fadeIn */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Progetti;