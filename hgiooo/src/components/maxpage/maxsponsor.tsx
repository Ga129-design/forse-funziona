'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Interfaccia Sponsor aggiornata con sconto
interface Sponsor {
  id: number;
  nome: string;
  logo: string;
  sconto: string;
}

// Dati degli sponsor con sconti
const sponsors: Sponsor[] = [
  {
    id: 1,
    nome: "Sottosanti",
    logo: "sottosanti.png",
    sconto: "20% ogni 10€ di spesa"
  },
  {
    id: 2,
    nome: "Nunnari",
    logo: "nunnari.png",
    sconto: "10% su tutto"
  },
  {
    id: 3,
    nome: "Gusto Giusto",
    logo: "gustogiusto.png",
    sconto: "20% su tutto"
  },
  {
    id: 4,
    nome: "King Kebab",
    logo: "kingkebab.png",
    sconto: "10% su tutto"
  },
  {
    id: 5,
    nome: "Biliardi Sport",
    logo: "biliardisport.png",
    sconto: "30% tranne il sabato"
  },
  {
    id: 6,
    nome: "Sicily",
    logo: "sicilyeat.png",
    sconto: "50% panini, 30% bibite, pizza e rustici"
  },
  {
    id: 7,
    nome: "Fico d\'India",
    logo: "ficodindia.png",
    sconto: "10% su tutto"
  },
  {
    id: 8,
    nome: "Smashers",
    logo: "smaschers.png",
    sconto: "10% tutto, solo pranzo"
  },
  {
    id: 9,
    nome: "Il Piccolo Lounge Bar",
    logo: "ilpiccololoungbar.png",
    sconto: "20%, solo pranzo"
  },
  {
    id: 10,
    nome: "Dar Romano",
    logo: "darromano.png",
    sconto: "10% su tutto"
  },
  {
    id: 11,
    nome: "Food Experience",
    logo: "experience.jpg",
    sconto: "20% su preventivo"
  },
  {
    id: 12,
    nome: "Essenza",
    logo: "essenza.png",
    sconto: "10% su tutto"
  },
  {
    id: 13,
    nome: "Bottega Dello Svapo",
    logo: "bottegadellosvapo.png",
    sconto: "20% su tutto (esclusi prodotti scontati)"
  },
  {
    id: 14,
    nome: "Mannino Eventi",
    logo: "manninoeventi.jpg",
    sconto: "10% su extra"
  },
  {
    id: 15,
    nome: "La Valle Santi",
    logo: "lavallesanti.png",
    sconto: "15% su tutto"
  },
  {
    id: 16,
    nome: "Aurora Sporting",
    logo: "aurora.png",
    sconto: "20% su campi da calcio e padel"
  },
  {
    id: 17,
    nome: "Panificio La Rocca",
    logo: "larocca.jpg",
    sconto: "10% su tutto"
  }
];

// Componente per il logo dello sponsor con fallback
const SponsorLogo: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  const [imgSrc, setImgSrc] = useState<string>(`/images/sponsor/${sponsor.logo}`);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setImgSrc('/images/sponsor-placeholder.png');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!hasError ? (
        <img
          src={imgSrc}
          alt={`Logo ${sponsor.nome}`}
          className="max-w-full max-h-full object-contain"
          onError={handleError}
        />
      ) : (
        <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-500">
            {sponsor.nome.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
};

// Componente Card Sponsor
const SponsorCard: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Badge Sconto */}
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <div className="text-white px-3 py-1 rounded-full text-sm font-bold shadow-md"
               style={{backgroundColor: '#791A3C'}}>
            SCONTO
          </div>
        </div>
        
        {/* Logo Container */}
        <div className="h-40 p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <SponsorLogo sponsor={sponsor} />
        </div>
      </div>
      
      {/* Informazioni */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{sponsor.nome}</h3>
        
        {/* Sconto in evidenza */}
        <div className="text-white rounded-lg p-3"
             style={{backgroundColor: '#791A3C'}}>
          <p className="text-center font-semibold text-lg">{sponsor.sconto}</p>
        </div>
      </div>
    </div>
  );
};

// Componente principale
const SponsorPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra sponsor
  const filteredSponsors = sponsors.filter(sponsor => {
    return sponsor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
           sponsor.sconto.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-80 mt-16 overflow-hidden">
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
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">Sconti e Sponsor</h1>
            <p className="text-xl max-w-2xl">
              Scopri tutte le offerte esclusive riservate agli studenti dai nostri sponsor!
            </p>
          </div>
        </div>
      </div>

      {/* Filtri e Ricerca */}
      <div className="sticky top-16 z-20 bg-white shadow-md py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barra di ricerca */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cerca per nome o sconto..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#791A3C] focus:border-[#791A3C]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Contatore risultati */}
            <div className="flex items-center px-4 py-2 rounded-lg font-semibold" 
                 style={{backgroundColor: 'rgba(121, 26, 60, 0.1)', color: '#791A3C'}}>
              {filteredSponsors.length} offerte disponibili
            </div>
          </div>
        </div>
      </div>

      {/* Griglia Sponsor */}
      <div className="container mx-auto px-6 py-12">
        {filteredSponsors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nessun risultato trovato</h3>
            <p className="text-gray-500">Prova a modificare i filtri di ricerca</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="py-16 text-white" style={{backgroundColor: '#791A3C'}}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Vuoi diventare nostro partner?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Unisciti alla nostra rete di sponsor e offri vantaggi esclusivi agli studenti
          </p>
          <button 
            className="bg-white px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            style={{color: '#791A3C'}}
            onClick={() => { if (typeof window !== 'undefined') { window.location.href = '/#contatti'; }}}
          >
            Contattaci ora
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SponsorPage;