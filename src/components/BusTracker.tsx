import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import BusInput from './BusInput';
import BusMap from './BusMap';
import LocationDisplay from './LocationDisplay';
import { useToast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';

interface BusLocation {
  bus_id: string;
  lat: number;
  lon: number;
}

const BusTracker = () => {
  const [busLocation, setBusLocation] = useState<BusLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [busId, setBusId] = useState('');
  const { toast } = useToast();

  const handleTrackBus = async (inputBusId: string) => {
    if (!inputBusId.trim()) {
      toast({
        title: "Bus ID Required",
        description: "Please enter a valid Bus ID to track.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setBusId(inputBusId);

    try {
      const response = await fetch(API_ENDPOINTS.latest);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch bus data: ${response.statusText}`);
      }

      const busData: BusLocation[] = await response.json();
      const foundBus = busData.find(bus => bus.bus_id === inputBusId);

      if (foundBus) {
        setBusLocation(foundBus);
        toast({
          title: "Bus Found!",
          description: `Successfully located Bus ${inputBusId}`,
        });
      } else {
        setBusLocation(null);
        toast({
          title: "Bus Not Found",
          description: `No location data found for Bus ID: ${inputBusId}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching bus location:', error);
      setBusLocation(null);
      toast({
        title: "Error",
        description: "Failed to fetch bus location. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Bus Tracker
          </h1>
          <p className="text-muted-foreground text-lg">
            Enter a Bus ID to track its real-time location
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-6 shadow-md">
          <BusInput onTrackBus={handleTrackBus} isLoading={isLoading} />
        </Card>

        {/* Map and Location Display */}
        {busLocation && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-0 overflow-hidden shadow-lg">
              <BusMap 
                latitude={busLocation.lat} 
                longitude={busLocation.lon}
                busId={busLocation.bus_id}
              />
            </Card>
            <Card className="p-6 shadow-md">
              <LocationDisplay 
                busId={busLocation.bus_id}
                latitude={busLocation.lat}
                longitude={busLocation.lon}
              />
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!busLocation && !isLoading && (
          <Card className="p-12 text-center shadow-md">
            <div className="text-muted-foreground">
              <div className="text-6xl mb-4">🚌</div>
              <h3 className="text-xl font-semibold mb-2">Ready to Track</h3>
              <p>Enter a Bus ID above to see its location on the map</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BusTracker;