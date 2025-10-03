import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-appdirect-blue via-navy-dark to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white bg-opacity-15 rounded-full animate-pulse"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          {/* Main heading with animation */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent animate-fade-in">
              AppDirect India
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-delay">
              Tech Meetup 2024
            </h1>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-12 text-slate-200 animate-slide-up">
            🚀 Cloud Innovation & Developer Excellence
          </h2>
          
          {/* Event details with enhanced styling */}
          <div className="max-w-4xl mx-auto space-y-6 text-lg sm:text-xl mb-12">
            <div className="flex items-center justify-center space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 mx-4 animate-slide-up-delay">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">November 22, 2025 (Saturday)</span>
            </div>
            
            <div className="flex items-center justify-center space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 mx-4 animate-slide-up-delay-2">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">Pune, Maharashtra, India</span>
            </div>
            
            <div className="flex items-center justify-center space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 mx-4 animate-slide-up-delay-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">10:00 AM - 2:00 PM IST</span>
            </div>
          </div>
          
          {/* Enhanced description */}
          <div className="mt-16 max-w-5xl mx-auto">
            <p className="text-xl sm:text-2xl leading-relaxed opacity-95 font-light animate-fade-in-delay-4">
              Join us for an <span className="font-bold text-yellow-300">unforgettable day</span> of cloud innovation, 
              hands-on workshops, and networking with industry leaders. Discover the latest in 
              <span className="font-bold text-yellow-300"> microservices</span>, 
              <span className="font-bold text-yellow-300"> cloud-native development</span>, and 
              <span className="font-bold text-yellow-300"> platform engineering</span>.
            </p>
          </div>
          
          {/* Enhanced feature cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 animate-slide-up-delay-5">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-xl mb-3">Expert Workshops</h3>
              <p className="text-sm opacity-90">Hands-on sessions with industry experts</p>
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 animate-slide-up-delay-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-xl mb-3">Networking</h3>
              <p className="text-sm opacity-90">Connect with 200+ developers</p>
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 animate-slide-up-delay-7">
              <div className="text-4xl mb-4">🍕</div>
              <h3 className="font-bold text-xl mb-3">Food & Drinks</h3>
              <p className="text-sm opacity-90">Delicious refreshments & networking</p>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-16 animate-bounce">
            <div className="inline-flex items-center space-x-2 bg-yellow-400 text-navy-blue px-8 py-4 rounded-full font-bold text-lg shadow-2xl">
              <span>🎉 Limited Seats Available!</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
