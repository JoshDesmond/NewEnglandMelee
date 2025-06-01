import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Tournament } from '../../../lib/types';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const icon = new Icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface TournamentMapProps {
  tournaments: Tournament[];
}

/**
 * See: https://claude.ai/share/21d5380e-62da-4b36-9507-7729ff9693e9
 * TL;DR: Use Leaflet with React-Leaflet, https://react-leaflet.js.org/
 */

const TournamentMap: React.FC<TournamentMapProps> = ({ tournaments }) => {
  // Center on New England (roughly)
  const center: [number, number] = [42.3601, -71.0589];
  const zoom = 8;

  return (
    <div className="w-full h-80 rounded-lg mb-8 overflow-hidden relative">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {tournaments.map((tournament) => {
          if (!tournament.coordinates) return null;
          
          return (
            <Marker
              key={tournament.id}
              position={tournament.coordinates}
              icon={icon}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-sm mb-1">{tournament.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{tournament.address}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(tournament.dateTime).toLocaleDateString()}
                  </p>
                  {tournament.startggLink && (
                    <a
                      href={tournament.startggLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1 block"
                    >
                      View on start.gg
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default TournamentMap; 