import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Settings, Sparkles, Heart } from 'lucide-react';

interface HeaderBarProps {
  onOpenPersonalize: () => void;
  musicEnabled: boolean;
  onToggleMusic: () => void;
  onReplayVideo?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onOpenPersonalize,
  musicEnabled,
  onToggleMusic,
  onReplayVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Web Audio API ambient melody loop (Soft romantic piano notes)
  const startRomanticMelody = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Romantic note frequencies (F Major / D Minor scale: F3, A3, C4, E4, G4, A4, C5)
    const notes = [174.61, 220.00, 261.63, 329.63, 392.00, 440.00, 523.25, 349.23];
    let step = 0;

    const playNote = () => {
      if (!audioCtxRef.current || ctx.state !== 'running') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pick note from gentle sequence
      const freq = notes[step % notes.length];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Soft envelope for piano-like acoustic tone
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.6);

      step++;
    };

    playNote();
    intervalRef.current = window.setInterval(playNote, 1800);
    setIsPlaying(true);
  };

  const stopRomanticMelody = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopRomanticMelody();
    } else {
      startRomanticMelody();
    }
    onToggleMusic();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#FAF6EE]/80 backdrop-blur-md border-b border-[#EAE2D2]/60 px-4 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Tag */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#B39B7C] animate-pulse" />
          <span className="font-cormorant text-xs font-semibold tracking-[0.2em] uppercase text-[#5A4E42]">
            PEARL IVORY DIGITAL SAVE THE DATE
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Audio Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-cormorant tracking-wider transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#B39B7C] text-[#FAF6EE] shadow-xs'
                : 'bg-[#F2EADB] text-[#5A4E42] hover:bg-[#E8DDD0]'
            }`}
            title="Toggle Romantic Melody"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span className="hidden sm:inline uppercase text-[10px] font-bold">Music On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-70" />
                <span className="hidden sm:inline uppercase text-[10px]">Play Music</span>
              </>
            )}
          </button>

          {/* Replay Video Intro Button */}
          {onReplayVideo && (
            <button
              onClick={onReplayVideo}
              className="flex items-center space-x-1 bg-[#F2EADB] hover:bg-[#E8DDD0] text-[#4A3E33] px-3 py-1.5 rounded-full text-xs font-cormorant tracking-wider uppercase transition-colors border border-[#DFD3BF] cursor-pointer"
              title="Replay Video Intro"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B39B7C]" />
              <span className="hidden sm:inline text-[10px] font-semibold">Watch Intro</span>
            </button>
          )}

          {/* Personalize Button */}
          <button
            onClick={onOpenPersonalize}
            className="flex items-center space-x-1.5 bg-[#F2EADB] hover:bg-[#E8DDD0] text-[#4A3E33] px-3 py-1.5 rounded-full text-xs font-cormorant tracking-wider uppercase transition-colors border border-[#DFD3BF] cursor-pointer"
            title="Personalize details"
          >
            <Settings className="w-3.5 h-3.5 text-[#8C7A68]" />
            <span className="hidden sm:inline text-[10px] font-semibold">Personalize</span>
          </button>
        </div>
      </div>
    </header>
  );
};
