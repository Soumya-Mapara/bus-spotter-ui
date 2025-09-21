import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock } from 'lucide-react';

interface LocationDisplayProps {
  busId: string;
  latitude: number;
  longitude: number;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ busId, latitude, longitude }) => {
  const currentTime = new Date().toLocaleString();

  return (
    <div className="space-y-6">
      {/* Bus Info Header */}
      <div className="text-center">
        <div className="text-3xl mb-2">🚌</div>
        <h3 className="text-xl font-semibold">Bus {busId}</h3>
        <Badge variant="secondary" className="mt-2">
          <Navigation className="w-3 h-3 mr-1" />
          Active
        </Badge>
      </div>

      {/* Location Details */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <MapPin className="w-5 h-5 text-transport-primary mt-0.5" />
          <div className="flex-1">
            <div className="font-medium text-sm text-muted-foreground">Latitude</div>
            <div className="text-lg font-mono">{latitude.toFixed(6)}</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <MapPin className="w-5 h-5 text-transport-primary mt-0.5" />
          <div className="flex-1">
            <div className="font-medium text-sm text-muted-foreground">Longitude</div>
            <div className="text-lg font-mono">{longitude.toFixed(6)}</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <Clock className="w-5 h-5 text-transport-primary mt-0.5" />
          <div className="flex-1">
            <div className="font-medium text-sm text-muted-foreground">Last Updated</div>
            <div className="text-sm">{currentTime}</div>
          </div>
        </div>
      </div>

      {/* Coordinates Summary */}
      <Card className="p-4 bg-gradient-primary text-primary-foreground">
        <div className="text-center">
          <div className="font-medium text-sm opacity-90 mb-1">Current Position</div>
          <div className="font-mono text-lg">
            {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LocationDisplay;