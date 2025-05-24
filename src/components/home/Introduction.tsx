import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to New England Melee</h2>
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <p className="text-lg text-gray-700 mb-4">
          New England Melee (NEM) is a vibrant community dedicated to the competitive play and celebration of Super Smash Bros. Melee throughout the New England region.
          From weekly local events to major tournaments we foster competitive growth, community building, and grassroots organizing.
        </p>
        <p className="text-lg text-gray-700">
          Whether you're a seasoned competitor or a newcomer curious about the scene, NEM offers a welcoming environment for all players.
          With active communities across Massachusetts, Connecticut, Rhode Island, Vermont, New Hampshire, and Maine, there's always an event near you!
        </p>
      </div>
    </section>
  );
};

export default Introduction; 