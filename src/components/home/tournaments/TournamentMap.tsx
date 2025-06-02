import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Tournament } from '../../../../shared/types';
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

// Multi-tournament icon for locations with multiple events
const multiIcon = new Icon({
  iconUrl: '/images/marker-icon.png', // You could create a different icon here
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

interface GroupedLocation {
  coordinates: [number, number];
  tournaments: Tournament[];
}

const TournamentMap: React.FC<TournamentMapProps> = ({ tournaments }) => {
  // Center on Portsmouth, NH
  const center: [number, number] = [43.0718, -70.7626];
  const zoom = 6; // Zoomed out slightly to show more of New England

  // Group tournaments by location
  const groupedLocations: GroupedLocation[] = React.useMemo(() => {
    const locationMap = new Map<string, Tournament[]>();
    
    tournaments.forEach((tournament) => {
      if (!tournament.coordinates) return;
      
      // Create a key based on coordinates (rounded to avoid floating point issues)
      const coordKey = `${tournament.coordinates[0].toFixed(6)},${tournament.coordinates[1].toFixed(6)}`;
      
      if (!locationMap.has(coordKey)) {
        locationMap.set(coordKey, []);
      }
      locationMap.get(coordKey)!.push(tournament);
    });

    return Array.from(locationMap.entries()).map(([coordKey, tournaments]) => {
      const [lat, lng] = coordKey.split(',').map(Number);
      return {
        coordinates: [lat, lng] as [number, number],
        tournaments: tournaments.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
      };
    });
  }, [tournaments]);

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
        {groupedLocations.map((location, index) => {
          const isMultiple = location.tournaments.length > 1;
          
          return (
            <Marker
              key={`location-${index}`}
              position={location.coordinates}
              icon={isMultiple ? multiIcon : icon}
            >
              <Popup maxWidth={300}>
                <div className="p-1">
                  {isMultiple && (
                    <div className="text-xs text-gray-500 mb-2 font-medium">
                      {location.tournaments.length} tournaments at this location
                    </div>
                  )}
                  {location.tournaments.map((tournament, tournamentIndex) => (
                    <div 
                      key={tournament.id} 
                      className={`${tournamentIndex > 0 ? 'border-t border-gray-200 pt-2 mt-2' : ''}`}
                    >
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
                  ))}
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