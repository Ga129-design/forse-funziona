import React from 'react';

interface NewsArticle {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    date: '14 Ottobre 2025',
    title: 'I Rappresentanti Studenteschi Organizzano un Assemblea Istutuzionale',
    description: 'I rappresentanti studenteschi hanno organizzato un incontro per orientare i ragazzi sulla votazione dei rappresentanti. Gli studenti sono stati invitati a partecipare con attenzione ai vari discorsi proposti dai candidati.',
    image: '/hero.png' // Using existing image as placeholder
  },
  {
    id: 2,
    date: '17 Ottobre 2025',
    title: 'Horizon VT: Risultati elezioni candidati anno 2025-2026',
    description: 'La lista Horizon ha fatto il boom, ha preso posto in tutti i seggi come primi nomi. La lista ringrazia infinitamente tutti i ragazzi che hanno creduto in loro, promettendo di non deluderli.',
    image: '/hero.png' // Using existing image as placeholder
  },
  {
    id: 3,
    date: '30 Ottobre 2025',
    title: 'Horizon VT: Prima assemblea d\'istututo',
    description: 'Pubblicati i risultati della prima assemblea. Grande impegno dei rappresentanti ma poca partecipazione dalla comunità scolastica.',
    image: '/hero.png' // Using existing image as placeholder
  }
];

const News = () => {
  return (
    <section id="news" className="py-16" style={{backgroundColor: '#f8f9fa'}}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Notizie e Aggiornamenti
          </h2>
        </div>

        {/* News Articles */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {newsArticles.map((article) => (
            <div key={article.id} className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-lg">
              {/* Article Content */}
              <div className="flex-1">
                <div className="mb-3">
                  <span className="text-sm text-gray-500 font-medium">
                    {article.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {article.description}
                </p>
              </div>
              
              {/* Article Image */}
              <div className="flex-shrink-0">
                <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;