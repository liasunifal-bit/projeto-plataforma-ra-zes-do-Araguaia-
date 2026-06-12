import { Layers } from 'lucide-react';

type SatelliteToggleProps = {
  isSatellite: boolean;
  onToggle: () => void;
};

export function SatelliteToggle({ isSatellite, onToggle }: SatelliteToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isSatellite ? 'Modo Offline' : 'Modo Satélite'}
      className={`absolute bottom-[136px] right-4 z-[1000] w-12 h-12 rounded-full shadow-lg border flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
        isSatellite
          ? 'bg-primary text-white border-primary hover:bg-primary/90 hover:shadow-xl'
          : 'bg-white text-primary border-border/30 hover:bg-primary hover:text-white hover:shadow-xl'
      }`}
    >
      <Layers size={20} strokeWidth={2.5} />
    </button>
  );
}
