interface GeocodingResult {
  lat: string;
  lon: string;
}

class GeocodingService {
  async geocodeAddress(address: string): Promise<[number, number] | undefined> {
    try {
      // Add a small delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await fetch(`/geocode/search?q=${encodeURIComponent(address)}&limit=1&format=json`);
      
      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status} ${response.statusText}`);
      }

      const results = await response.json() as GeocodingResult[];

      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        return [parseFloat(lat), parseFloat(lon)];
      }
    } catch (error) {
      console.error(`Failed to geocode address: ${address}`, error);
    }
    
    return undefined;
  }

  async geocodeAddresses(addresses: string[]): Promise<Record<string, [number, number] | undefined>> {
    const results: Record<string, [number, number] | undefined> = {};
    
    for (const address of addresses) {
      if (!address) continue;
      results[address] = await this.geocodeAddress(address);
    }
    
    return results;
  }
}

// Export singleton instance
export const geocodingService = new GeocodingService(); 