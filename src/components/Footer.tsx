'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const utilityLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Chi siamo', href: '#chi-siamo' },
    { name: 'Candidati', href: '#candidati' },
    { name: 'Progetti', href: '#progetti' },
    { name: 'Contatti', href: '#contatti' },
    { name: 'Notizie', href: '#news' },
    { name: 'Sponsor', href: '/sponsor' },    
  ];

  const progetti = [
    'Progetto School Cup',
    'Progetto Card Horizon',
    'Progetto Sport Day',
    'Progetto VT Sulla Neve',
    'Progetto Autogestione',
    'Progetto Serate Disco'
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/horizon_vt?igsh=MnhvYWY4cjBkZmtm' },
    { name: 'Gruppo WhatsApp', href: 'https://chat.whatsapp.com/JCP9EDQ189Y9KAQa5kX89t' }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background nero con sfocature rosse */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Sfocature rosse animate */}
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Zona rossa larga principale */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-red-600/50 via-red-500/30 to-transparent blur-sm"></div>
            
            {/* Sfocature aggiuntive per effetto dinamico */}
            <div className={`absolute bottom-0 left-10 w-80 h-32 bg-red-600/40 rounded-full blur-2xl transition-all duration-[3000ms] ease-in-out ${
              mounted ? 'translate-x-20' : ''
            }`}></div>
            <div className={`absolute bottom-0 right-20 w-64 h-28 bg-red-500/35 rounded-full blur-xl transition-all duration-[4000ms] ease-in-out delay-500 ${
              mounted ? '-translate-x-16' : ''
            }`}></div>
            <div className={`absolute bottom-0 left-1/3 w-96 h-40 bg-red-700/30 rounded-full blur-3xl transition-all duration-[5000ms] ease-in-out delay-1000 ${
              mounted ? 'translate-x-12' : ''
            }`}></div>
            <div className={`absolute bottom-0 right-1/4 w-72 h-32 bg-red-400/40 rounded-full blur-2xl transition-all duration-[3500ms] ease-in-out delay-700 ${
              mounted ? '-translate-x-8' : ''
            }`}></div>
            <div className={`absolute bottom-0 left-1/2 w-88 h-36 bg-red-800/25 rounded-full blur-3xl transition-all duration-[4500ms] ease-in-out delay-300 ${
              mounted ? 'translate-x-6' : ''
            }`}></div>
          </div>
      </div>

      {/* Contenuto del footer */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 md:gap-12 mb-16">
            {/* Utility */}
            <div className="text-left">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Utility</h3>
              <ul className="space-y-3">
                {utilityLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-lg"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progetti */}
            <div className="text-left">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Progetti</h3>
              <ul className="space-y-3">
                {progetti.map((progetto, index) => (
                  <li key={index}>
                    <span className="text-gray-300 text-sm md:text-lg">
                      {progetto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="text-left">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Social Media</h3>
              <ul className="space-y-3">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a 
                      href={social.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-lg"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Logo e copyright */}
          <div className="text-center pt-12">
            <div className="flex justify-center items-center mb-6">
              <Image
                src="/logo.png"
                alt="Horizon VT Logo"
                width={500}
                height={500}
                className="rounded-full"
              />
            </div>
            <div className="border-t border-white/20 pt-6">
              <p className="text-gray-400 text-sm">
                © 2025 Horizon VT. Tutti i diritti riservati.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;