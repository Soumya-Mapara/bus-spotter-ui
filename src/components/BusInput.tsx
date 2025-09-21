import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Loader2 } from 'lucide-react';

interface BusInputProps {
  onTrackBus: (busId: string) => void;
  isLoading: boolean;
}

const BusInput: React.FC<BusInputProps> = ({ onTrackBus, isLoading }) => {
  const [busId, setBusId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrackBus(busId.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="busId" className="text-base font-medium">
          Bus ID
        </Label>
        <Input
          id="busId"
          type="text"
          placeholder="Enter Bus ID (e.g. BUS001)"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          disabled={isLoading}
          className="text-base"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading || !busId.trim()}
        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-200"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Tracking Bus...
          </>
        ) : (
          <>
            <MapPin className="mr-2 h-4 w-4" />
            Track Bus
          </>
        )}
      </Button>
    </form>
  );
};

export default BusInput;