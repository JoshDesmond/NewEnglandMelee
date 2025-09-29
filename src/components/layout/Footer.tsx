import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-white border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="https://calendar.google.com/calendar/u/0/embed?src=86oup09opi66vbhshrftu4uijs@group.calendar.google.com&ctz=America/New_York" 
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Calendar
                </a>
              </li>
              <li>
                <a href="/code-of-conduct" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-white border-b border-gray-700 pb-2">
              Resources
            </h3>
            <ul className="space-y-3">
	            <li>
                <a href="https://braacket.com/league/nemelee/dashboard" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  NEM Braacket
                </a>
              </li>
              <li>
                <a href="https://benjaminsg.github.io/NESlippiLeaderboard/#/" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  NEM Slippi Leaderboard
                </a>
              </li>
              <li>
                <a href="https://start.gg" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Start.gg
                </a>
              </li>
              <li>
                <a href="https://slippi.gg" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Slippi
                </a>
              </li>
              <li>
                <a href="https://melee.tv/" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Melee.tv
                </a>
              </li>
            </ul>
          </div>

          {/* Media Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-white border-b border-gray-700 pb-2">
              Media
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://bsky.app/profile/newenglandmelee.bsky.social" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  NEM Bluesky
                </a>
              </li>
              <li>
                <a href="https://x.com/NewEnglandMelee" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  NEM Twitter
                </a>
              </li>
              <li>
                <a href="https://youtube.com/playlist?list=PL1Mlj9l8aY1tEGzGCNLj0SRvMVMC4jfw9&si=Yvvj4CbdI9lRL3L1" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  The NEM Podcast
                </a>
              </li>
              <li>
                <a href="https://discord.com/invite/zfemYAwWbj" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  NEM Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Disclaimer */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} New England Melee
            </p>
            <p className="text-gray-500 text-xs max-w-2xl mx-auto">
              Super Smash Bros. Melee is a property of Nintendo. This site is not affiliated with or endorsed by Nintendo.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
