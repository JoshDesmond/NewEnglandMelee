import fs from 'fs/promises';
import path from 'path';

interface GoogleGeocodingResult {
  results: Array<{
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
  status: string;
}

interface GeocodeCache {
  [address: string]: {
    coordinates: [number, number];
    timestamp: number;
  };
}

class GeocodingService {
  private readonly BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  private readonly apiKey: string;
  private readonly CACHE_FILE = path.join(__dirname, 'geocode-cache.json');
  private cache: GeocodeCache = {};

  constructor() {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_MAPS_API_KEY environment variable is not set');
    }
    this.apiKey = apiKey;
    this.loadCache().catch(error => {
      console.error('Failed to load geocoding cache:', error);
    });
  }

  private async loadCache(): Promise<void> {
    try {
      const data = await fs.readFile(this.CACHE_FILE, 'utf-8');
      this.cache = JSON.parse(data);
      console.log(`Loaded ${Object.keys(this.cache).length} addresses from geocoding cache`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // Cache file doesn't exist yet, that's ok
        console.log('No existing geocoding cache found, starting fresh');
        this.cache = {};
      } else {
        throw error;
      }
    }
  }

  private async saveCache(): Promise<void> {
    try {
      await fs.writeFile(this.CACHE_FILE, JSON.stringify(this.cache, null, 2));
      console.log(`Saved ${Object.keys(this.cache).length} addresses to geocoding cache`);
    } catch (error) {
      console.error('Failed to save geocoding cache:', error);
    }
  }

  async geocodeAddress(address: string): Promise<[number, number] | undefined> {
    const normalizedAddress = address.trim();
    
    // Check cache first
    const cached = this.cache[normalizedAddress];
    if (cached) {
      console.log(`Cache hit for address: ${normalizedAddress}`);
      return cached.coordinates;
    }

    try {
      console.log(`Cache miss for address: ${normalizedAddress}, querying API`);
      
      const params = new URLSearchParams({
        address: normalizedAddress,
        key: this.apiKey
      });

      const url = `${this.BASE_URL}?${params}`;
      console.log(`Making request to Google Maps Geocoding API`);

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as GoogleGeocodingResult;
      
      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const formattedAddress = data.results[0].formatted_address;
        const coordinates: [number, number] = [lat, lng];
        
        // Update cache with new result
        this.cache[normalizedAddress] = {
          coordinates,
          timestamp: Date.now()
        };
        await this.saveCache();
        
        console.log(`Successfully geocoded address: ${normalizedAddress} to [${lat}, ${lng}] (${formattedAddress})`);
        return coordinates;
      } else {
        console.warn(`No results found for address: ${normalizedAddress}. Status: ${data.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to geocode address: ${normalizedAddress}`, {
          message: error.message,
          name: error.name
        });
      } else {
        console.error(`Failed to geocode address: ${normalizedAddress} with unknown error:`, error);
      }
    }
    
    return undefined;
  }

  async geocodeAddresses(addresses: string[]): Promise<{ [address: string]: [number, number] | undefined }> {
    console.log(`Geocoding ${addresses.length} addresses`);
    
    // Process all addresses in parallel
    const results = await Promise.all(
      addresses.map(async (address) => {
        const coordinates = await this.geocodeAddress(address);
        return { address, coordinates };
      })
    );

    // Convert array of results to object
    const geocodedLocations = results.reduce((acc, { address, coordinates }) => {
      acc[address] = coordinates;
      return acc;
    }, {} as { [address: string]: [number, number] | undefined });

    return geocodedLocations;
  }
}

// Export singleton instance
export const geocodingService = new GeocodingService(); 