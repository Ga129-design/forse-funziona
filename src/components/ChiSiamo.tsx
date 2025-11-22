import Image from 'next/image';

const ChiSiamo = () => {
  return (
    <section id="chi-siamo" className="relative py-20" style={{backgroundColor: '#f5f5f5'}}>
      {/* Effetto sfocatura superiore per profondità */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 via-black/10 to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Contenuto testuale */}
          <div className="flex-1 text-center lg:text-left lg:pr-8">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              Chi Siamo
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed">
              Horizon VT è un&apos;iniziativa studentesca nata per rendere la scuola un ambiente 
              più inclusivo e stimolante. La nostra missione è rappresentare efficacemente gli 
              studenti, portando le loro esigenze agli organi decisionali e realizzando progetti 
              concreti per migliorare la vita scolastica, garantendo a ogni studente il diritto 
              di esprimere ed essere ascoltato.
            </p>
          </div>
          
          {/* Immagine */}
          <div className="flex-shrink-0 w-full max-w-sm sm:max-w-md lg:w-2/5">
            <Image
              src="/veronatrento.png"
              alt="I.I.S. Verona Trento"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChiSiamo;