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
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const handleContainerClick = () => {
    if (!hasStarted) {
      setHasStarted(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A1817] overflow-hidden select-none"
      onClick={handleContainerClick}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-[#2C2825] via-[#1A1817] to-[#11100F] pointer-events-none -z-10" />

      {/* Video Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}Envelope.mp4`}
          className="w-full h-full object-cover md:object-contain max-w-5xl max-h-[85vh]"
          playsInline
          autoPlay
          muted={!data.musicEnabled}
          loop
          onEnded={onOpenInvitation}
        />

        {/* Click/Touch to Enter Overlay if autoplay restrictions block it */}
        {!hasStarted && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center cursor-pointer p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
              className="bg-[#FAF6EE]/95 border border-[#E3D6C3] px-8 py-4 rounded-full shadow-2xl text-center"
            >
              <p className="font-cormorant text-sm sm:text-base tracking-[0.25em] text-[#3D352E] uppercase font-semibold">
                Tap anywhere to open invitation
              </p>
            </motion.div>
          </div>
        )}

        {/* Skip / Enter Site Button at Bottom */}
        <div className="absolute bottom-8 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenInvitation();
            }}
            className="px-6 py-2.5 rounded-full bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#3D352E] font-cormorant text-xs sm:text-sm tracking-[0.25em] uppercase border border-[#E3D6C3] shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Skip Intro & Open
          </button>
        </div>
      </div>
    </motion.div>
  );
};
