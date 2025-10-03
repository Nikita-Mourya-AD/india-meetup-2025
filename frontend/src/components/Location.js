import React from 'react';

const Location = () => {
  const address = "Level 6, Tower 12, Magarpatta Inner Circle, Cybercity, Magarpatta, Hadapsar, Pune, Maharashtra 411013";
  
  return (
    <div className="py-20 bg-gradient-to-br from-navy-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            📍 Event Location
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us at our beautiful venue in the heart of Pune's tech district
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Location Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-appdirect-blue to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Venue Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-appdirect-blue rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600 leading-relaxed">{address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-appdirect-blue rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Date & Time</h4>
                    <p className="text-gray-600">November 22, 2025 (Saturday)</p>
                    <p className="text-gray-600">10:00 AM - 2:00 PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-appdirect-blue rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Parking</h4>
                    <p className="text-gray-600">Free parking available in the building</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-appdirect-blue rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Public Transport</h4>
                    <p className="text-gray-600">Well connected by bus and auto-rickshaw</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-appdirect-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Open in Maps</span>
              </a>
              
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-appdirect-blue text-appdirect-blue hover:bg-appdirect-blue hover:text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 text-appdirect-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Interactive Map
              </h3>
            </div>
            
            {/* Interactive Clickable Map */}
            <div className="relative h-96 bg-gradient-to-br from-navy-light to-white rounded-b-3xl overflow-hidden cursor-pointer group">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-24 h-24 bg-appdirect-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-navy-dark transition-colors duration-300">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-appdirect-blue transition-colors duration-300">📍 Magarpatta City, Pune</h4>
                    <p className="text-gray-600 mb-4">Level 6, Tower 12, Magarpatta Inner Circle</p>
                    <div className="inline-flex items-center space-x-2 bg-appdirect-blue text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:bg-navy-dark transition-colors duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Click to Open in Maps</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-appdirect-blue bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute top-8 right-8 w-6 h-6 bg-navy-dark bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-8 w-4 h-4 bg-appdirect-blue bg-opacity-30 rounded-full group-hover:bg-opacity-40 transition-all duration-300"></div>
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-navy-dark bg-opacity-10 rounded-full group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-appdirect-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
            
            {/* Map footer */}
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-600 text-center">
                📍 Magarpatta City, Pune - A thriving tech hub in Maharashtra
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-appdirect-blue to-navy-dark rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🚗 Getting There</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white bg-opacity-10 rounded-2xl p-4">
                <h4 className="font-semibold mb-2">🚗 By Car</h4>
                <p className="text-sm opacity-90">Free parking available. Use Google Maps for best route.</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-2xl p-4">
                <h4 className="font-semibold mb-2">🚌 By Bus</h4>
                <p className="text-sm opacity-90">Multiple bus routes connect to Magarpatta area.</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-2xl p-4">
                <h4 className="font-semibold mb-2">🚕 By Auto/Taxi</h4>
                <p className="text-sm opacity-90">Auto-rickshaws and cabs readily available.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
