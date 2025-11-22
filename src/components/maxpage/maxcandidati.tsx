'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Interfacce per i candidati
interface CandidatoDettagliato {
  id: number;
  nome: string;
  cognome: string;
  classe: string;
  genere: 'M' | 'F';
  ruolo: 'Istituto' | 'Consulta' | 'Garanzia';
  foto?: string;
  biografia: string;
  programma: string[];
  esperienze: string[];
  contatti: {
    email?: string;
    instagram?: string;
  };
  slogan: string;
}

interface Eletto {
  candidatoId: number;
  posizione: number;
  ruolo: string;
}


// Dati completi dei candidati
const candidatiDettagliati: CandidatoDettagliato[] = [
  // ISTITUTO
  {
    id: 1,
    nome: 'Gioele',
    cognome: 'Turiaco',
    classe: 'VQ',
    genere: 'M',
    ruolo: 'Istituto',
    foto: 'gioele.jpg',
    biografia: 'Sono una persona disponibile, responsabile e motivata a migliorare la vita scolastica. Credo nel dialogo, nel rispetto e nel lavoro di squadra per costruire una scuola più unita e partecipata.',
    programma: [
      'Promozione di attività extrascolastiche'
    ],
    esperienze: [
      'Rappresentante di classe 2023-2024',
      'Partecipazione a progetti scolastici su inclusione e ambiente',
      'Collaborazione all\organizzazione di eventi e attività scolastiche',
    ],
    contatti: {
      instagram: '@gioele.turiaco'
    },
    slogan: 'Insieme cambiamo davvero!'
  },
  {
    id: 2,
    nome: 'Federico',
    cognome: 'Auditore',
    classe: 'VF',
    genere: 'M',
    ruolo: 'Istituto',
    foto: 'federico.jpg',
    biografia: 'Studente responsabile e disponibile, abituato a rappresentare la classe con serità e impegno. Mi piace collaborare e creare un ambiente positivo. So parlare con i professori e gestire situazioni di gruppo',
    programma: [
      'Spazi dedicati alla creatività'
    ],
    esperienze: [
      'Rappresentante di classe 2021-2025',
      'Partecipazione e Organizzazzione di numerose gite',
      'Ottimo rapporto con docenti e studenti, capacità di mediazione e comunicazione',
    ],
    contatti: {
      instagram: '@fredddddddds'
    },
    slogan: 'Bisogna Saper Coniugare Il Sogno Con La Concretezza!'
  },
  {
    id: 3,
    nome: 'Mattia',
    cognome: 'Sottosanti',
    classe: 'VN',
    genere: 'M',
    ruolo: 'Istituto',
    foto: 'mattia.jpg',
    biografia: 'Sono Mattia Sottosanti della 5N. Mi è sempre piaciuto restare aggiornato sulla vita della scuola e offrire la mia disponibilità per ogni evento. Per questo ho scelto di candidarmi nella lista Horizon',
    programma: [
      'Corsi di programmazione gratuiti'
    ],
    esperienze: [
      'Rappresentante di classe da ormai 4 anni',
    ],
    contatti: {
      instagram: '@mattiasottosanti_'
    },
    slogan: 'Sapere, Fare, Sorridere!'
  },
  {
    id: 4,
    nome: 'Francesco',
    cognome: 'Trifirò',
    classe: 'IV G',
    genere: 'M',
    ruolo: 'Istituto',
    foto: 'francesco.jpg',
    biografia: 'Mi presento sono Francesco Trifirò della 4G, è da diversi anni che mi interesso alla vita politica studentesca e quest\'anno ho deciso di fare la differenza!',
    programma: [
      'VT Sulla Neve',
      'Nuovo Merch Scolastico'
    ],
    esperienze: [
      'Gestore Orientamento e OpenDay',
      'Gestore Economia AkaVT',
      'Rappresentante di classe e Aiuto Regia'
    ],
    contatti: {
      instagram: '@francesco_trifiro_'
    },
    slogan: 'C\'è chi resta a guardare e chi fa la differenza!'
  },
  {
    id: 5,
    nome: 'Simone',
    cognome: 'Felicia',
    classe: 'II Q',
    genere: 'M',
    ruolo: 'Istituto',
    foto: 'simone.jpg',
    biografia: '',
    programma: [
      'Maggiore inclusione degli studenti più giovani'
    ],
    esperienze: [
      'Volontario biblioteca scolastica'
    ],
    contatti: {
      instagram: '@_.simoneee.f'
    },
    slogan: '...!'
  },
  {
    id: 6,
    nome: 'Alessia',
    cognome: 'Costa',
    classe: 'III D',
    genere: 'F',
    ruolo: 'Istituto',
    foto: 'alessia.jpg',
    biografia: 'Mi chiamo Alessia Costa, frequento la 3D costruzioni ambiente e territorio, in questi anni ho partecipato a diversi progetti sportivi di pallavolo ed ho deciso di candidarmi all\'istituto perchè desidero aiutare sempre il prossimo. Non a caso vorrei intramprendere questo percorso con la lista Horizon.',
    programma: [
      'Partnership con scuole europee'
    ],
    esperienze: [
      'Partecipante Erasmus 2024',
      'Giocatrice Akademia Challenge'
    ],
    contatti: {
      instagram: '@costaaalessia'
    },
    slogan: 'l\'Impossibile può diventare possibile!'
  },
  {
    id: 7,
    nome: 'Angelo',
    cognome: 'Totaro',
    classe: 'IV Q',
    genere: 'M',
    ruolo: 'Istituto',
    foto: 'angelo.jpg',
    biografia: 'Angelo Totaro, un ragazzo che sogna in grande, pronto a raggiungere i propri obiettivi, costante e determinato in ciò che fa.',
    programma: [
      'Corsi di educazione finanziaria'
    ],
    esperienze: [
      'Servizio D\'ordine',
      'Pcto grafica/informatica',
      'Partecipazione attiva all\'OpenDay',
    ],
    contatti: {
      instagram: '@_angleo.totaro_'
    },
    slogan: 'La vita è una, affrontala sempre a testa alta senza paura di giudizi, sei tu padrone della tua ricchezza!'
  },
  {
    id: 8,
    nome: 'Laura',
    cognome: 'Puleo',
    classe: '4G',
    genere: 'F',
    ruolo: 'Istituto',
    foto: 'laura.jpg',
    biografia: 'Mi chiamo Laura Puleo frequento la 4G informatica, quest\'anno punto ad essere rappresentante d\'istituto perchè amo la mia scuola e i miei compagni e adoro dare tutta me stessa per questo progetto.',
    programma: [
      'Eventi di sensibilizzazione sociale'
    ],
    esperienze: [
      'Presidente e Segretaria del comitato studentesco',
      'Rappresentante di classe da 3 anni',
      'Amante delle assemblee'
    ],
    contatti: {
      instagram: '@puleolaura_'
    },
    slogan: 'Conosci prima te stesso così poi potrai aiutare gli altri'
  },
  
  // CONSULTA
  {
    id: 9,
    nome: 'Christian',
    cognome: 'Mangano',
    classe: 'IV Q',
    genere: 'M',
    ruolo: 'Consulta',
    foto: 'christian.jpg',
    biografia: 'Rappresentante all\'organo di Garanzia, Interim all\'istituto e 3 anni di candidatura alle spalle, pronto più che mai a fare la differenza nella Consulta Provinciale.',
    programma: [
      'Presidenza Consulta Provinciale',
      'Eventi inter-scolastici',
      'Più cura al dettaglio',
      'Maggiore attività su eventi spesso ignorati'
    ],
    esperienze: [
      'Rappresentante Garanzia 2024-2025',
      'Interim Istituto 2023-2024',
      'Rappresentante di classe'
    ],
    contatti: {
      instagram: '@christianmangano__'
    },
    slogan: 'La scuola va vissuta, non subita!'
  },
  {
    id: 10,
    nome: 'Alessando',
    cognome: 'Lombardo',
    classe: 'V N',
    genere: 'M',
    ruolo: 'Consulta',
    foto: 'alessandro.jpg',
    biografia: '',
    programma: [
      'Dialogo costante con le istituzioni'
    ],
    esperienze: [
      'Formatore per nuovi rappresentanti'
    ],
    contatti: {
      instagram: '@aleloombardo'
    },
    slogan: '...!'
  },
  
  // GARANZIA
  {
    id: 11,
    nome: 'Samuele',
    cognome: 'Costanzo',
    classe: 'V N',
    genere: 'M',
    ruolo: 'Garanzia',
    foto: 'samuele.jpg',
    biografia: 'Dopo 5 anni passati in questa scuola, ho sentito che fosse giusto concludere questo percorso lasciando un segno, qualcosa che resti anche dopo di me.',
    programma: [
      'Mediazione nei conflitti studente-scuola'
    ],
    esperienze: [
      'Segretario Comitato Studentesco',
      'Rappresentante di classe dal 2023',
      'Giocatore AkaVT'
    ],
    contatti: {
      instagram: '@samuelecostanzo7'
    },
    slogan: 'Nostro il futuro, nostro il dovere di fare la differenza.'
  },
  {
    id: 12,
    nome: 'Alesio',
    cognome: 'Mellusi',
    classe: 'IV Q',
    genere: 'M',
    ruolo: 'Garanzia',
    foto: 'alessio.jpg',
    biografia: '',
    programma: [
      'Garanzia di processi democratici'
    ],
    esperienze: [
      'Garante assemblee d\'istituto'
    ],
    contatti: {
      instagram: '@alessiomellusi_'
    },
    slogan: '...!'
  },
  {
    id: 13,
    nome: 'Giorgia',
    cognome: 'Mezzasalma',
    classe: 'IV M',
    genere: 'F',
    ruolo: 'Garanzia',
    foto: 'giorgia.jpg',
    biografia: 'Sono Giorgia Mezzasalma, quest\'anno punto a riconfermarmi come rappresentante di classe, e a salire di livello candidandomi all\'Organo di Garanzia per tutelare i diritti degli studenti.',
    programma: [
      'Controllo uso fondi studenteschi'
    ],
    esperienze: [
      'Membro del Comitato Studentesco',
      'Referente Eco School',
      'Partecipazione Attiva alla vita scolastica'
    ],
    contatti: {
      instagram: '@giorgiamezzasalma_'
    },
    slogan: 'La voce che ascolta, agisce e rappresenta!'
  }
];

// Dati degli eletti 2025
const elettiData: Eletto[] = [
  {
    candidatoId: 8, // Laura Puleo
    posizione: 1,
    ruolo: 'Consiglio d\'Istituto'
  },
  {
    candidatoId: 2, // Federico Auditore
    posizione: 3,
    ruolo: 'Consiglio d\'Istituto'
  },
  {
    candidatoId: 9, // Christian Mangano
    posizione: 1,
    ruolo: 'Consulta Provinciale'
  },
  {
    candidatoId: 11, // Samuele Costanzo
    posizione: 1,
    ruolo: 'Organo Di Garanzia'
  }
];

// Componente per il badge del ruolo
const RoleBadge = ({ ruolo }: { ruolo: string }) => {
  const colors = {
    Istituto: 'bg-blue-100 text-blue-800',
    Consulta: 'bg-green-100 text-green-800',
    Garanzia: 'bg-purple-100 text-purple-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[ruolo as keyof typeof colors]}`}>
      {ruolo}
    </span>
  );
};

// Componente per l'immagine del candidato (senza avatar)
const CandidateImage = ({ candidato, size, rounded = true }: { candidato: CandidatoDettagliato, size: string, rounded?: boolean }) => {
  const roundedClass = rounded ? 'rounded-full' : '';
  
  if (candidato.foto) {
    return (
      <div className={`${size} ${roundedClass} overflow-hidden relative`}>
        <Image
          src={`/images/candidati/${candidato.foto}`}
          alt={`${candidato.nome} ${candidato.cognome}`}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // Placeholder semplice se non c'è foto
  return (
    <div className={`${size} ${roundedClass} bg-gray-200 flex items-center justify-center`}>
      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
  );
};

// Componente per la posizione (cerchietto con numero)
const PositionBadge = ({ position }: { position: number }) => {
  const getPositionText = (pos: number) => {
    switch(pos) {
      case 1: return '1°';
      case 2: return '2°';
      case 3: return '3°';
      default: return `${pos}°`;
    }
  };

  const getPositionColor = (pos: number) => {
    switch(pos) {
      case 1: return 'bg-yellow-400 border-yellow-500';
      case 2: return 'bg-gray-300 border-gray-400';
      case 3: return 'bg-orange-400 border-orange-500';
      default: return 'bg-gray-200 border-gray-300';
    }
  };

  return (
    <div className={`absolute -top-2 -right-2 w-12 h-12 rounded-full ${getPositionColor(position)} border-2 flex items-center justify-center z-10 shadow-lg`}>
      <span className="text-white font-bold text-lg">{getPositionText(position)}</span>
    </div>
  );
};

// Tipo esteso per candidato eletto
interface CandidatoEletto extends CandidatoDettagliato {
  posizione: number;
  ruoloEletto: string;
}

const CandidatiPage = () => {
  const [candidatiFiltrati, setCandidatiFiltrati] = useState<CandidatoDettagliato[]>([]);
  const [filtroRuolo, setFiltroRuolo] = useState<string>('tutti');
  const [candidatoSelezionato, setCandidatoSelezionato] = useState<CandidatoDettagliato | null>(null);

  // Funzione per ottenere i candidati eletti con le loro informazioni complete
  const getEletti = (): CandidatoEletto[] => {
    return elettiData.map(eletto => {
      const candidato = candidatiDettagliati.find(c => c.id === eletto.candidatoId);
      if (candidato) {
        return {
          ...candidato,
          posizione: eletto.posizione,
          ruoloEletto: eletto.ruolo
        } as CandidatoEletto;
      }
      return null;
    }).filter((item): item is CandidatoEletto => item !== null);
  };

  const eletti = getEletti();

  useEffect(() => {
    if (filtroRuolo === 'tutti') {
      setCandidatiFiltrati(candidatiDettagliati);
    } else {
      setCandidatiFiltrati(candidatiDettagliati.filter(c => c.ruolo === filtroRuolo));
    }
  }, [filtroRuolo]);

  const candidatiPerRuolo = {
    Istituto: candidatiDettagliati.filter(c => c.ruolo === 'Istituto'),
    Consulta: candidatiDettagliati.filter(c => c.ruolo === 'Consulta'),
    Garanzia: candidatiDettagliati.filter(c => c.ruolo === 'Garanzia')
  };

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
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">I Nostri Candidati</h1>
            <p className="text-xl max-w-2xl">
              Scopri chi sono i rappresentanti che si impegnano per te!
            </p>
          </div>
        </div>
      </div>

      {/* Candidati Eletti 2025 */}
      <div className="container mx-auto px-2 py-12">
        <div className="bg-gradient-to-tr from-red-100 to-red-20 rounded-2xl p-8 shadow-xl mb-12">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Candidati Eletti 2025
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eletti.map((candidato) => (
              <div key={candidato.id} className="relative">
                <div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-110 cursor-pointer relative"
                  onClick={() => setCandidatoSelezionato(candidato)}
                >
                  {/* Badge Posizione */}
                  <PositionBadge position={candidato.posizione} />
                  
                  {/* Immagine */}
                  <div className="relative h-64 bg-gray-100">
                    <CandidateImage candidato={candidato} size="w-full h-full" rounded={false} />
                  </div>
                  
                  {/* Info Candidato */}
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 text-center">
                      {candidato.nome} {candidato.cognome}
                    </h3>
                    <p className="text-sm text-gray-600 text-center mt-1">{candidato.classe}</p>
                    
                    {/* Rettangolo con nome organo */}
                    <div className="mt-4">
                      <div className="bg-gradient-to-r from-red-300 to-red-200 text-white py-2 px-4 rounded-lg text-center font-semibold">
                        {candidato.ruoloEletto}
                      </div>
                    </div>
                    
                    <p className="mt-3 text-xs text-center text-gray-700 italic">
                      &#34;{candidato.slogan}&#34;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtri */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFiltroRuolo('tutti')}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              filtroRuolo === 'tutti'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tutti i Candidati
          </button>
          <button
            onClick={() => setFiltroRuolo('Istituto')}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              filtroRuolo === 'Istituto'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Consiglio d&aposIstituto
          </button>
          <button
            onClick={() => setFiltroRuolo('Consulta')}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              filtroRuolo === 'Consulta'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Consulta Provinciale
          </button>
          <button
            onClick={() => setFiltroRuolo('Garanzia')}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              filtroRuolo === 'Garanzia'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Organo di Garanzia
          </button>
        </div>
      </div>

      {/* Lista Candidati */}
      <div className="container mx-auto px-4 pb-16">
        {filtroRuolo === 'tutti' ? (
          // Vista per categoria
          <div className="space-y-16">
            {/* Istituto */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#791A3C'}}>
                Consiglio d&aposIstituto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {candidatiPerRuolo.Istituto.map((candidato) => (
                  <div
                    key={candidato.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
                    onClick={() => setCandidatoSelezionato(candidato)}
                  >
                    <div className="relative h-48 bg-gray-100">
                      <CandidateImage candidato={candidato} size="w-full h-full" rounded={false} />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 text-center">
                        {candidato.nome} {candidato.cognome}
                      </h3>
                      <p className="text-sm text-gray-600 text-center">{candidato.classe}</p>
                      <p className="mt-2 text-xs text-center text-gray-700 italic line-clamp-2">
                        &#39;{candidato.slogan}&#39;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consulta */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#791A3C'}}>
                Consulta Provinciale
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {candidatiPerRuolo.Consulta.map((candidato) => (
                  <div
                    key={candidato.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
                    onClick={() => setCandidatoSelezionato(candidato)}
                  >
                    <div className="relative h-48 bg-gray-100">
                      <CandidateImage candidato={candidato} size="w-full h-full" rounded={false} />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 text-center">
                        {candidato.nome} {candidato.cognome}
                      </h3>
                      <p className="text-sm text-gray-600 text-center">{candidato.classe}</p>
                      <p className="mt-2 text-xs text-center text-gray-700 italic line-clamp-2">
                        &#39;{candidato.slogan}&#39;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Garanzia */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#791A3C'}}>
                Organo di Garanzia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {candidatiPerRuolo.Garanzia.map((candidato) => (
                  <div
                    key={candidato.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
                    onClick={() => setCandidatoSelezionato(candidato)}
                  >
                    <div className="relative h-48 bg-gray-100">
                      <CandidateImage candidato={candidato} size="w-full h-full" rounded={false} />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 text-center">
                        {candidato.nome} {candidato.cognome}
                      </h3>
                      <p className="text-sm text-gray-600 text-center">{candidato.classe}</p>
                      <p className="mt-2 text-xs text-center text-gray-700 italic line-clamp-2">
                        &#39;{candidato.slogan}&#39;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Vista filtrata
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {candidatiFiltrati.map((candidato) => (
              <div
                key={candidato.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setCandidatoSelezionato(candidato)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <RoleBadge ruolo={candidato.ruolo} />
                    <span className="text-sm text-gray-500">{candidato.classe}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <CandidateImage candidato={candidato} size="w-24 h-24" />
                    <h3 className="mt-4 text-lg font-bold text-gray-800">
                      {candidato.nome} {candidato.cognome}
                    </h3>
                    
                    <p className="mt-3 text-sm text-center text-gray-600 line-clamp-2">
                      {candidato.biografia.substring(0, 100)}...
                    </p>
                    
                    <p className="mt-3 text-sm text-center font-medium italic" style={{color: '#791A3C'}}>
                      &#39;{candidato.slogan}&#39;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Dettagli Candidato */}
      {candidatoSelezionato && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{color: '#791A3C'}}>
                {candidatoSelezionato.nome} {candidatoSelezionato.cognome}
              </h2>
              <button
                onClick={() => setCandidatoSelezionato(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Colonna sinistra - Info personali */}
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <CandidateImage candidato={candidatoSelezionato} size="w-40 h-40" />
                    <h3 className="mt-4 text-xl font-bold text-gray-800">
                      {candidatoSelezionato.nome} {candidatoSelezionato.cognome}
                    </h3>
                    <p className="text-gray-600">{candidatoSelezionato.classe}</p>
                    <div className="mt-3">
                      <RoleBadge ruolo={candidatoSelezionato.ruolo} />
                    </div>
                    
                    {/* Contatti */}
                    <div className="mt-6 w-full space-y-2">
                      {candidatoSelezionato.contatti.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">{candidatoSelezionato.contatti.email}</span>
                        </div>
                      )}
                      {candidatoSelezionato.contatti.instagram && (
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                          </svg>
                          <span>{candidatoSelezionato.contatti.instagram}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Slogan */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg w-full">
                      <p className="text-center font-medium italic" style={{color: '#791A3C'}}>
                        &#39;{candidatoSelezionato.slogan}&#39;
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Colonna destra - Dettagli */}
                <div className="md:col-span-2 space-y-6">
                  {/* Biografia */}
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{color: '#791A3C'}}>Chi sono</h3>
                    <p className="text-gray-700">{candidatoSelezionato.biografia}</p>
                  </div>
                  
                  {/* Programma */}
                  <div>
                    <h3 className="font-bold text-lg mb-3" style={{color: '#791A3C'}}>Il mio programma</h3>
                    <ul className="space-y-2">
                      {candidatoSelezionato.programma.map((punto, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="#791A3C" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{punto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Esperienze */}
                  <div>
                    <h3 className="font-bold text-lg mb-3" style={{color: '#791A3C'}}>Le mie esperienze</h3>
                    <div className="space-y-2">
                      {candidatoSelezionato.esperienze.map((esperienza, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="#791A3C" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-sm">{esperienza}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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

export default CandidatiPage;