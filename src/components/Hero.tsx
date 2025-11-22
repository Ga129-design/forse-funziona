import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[100svh] md:min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
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
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 text-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{color: '#f5f5f5'}}>
            La Tua Voce nella Scuola
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-medium" style={{color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
            Horizon VT: Per una scuola inclusiva, innovativa e al passo con i tempi. Unisciti a noi per costruire il futuro della nostra comunità scolastica.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="#f5f5f5"
          strokeOpacity="0.7"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;