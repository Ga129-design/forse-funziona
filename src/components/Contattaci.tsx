'use client';
import React, { useState } from 'react';

const Contattaci = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('../api/telegram/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contatti" className="py-16" style={{backgroundColor: '#f8f9fa'}}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Contattaci
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Email Section */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="47" viewBox="0 0 56 47" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M35.5525 0.091645C30.4732 -0.0305483 25.4433 -0.0305483 20.364 0.091645L20.2127 0.0952808C16.247 0.190605 13.0559 0.267328 10.4985 0.693772C7.82102 1.14024 5.64491 1.99656 3.80653 3.76347C1.97583 5.52298 1.08618 7.57661 0.628758 10.0987C0.193208 12.5002 0.126862 15.481 0.0447039 19.1734L0.0414271 19.3198C-0.0138132 21.8008 -0.0138135 24.2673 0.0414529 26.7486L0.0447039 26.8947C0.126888 30.5874 0.193208 33.5682 0.628758 35.9697C1.08618 38.4918 1.97585 40.5454 3.80653 42.3047C5.64491 44.0718 7.82102 44.9281 10.4985 45.3746C13.0559 45.801 16.2469 45.8777 20.2126 45.973L20.364 45.9768C25.4433 46.0988 30.4732 46.0988 35.5525 45.9768L35.7039 45.973C39.6695 45.8777 42.8607 45.801 45.418 45.3746C48.0955 44.9281 50.2715 44.0718 52.11 42.3047C53.9407 40.5454 54.8304 38.4918 55.2876 35.9697C55.7233 33.5682 55.7896 30.5874 55.8718 26.8947L55.8752 26.7486C55.9303 24.2673 55.9303 21.8008 55.8752 19.3198L55.8718 19.1734C55.7896 15.481 55.7233 12.5002 55.2876 10.0987C54.8304 7.57666 53.9407 5.52304 52.11 3.76352C50.2715 1.99661 48.0955 1.14029 45.418 0.693821C42.8607 0.267353 39.6695 0.19063 35.7039 0.0953058L35.5525 0.091645ZM15.9474 12.7112C15.0201 12.1862 13.8239 12.4805 13.2757 13.3683C12.7274 14.2562 13.0347 15.4016 13.962 15.9265L21.6135 20.2579C23.8784 21.5401 25.8326 22.4119 27.9585 22.4119C30.0844 22.4119 32.0389 21.5401 34.3036 20.2579L41.9551 15.9265C42.8825 15.4016 43.1897 14.2562 42.6414 13.3683C42.0932 12.4805 40.8971 12.1862 39.9696 12.7112L32.3182 17.0427C30.1221 18.2857 28.9546 18.6766 27.9585 18.6766C26.9624 18.6766 25.7949 18.2857 23.5988 17.0427L15.9474 12.7112Z" fill="#791A3C"/>
                  </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">info@horizonvt.it</p>
              </div>
            </div>

            {/* Instagram Section */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                    <g clip-path="url(#clip0_1_2770)">
    <g filter="url(#filter0_d_1_2770)">
      <path d="M44.4793 16.5208H44.5047M17.7918 5.08325H43.2085C50.2271 5.08325 55.9168 10.773 55.9168 17.7916V43.2083C55.9168 50.2269 50.2271 55.9166 43.2085 55.9166H17.7918C10.7732 55.9166 5.0835 50.2269 5.0835 43.2083V17.7916C5.0835 10.773 10.7732 5.08325 17.7918 5.08325ZM40.6668 28.8987C40.9805 31.014 40.6192 33.1743 39.6343 35.0724C38.6494 36.9705 37.0911 38.5098 35.181 39.4712C33.2708 40.4326 31.1062 40.7672 28.995 40.4275C26.8837 40.0878 24.9333 39.091 23.4212 37.5789C21.9091 36.0668 20.9123 34.1164 20.5726 32.0051C20.2329 29.8939 20.5675 27.7292 21.5289 25.8191C22.4903 23.909 24.0296 22.3507 25.9277 21.3658C27.8258 20.3809 29.9861 20.0196 32.1014 20.3333C34.2591 20.6532 36.2567 21.6586 37.7991 23.201C39.3414 24.7434 40.3469 26.741 40.6668 28.8987Z" stroke="#791A3C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"/>
    </g>
  </g>
  <defs>
    <filter id="filter0_d_1_2770" x="-0.916504" y="3.08325" width="62.8335" height="62.8333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2770"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2770" result="shape"/>
    </filter>
    <clipPath id="clip0_1_2770">
      <rect width="61" height="61" fill="white"/>
    </clipPath>
  </defs>
</svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instagram</h3>
                <p className="text-gray-600">@horizon_vt</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-xl shadow-lg" style={{backgroundColor: '#f5f5f5'}}>
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Messaggio Inviato!</h3>
                <p className="text-gray-600">Grazie per averci contattato. Ti risponderemo al più presto.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-200 hover:opacity-90"
                  style={{backgroundColor: '#791A3C'}}
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Mettiti in contatto</h3>
                </div>
                
                {status === 'error' && (
                  <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    Si è verificato un errore. Riprova più tardi.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                      Nome Completo*
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-gray-100 text-gray-900 placeholder-gray-500 disabled:opacity-50"
                      style={{"--tw-ring-color": "#791A3C"} as React.CSSProperties}
                      placeholder="Inserisci il tuo nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Indirizzo Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-gray-100 text-gray-900 placeholder-gray-500 disabled:opacity-50"
                      style={{"--tw-ring-color": "#791A3C"} as React.CSSProperties}
                      placeholder="Inserisci il tuo indirizzo email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                      Messaggio*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={status === 'loading'}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-gray-100 resize-none text-gray-900 placeholder-gray-500 disabled:opacity-50"
                      style={{"--tw-ring-color": "#791A3C"} as React.CSSProperties}
                      placeholder="Inserisci il tuo messaggio"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{backgroundColor: '#791A3C'}}
                  >
                    {status === 'loading' ? 'Invio in corso...' : 'Invia Ora'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contattaci;
