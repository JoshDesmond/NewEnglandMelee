import React from 'react';
import { MessageCircle } from 'lucide-react';

const DiscordSection: React.FC = () => {
  return (
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
  );
};

export default DiscordSection; 