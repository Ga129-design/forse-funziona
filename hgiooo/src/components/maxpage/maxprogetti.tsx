'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';


// Interfacce e dati dei progetti
interface ProgettoDettagliato {
  id: number;
  nome: string;
  descrizione: string;
  descrizioneCompleta: string;
  progresso: number;
  stato: 'In Corso' | 'Completato' | 'Pianificato';
  immagine?: string;
  dataInizio: string;
  dataFine?: string;
}

const progettiDettagliati: ProgettoDettagliato[] = [
  {
    id: 1,
    nome: "School Cup",
    descrizione: "Competizione Calcistica Con Montepremi",
    descrizioneCompleta: "La School Cup è un torneo di calcio interscolastico che mira a promuovere lo sport e la competizione sana tra gli studenti. Il torneo prevede squadre formate da studenti di diverse scuole, con premi per i vincitori e altri riconoscimenti per i vari titoli.",
    progresso: 50,
    stato: 'Pianificato',
    immagine: 'school-cup.jpg',
    dataInizio: "Ottobre 2025",
    dataFine: "?"
  },
  {
    id: 2,
    nome: "Card Horizon",
    descrizione: "Card Di Scontistiche Per Gli Studenti",
    descrizioneCompleta: "Card Horizon è un progetto che offre agli studenti una carta sconti utilizzabile presso negozi e attività commerciali convenzionate nella zona. L'obiettivo è creare una rete di vantaggi esclusivi per gli studenti del nostro istituto.",
    progresso: 90,
    stato: 'In Corso',
    immagine: 'card-horizon.jpg',
    dataInizio: "Ottobre 2025"
  },
  {
    id: 3,
    nome: "Sport Day",
    descrizione: "Giornata Sportiva Interscolastica",
    descrizioneCompleta: "Lo Sport Day è un evento che riunisce diverse scuole per una giornata all'insegna dello sport e del divertimento. Verranno organizzate competizioni, con l'obiettivo di promuovere l'integrazione e lo spirito di squadra.",
    progresso: 100,
    stato: 'Completato',
    immagine: 'sport-day.jpg',
    dataInizio: "12/10/2025 Ore: 16",
    dataFine: "12/10/2025 Ore: 21"
  }
];

const StatoBadge: React.FC<{ stato: string }> = ({ stato }) => {
  const getColorClass = () => {
    switch(stato) {
      case 'Completato': return 'bg-green-500';
      case 'In Corso': return 'bg-yellow-500';
      case 'Pianificato': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${getColorClass()}`}>
      {stato}
    </span>
  );
};

const ProjectImage: React.FC<{ progetto: ProgettoDettagliato }> = ({ progetto }) => {
  const [imgSrc, setImgSrc] = useState('/hero.png');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (progetto.immagine) {
      const imagePath = `/images/progetti/${progetto.immagine}`;
      
      // Crea un nuovo elemento Image nel browser
      const img = document.createElement('img');
      
      img.onload = () => {
        setImgSrc(imagePath);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        setImgSrc('/hero.png');
        setIsLoading(false);
      };
      
      img.src = imagePath;
    } else {
      setIsLoading(false);
    }
  }, [progetto.immagine]);

  const handleImageError = () => {
    setImgSrc('/hero.png');
  };

  return (
    <div className="relative w-full h-64">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={progetto.nome}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

// Componente principale
const ProgettiPage = () => {
  const [progettoSelezionato, setProgettoSelezionato] = useState<ProgettoDettagliato | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section con immagine di sfondo */}
            <div className="relative h-96 mt-16 overflow-hidden">
              <Image
                src="/hero.png"
                alt="Montagne del Trentino"
                fill
                className="object-cover object-center"
                priority
                style={{
                        objectPosition: 'center center',
                        transform: 'scale(1.1)'
                      }}
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/60"></div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">I Nostri Progetti</h1>
            <p className="text-xl max-w-2xl">
              Scopri tutti i progetti che stiamo portando avanti per migliorare la vita scolastica e creare opportunità per tutti gli studenti.
            </p>
          </div>
        </div>
      </div>

      {/* Griglia Progetti */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {progettiDettagliati.map((progetto) => (
            <div
              key={progetto.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setProgettoSelezionato(progetto)}
            >
              <ProjectImage progetto={progetto} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <StatoBadge stato={progetto.stato} />
                </div>
                
                <h3 className="text-xl font-bold mb-2" style={{color: '#791A3C'}}>
                  {progetto.nome}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {progetto.descrizione}
                </p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-bold" style={{color: '#791A3C'}}>
                      {progetto.progresso}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${progetto.progresso}%`,
                        backgroundColor: '#791A3C'
                      }}
                    />
                  </div>
                </div>
                
                {/* Data */}
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {progetto.dataInizio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dettagli Progetto */}
      {progettoSelezionato && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{color: '#791A3C'}}>
                {progettoSelezionato.nome}
              </h2>
              <button
                onClick={() => setProgettoSelezionato(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <ProjectImage progetto={progettoSelezionato} />
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{color: '#791A3C'}}>Descrizione</h3>
                  <p className="text-gray-600 mb-4">
                    {progettoSelezionato.descrizioneCompleta}
                  </p>
                  
                  <div className="flex gap-2 mb-4">
                    <StatoBadge stato={progettoSelezionato.stato} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="font-semibold mr-2">Inizio:</span>
                      <span>{progettoSelezionato.dataInizio}</span>
                    </div>
                    {progettoSelezionato.dataFine && (
                      <div className="flex items-center text-sm">
                        <span className="font-semibold mr-2">Fine:</span>
                        <span>{progettoSelezionato.dataFine}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Progress Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">Progresso Totale</span>
                  <span className="text-2xl font-bold" style={{color: '#791A3C'}}>
                    {progettoSelezionato.progresso}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${progettoSelezionato.progresso}%`,
                      backgroundColor: '#791A3C'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProgettiPage;