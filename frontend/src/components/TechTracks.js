import React from 'react';

const TechTracks = () => {
  const tracks = [
    {
      id: 1,
      title: "AI-Powered Development",
      icon: "🤖",
      color: "from-purple-500 to-purple-600",
      speakers: [
        {
          name: "Nikita Mourya",
          title: "Senior Software Engineer",
          company: "AppDirect",
          image: "👩‍💻",
          expertise: "AI Tools, Cursor IDE, CloudRun"
        }
      ],
      sessions: [
        "Build Smarter, Deploy Faster: AI-Powered Apps with Cursor & CloudRun"
      ]
    },
    {
      id: 2,
      title: "Modern Development Practices",
      icon: "⚡",
      color: "from-green-500 to-green-600",
      speakers: [
        {
          name: "Ankita",
          title: "Software Engineer",
          company: "Tech Innovator",
          image: "👩‍💻",
          expertise: "Modern Coding, Development Tools"
        }
      ],
      sessions: [
        "Vibe Coding - Modern Development Practices"
      ]
    },
    {
      id: 3,
      title: "AI Tools & Cloud Deployment",
      icon: "🚀",
      color: "from-orange-500 to-orange-600",
      speakers: [
        {
          name: "Muskan",
          title: "Cloud Engineer",
          company: "Cloud Solutions",
          image: "👩‍🔧",
          expertise: "AI Tools, Cursor IDE, Google Cloud"
        }
      ],
      sessions: [
        "Launchpad: Build, Deploy & Scale Modern Sites with AI Tools on Cursor IDE & Google Cloud"
      ]
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            🎯 Tech Tracks & Speakers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into cutting-edge technologies with industry experts and hands-on workshops
          </p>
        </div>

        {/* Tech Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tracks.map((track, index) => (
            <div 
              key={track.id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Track Header */}
              <div className={`bg-gradient-to-r ${track.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-5xl">{track.icon}</div>
                    <h3 className="text-2xl font-bold">{track.title}</h3>
                  </div>
                  <p className="text-blue-100 text-lg">
                    Expert-led sessions and hands-on workshops
                  </p>
                </div>
              </div>

              {/* Speakers Section */}
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">👥</span>
                  Featured Speakers
                </h4>
                
                <div className="space-y-6 mb-8">
                  {track.speakers.map((speaker, speakerIndex) => (
                    <div 
                      key={speakerIndex}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="text-4xl">{speaker.image}</div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900">{speaker.name}</h5>
                        <p className="text-sm text-gray-600">{speaker.title}</p>
                        <p className="text-sm font-medium text-appdirect-blue">{speaker.company}</p>
                        <p className="text-xs text-gray-500 mt-1">{speaker.expertise}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sessions */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📚</span>
                    Session Topics
                  </h4>
                  <div className="space-y-2">
                    {track.sessions.map((session, sessionIndex) => (
                      <div 
                        key={sessionIndex}
                        className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-appdirect-blue hover:bg-blue-50 transition-all duration-200"
                      >
                        <div className="w-2 h-2 bg-appdirect-blue rounded-full"></div>
                        <span className="text-gray-700">{session}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-appdirect-blue to-navy-dark rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🎉 Ready to Learn & Network?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join 200+ developers for an unforgettable day of learning, networking, and innovation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <span>3 Expert-Led Tracks</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👥</span>
                <span>3 Industry Speakers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <span>3 Hands-on Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechTracks;
