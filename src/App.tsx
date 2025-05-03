import React, { useState } from 'react';
import { MapPin, Calendar, MessageCircle, BookOpen, Award, User, Menu, X } from 'lucide-react';

// Mock data for demonstration
const MOCK_TOURNAMENTS = [
  {
    id: 1,
    name: "New Game Plus",
    address: "123 Main St, Boston, MA",
    dateTime: "2025-05-10T16:00:00",
    startggLink: "https://start.gg/tournament/game-over-monthly",
    discordLink: "https://discord.gg/nemchannel-gameover",
    lat: 42.3601,
    lng: -71.0589,
    isRecurring: true,
    weeklySchedule: "Every Tuesday at 6:00 PM"
  },
  {
    id: 2,
    name: "Pho Thai Melee",
    address: "456 Game Ave, Cambridge, MA",
    dateTime: "2025-05-15T18:00:00",
    startggLink: "https://start.gg/tournament/smashing-grounds",
    discordLink: "https://discord.gg/nemchannel-grounds",
    lat: 42.3736,
    lng: -71.1097,
    isRecurring: true,
    weeklySchedule: "Every Friday at 7:00 PM"
  },
  {
    id: 3,
    name: "HoG Monthly",
    address: "789 Falcon St, Hartford, CT",
    dateTime: "2025-05-18T12:00:00",
    startggLink: "https://start.gg/tournament/connecticut-monthly",
    discordLink: "https://discord.gg/nemchannel-ct",
    lat: 41.7658,
    lng: -72.6734,
    isRecurring: false
  },
  {
    id: 4,
    name: "Burlington Brawl",
    address: "321 Shine Dr, Burlington, VT",
    dateTime: "2025-05-24T15:00:00",
    startggLink: "https://start.gg/tournament/burlington-brawl",
    discordLink: "https://discord.gg/nemchannel-burlington",
    lat: 44.4759,
    lng: -73.2121,
    isRecurring: true,
    weeklySchedule: "Every Saturday at 3:00 PM"
  }
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with blurred background image */}
      <header className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("/api/placeholder/1200/600")', 
            filter: 'blur(4px) brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold">LOGO</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-blue-300 transition">Home</a>
            <a href="#tournaments" className="text-white hover:text-blue-300 transition">Tournaments</a>
            <a href="/blog" className="text-white hover:text-blue-300 transition">Blog</a>
            <a href="/calendar" className="text-white hover:text-blue-300 transition">Calendar</a>
            <a href="/shop" className="text-white hover:text-blue-300 transition">Shop</a>
            <a href="/wavelength" className="text-white hover:text-blue-300 transition">Wavelength 2025</a>
            <a href="/code-of-conduct" className="text-white hover:text-blue-300 transition">Code of Conduct</a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-0 z-20 w-64 bg-gray-900 bg-opacity-95 p-4 rounded-bl-lg shadow-lg">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#tournaments" className="text-white hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Tournaments</a>
              <a href="/blog" className="text-white hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Blog</a>
              <a href="/calendar" className="text-white hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Calendar</a>
              <a href="/shop" className="text-white hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Shop</a>
              <a href="/wavelength" className="text-white hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Wavelength 2025</a>
              <a href="/code-of-conduct" className="text-white hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Code of Conduct</a>
            </nav>
          </div>
        )}
        
        {/* Hero Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">New England Melee</h1>
          <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-3xl">
            The official Super Smash Bros. Melee community in the Northeast
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#tournaments" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center">
              <MapPin className="mr-2" size={18} />
              Find Tournaments
            </a>
            <a href="https://discord.gg/newenglandmelee" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center">
              <MessageCircle className="mr-2" size={18} />
              Join Discord
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Introduction Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to New England Melee</h2>
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <p className="text-lg text-gray-700 mb-4">
              New England Melee (NEM) is a vibrant community dedicated to the competitive play and celebration of Super Smash Bros. Melee throughout the New England region. 
              From weekly local events to major tournaments like Wavelength, we foster competitive growth, community building, and grassroots organizing.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're a seasoned competitor or a newcomer curious about the scene, NEM offers a welcoming environment for all players. 
              With active communities across Massachusetts, Connecticut, Rhode Island, Vermont, New Hampshire, and Maine, there's always an event near you!
            </p>
          </div>
        </section>
        
        {/* Featured Tournaments Section */}
        <section id="tournaments" className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Tournaments</h2>
            <a href="/calendar" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <Calendar className="mr-1" size={18} />
              View Full Calendar
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            {/* Map Component Placeholder */}
            <div className="w-full h-80 bg-gray-200 rounded-lg mb-8 overflow-hidden relative">
              {/* This would be your actual map component */}
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Interactive tournament map would display here</p>
                {/* For each tournament, we would render a marker at (tournament.lat, tournament.lng) */}
                {MOCK_TOURNAMENTS.map(tournament => (
                  <div 
                    key={tournament.id}
                    className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-2 -translate-y-2"
                    style={{ 
                      // Simplified positioning for mockup
                      left: `${((tournament.lng + 80) / 15) * 100}%`, 
                      top: `${100 - ((tournament.lat - 40) / 10) * 100}%`
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-4 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Data sources:</span> Our tournament data is pulled from{' '}
                <a href="https://start.gg" className="text-blue-600 hover:underline">start.gg</a>.
                For a more comprehensive view including recurring events, check our{' '}
                <a href="/calendar" className="text-blue-600 hover:underline">community calendar</a>.
              </p>
            </div>
            
            {/* Tournament List */}
            <div className="space-y-6">
              {MOCK_TOURNAMENTS.map(tournament => (
                <div key={tournament.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{tournament.name}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin size={16} className="mr-1 text-gray-400" />
                        <span>{tournament.address}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-700 font-medium">
                          {tournament.isRecurring 
                            ? <span className="flex items-center">
                                <Calendar size={16} className="mr-1 text-gray-400" />
                                Recurring: {tournament.weeklySchedule}
                              </span>
                            : <span className="flex items-center">
                                <Calendar size={16} className="mr-1 text-gray-400" />
                                {formatDate(tournament.dateTime)}
                              </span>
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a 
                        href={tournament.startggLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center"
                      >
                        <Award size={16} className="mr-1" />
                        start.gg
                      </a>
                      <a 
                        href={tournament.discordLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center"
                      >
                        <MessageCircle size={16} className="mr-1" />
                        Discord
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Discord Section */}
        <section className="mb-16">
          <div className="bg-indigo-700 rounded-xl shadow-lg p-6 md:p-8 text-white overflow-hidden relative">
            <div className="absolute right-0 opacity-10">
              <MessageCircle size={300} />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Join Our Discord Community</h2>
              <p className="text-lg mb-6 max-w-3xl">
                The New England Melee Discord is the official source of truth for tournament related communications, updates, and other community discussions. Join the server now for:
              </p>
              <ul className="space-y-2 mb-8 max-w-xl">
                <li className="flex items-start">
                  <span className="inline-flex bg-indigo-900 rounded-full w-6 h-6 items-center justify-center mr-2 mt-1 flex-shrink-0">1</span>
                  <span>Separate channels for each tournament with official updates</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex bg-indigo-900 rounded-full w-6 h-6 items-center justify-center mr-2 mt-1 flex-shrink-0">2</span>
                  <span>Community discussion channels</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex bg-indigo-900 rounded-full w-6 h-6 items-center justify-center mr-2 mt-1 flex-shrink-0">3</span>
                  <span>Slippi Direct Matchmaking</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex bg-indigo-900 rounded-full w-6 h-6 items-center justify-center mr-2 mt-1 flex-shrink-0">4</span>
                  <span>And more!</span>
                </li>
              </ul>
              <a 
                href="https://discord.gg/newenglandmelee" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg inline-flex items-center transition"
              >
                <MessageCircle size={20} className="mr-2" />
                Join Discord Server
              </a>
            </div>
          </div>
        </section>
        
        {/* Major Event Highlight - Wavelength 2025 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Wavelength 2025</h2>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              <div className="mb-6 md:mb-0 w-full md:w-1/3">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 aspect-square flex items-center justify-center">
                  <span className="text-6xl font-extrabold">λ</span>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-2xl font-bold">New England's Premier Melee Tournament</h3>
                <p className="text-lg">
                  Mark your calendars for Wavelength 2025, bringing together the best Melee players from across the region and beyond for our biggest event of the year!
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="bg-white bg-opacity-25 px-4 py-2 rounded-md">
                    <div className="text-sm opacity-75">Date</div>
                    <div className="font-bold">August 15-17, 2025</div>
                  </div>
                  <div className="bg-white bg-opacity-25 px-4 py-2 rounded-md">
                    <div className="text-sm opacity-75">Location</div>
                    <div className="font-bold">Boston Convention Center</div>
                  </div>
                </div>
                <div className="pt-4">
                  <a 
                    href="/wavelength" 
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg inline-flex items-center transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Links Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <BookOpen className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Blog</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest news, tournament recaps, and player spotlights from the New England Melee scene.
            </p>
            <a href="/blog" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Read the blog
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <Calendar className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Calendar</h3>
            </div>
            <p className="text-gray-600 mb-4">
              View our comprehensive calendar of all upcoming Melee events in New England, including weeklies, monthlies, and majors.
            </p>
            <a href="/calendar" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              See full calendar
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <User className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Code of Conduct</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Review our commitment to maintaining a safe, respectful, and inclusive environment at all NEM events.
            </p>
            <a href="/policy" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Read our policy
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">New England Melee</h2>
              <p className="text-gray-300 mb-4">
                Building and sustaining the competitive Melee community throughout the Northeast since 2013.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a href="https://discord.gg/newenglandmelee" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition">Home</a></li>
                <li><a href="/blog" className="text-gray-300 hover:text-white transition">Blog</a></li>
                <li><a href="/calendar" className="text-gray-300 hover:text-white transition">Calendar</a></li>
                <li><a href="/wavelength" className="text-gray-300 hover:text-white transition">Wavelength 2025</a></li>
                <li><a href="/code-of-conduct" className="text-gray-300 hover:text-white transition">Code of Conduct</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://start.gg" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Start.GG</a></li>
                <li><a href="https://discord.gg/TODO" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Discord</a></li>
                <li><a href="https://slippi.gg" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Slippi</a></li>
                <li><a href="https://melee.tv/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Melee.tv</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()}</p>
            <p className="mt-2">
              Super Smash Bros. Melee is a property of Nintendo. This site is not affiliated with or endorsed by Nintendo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

