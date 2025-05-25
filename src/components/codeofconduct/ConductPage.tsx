import React from 'react';

const ConductPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Title and Introduction */}
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
              Code of Conduct
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              This Code of Conduct is designed to promote a positive, inclusive, and respectful environment for all participants. 
              By attending or participating in our tournaments, you agree to abide by the following guidelines:
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {/* General Conduct Section */}
            <section className="p-8 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">General Conduct</h2>
              </div>
              <ul className="list-none space-y-3 ml-16">
                {[
                  "Treat all competitors, spectators, and TOs with respect and courtesy.",
                  "Encourage fair play and good sportsmanship.",
                  "Accept the outcomes of matches gracefully, be mindful of pop offs.",
                  "Follow all venue rules and restrictions (no outside food or drink, etc)."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Inclusivity Section */}
            <section className="p-8 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Inclusivity and Respect</h2>
              </div>
              <ul className="list-none space-y-3 ml-16">
                {[
                  "This is a community for players of all genders, races, ages and backgrounds.",
                  "Refrain from discriminatory language, slurs, or derogatory comments.",
                  "Respect personal boundaries and consent.",
                  "No form of harassment, bullying, or intimidation will be tolerated. This includes, but is not limited to, physical, verbal, or online harassment.",
                  "Report any incidents of harassment to event organizers or event appropriate persons immediately."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Fair Play Section */}
            <section className="p-8 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Fair Play</h2>
              </div>
              <ul className="list-none space-y-3 ml-16">
                {[
                  "Cheating in any form will not be tolerated and may result in disqualification.",
                  "Please be aware of controller rules.",
                  "Report any suspected cheating to event organizers or appropriate persons."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Appearance Section */}
            <section className="p-8 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Appearance</h2>
              </div>
              <ul className="list-none space-y-3 ml-16">
                {[
                  "Maintain personal hygiene and adhere to appropriate dress standards.",
                  "Keep your clothes appropriate for the event being hosted."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Consequences Section */}
            <section className="p-8 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Consequences for Violation</h2>
              </div>
              <ul className="list-none space-y-3 ml-16">
                {[
                  "Event organizers and NEM admins reserve the right to enforce disciplinary actions for any violation of this code.",
                  "Disciplinary actions may include verbal warnings, disqualification, or banning from future events."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Disclaimer */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              This Code of Conduct is established to support the overall New England Melee community. Individual tournament organizers may choose to adopt, modify, or disregard parts or the entirety of this Code of Conduct. In response to any incidents or events, organizers may enforce their own disciplinary actions. NEM admins may independently review each case and take appropriate action as necessary. Tournament organizers have the discretion to uphold or disregard any bans or disciplinary measures imposed by NEM admins and New England Melee community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConductPage; 