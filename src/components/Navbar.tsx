'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(scrolled, 100));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Chi Siamo', href: '/#chi-siamo' },
    { name: 'Candidati', href: '/#candidati' },
    { name: 'Progetti', href: '/#progetti' },
    { name: 'Sponsor', href: '/sponsor' },
    { name: 'Contatti', href: '/#contatti' },
    { name: 'News', href: '/#news' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (typeof window !== 'undefined' && pathname === '/' && href.includes('#')) {
      const element = document.querySelector(href.replace('/', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) {
      if (typeof window !== 'undefined') {
        return pathname === '/' && window.location.hash === href.replace('/', '');
      }
      return false;
    }
    return pathname === href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg'
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Horizon Logo"
                width={120}
                height={40}
                className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 -z-10 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-200"
                style={{background: 'radial-gradient(circle, rgba(121,26,60,0.5) 0%, transparent 70%)'}}
              />
            </div>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.includes('#') && pathname === '/') {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-red-400'
                      : 'text-white hover:text-red-400'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left transition-transform duration-200 ${
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative text-white hover:text-red-400 focus:outline-none focus:text-red-400 p-3 rounded-full transition-all duration-200 hover:bg-white/10 active:bg-white/20"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ease-out ${
                    isMobileMenuOpen 
                      ? 'top-3 rotate-45' 
                      : 'top-1.5 rotate-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ease-out ${
                    isMobileMenuOpen 
                      ? 'top-3 -rotate-45' 
                      : 'top-4.5 rotate-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-2'
        } overflow-hidden ${
          isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-black/30 backdrop-blur-sm'
        }`}
      >
        <div className="border-t border-white/10">
          <div className="py-2 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.includes('#') && pathname === '/') {
                    e.preventDefault();
                  }
                  handleNavClick(item.href);
                }}
                className={`block px-6 py-3 transition-all duration-200 border-l-4 ${
                  isActive(item.href)
                    ? 'text-red-400 bg-white/10 border-red-400'
                    : 'text-white hover:bg-white/10 hover:text-red-300 border-transparent hover:border-red-400/50'
                }`}
              >
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
};

export default Navbar;