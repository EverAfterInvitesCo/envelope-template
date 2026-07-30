import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { InvitationData } from '../types';

interface VideoIntroScreenProps {
  data: InvitationData;
  onOpenInvitation: () => void;
}

export const VideoIntroScreen: React.FC<VideoIntroScreenProps> = ({
  data,
  onOpenInvitation,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-white select-none overflow-hidden cursor-pointer"
      onClick={onOpenInvitation}
    >
      {/* Full Frame Video filling the entire viewport */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}Envelope.mp4`}
          autoPlay
          loop
          muted
          playsInline
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.triedDecorative) {
              target.dataset.triedDecorative = 'true';
              target.src = `${import.meta.env.BASE_URL}Decorative_panel_rotating_upward_202607291613.mp4`;
            }
          }}
          className="w-full h-full object-cover opacity-95"
        />
        {/* Soft Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Top Banner overlay */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 text-center pt-10 sm:pt-14 px-4 space-y-1"
      >
        <p className="font-cormorant text-xs sm:text-sm tracking-[0.4em] uppercase text-[#E8DEC3] font-semibold drop-shadow-md">
          {data.eventTitle}
        </p>
        <h1 className="font-script text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-wide drop-shadow-lg">
          {data.coupleNames}
        </h1>
      </motion.div>

      {/* Play/Pause Control in top right */}
      <button
        onClick={togglePlay}
        className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-cormorant tracking-widest uppercase hover:bg-black/60 transition-all cursor-pointer"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Bottom Center Wax Seal Medallion (Without the Open Button) */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 pb-12 sm:pb-16 flex flex-col items-center space-y-4 px-4 pointer-events-none"
      >
        <div className="flex flex-col items-center space-y-3">
          {/* Embossed Wax Seal Medallion */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#EFE3D3] via-[#DDD0BD] to-[#C4B29A] wax-seal-shadow flex items-center justify-center border-2 border-[#FAF3E8] p-1.5 transition-transform duration-300">
            <div className="w-full h-full rounded-full border border-[#FAF0E4]/80 flex flex-col items-center justify-center text-center p-2 bg-[#E5D5C2]/60 backdrop-blur-xs">
              <span className="font-pinyon text-3xl sm:text-4xl text-[#4A3E33] font-normal leading-none mb-0.5">
                {data.brideName[0]}&{data.groomName[0]}
              </span>
              <span className="font-cormorant text-[9px] sm:text-[10px] tracking-[0.25em] text-[#5C4F42] font-semibold uppercase">
                {data.displayDate}
              </span>
            </div>
            <span className="absolute inset-0 rounded-full border border-[#FAF3E8] animate-ping opacity-30" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
