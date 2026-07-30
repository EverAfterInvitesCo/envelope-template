import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface HeaderBarProps {
  musicEnabled: boolean;
  onToggleMusic: () => void;
  onReplayVideo?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  musicEnabled,
  onToggleMusic,
  onReplayVideo,
}) => {
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
          {/* Audio Music Toggle Button */}
          <button
            onClick={onToggleMusic}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-cormorant tracking-wider transition-all cursor-pointer ${
              musicEnabled
                ? 'bg-[#B39B7C] text-[#FAF6EE] shadow-xs'
                : 'bg-[#F2EADB] text-[#5A4E42] hover:bg-[#E8DDD0]'
            }`}
            title="Toggle Music"
          >
            {musicEnabled ? (
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
        </div>
      </div>
    </header>
  );
};
