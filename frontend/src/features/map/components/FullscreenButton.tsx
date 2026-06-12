import { Maximize, Minimize } from 'lucide-react';

type FullscreenButtonProps = {
  isFullscreen: boolean;
  onToggle: () => void;
};

export function FullscreenButton({ isFullscreen, onToggle }: FullscreenButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
      className="absolute bottom-6 right-4 z-[1000] w-12 h-12 bg-white rounded-full shadow-lg border border-border/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
    >
      {isFullscreen ? (
        <Minimize size={20} strokeWidth={2.5} />
      ) : (
        <Maximize size={20} strokeWidth={2.5} />
      )}
    </button>
  );
}
