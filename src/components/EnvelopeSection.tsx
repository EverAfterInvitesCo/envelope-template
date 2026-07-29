import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InvitationData } from '../types';

interface EnvelopeSectionProps {
  data: InvitationData;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const EnvelopeSection: React.FC<EnvelopeSectionProps> = ({
  data,
  isOpen,
  onToggleOpen,
}) => {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 pt-6 pb-12 flex flex-col items-center select-none">
      {/* Top Title - "A LOVE LETTER FROM Clara & Elliot" */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-6 space-y-1"
      >
        <p className="font-cormorant text-xs md:text-sm tracking-[0.35em] uppercase text-[#7A7167] font-medium">
          {data.eventTitle}
        </p>
        <h1 className="font-script text-4xl sm:text-6xl md:text-7xl text-[#3D352E] font-normal tracking-wide drop-shadow-xs">
          {data.coupleNames}
        </h1>
      </motion.div>

      {/* Main Open Envelope Visual Composition */}
      <div className="relative w-full max-w-2xl min-h-[520px] sm:min-h-[580px] flex items-center justify-center">
        {/* Ambient Soft Pearl Radiance Glow */}
        <div className="absolute inset-0 bg-radial from-[#FFFDF9] via-[#F8F3EA] to-transparent rounded-3xl blur-2xl opacity-80 pointer-events-none" />

        {/* Envelope Outer Box & Open Flap Architecture */}
        <div className="relative w-full bg-[#FAF6EE] border border-[#E8DFC2] rounded-2xl envelope-shadow overflow-hidden transition-all duration-700">
          
          {/* OPEN TOP FLAP (TRIANGLE APEX POINTING UPWARDS WITH LACE BORDER) */}
          <div className="absolute top-0 inset-x-0 h-28 sm:h-36 z-0 pointer-events-none overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
              {/* Back flap paper interior */}
              <polygon points="0,120 300,0 600,120" fill="#F4EBDC" stroke="#E3D6C3" strokeWidth="1.5" />
              {/* Lace trim along flap edges */}
              <path
                d="M 10 116 L 295 8 Q 300 6 305 8 L 590 116"
                stroke="#E8DFC2"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
          </div>

          {/* INNER ENVELOPE LINING / BACKDROP */}
          <div className="relative w-full min-h-[500px] sm:min-h-[560px] p-3 sm:p-6 flex flex-col justify-between overflow-hidden">
            
            {/* BACKDROP ELEMENT: Square Intricate Lace Doily */}
            <div className="absolute top-4 right-4 sm:right-8 w-56 h-56 sm:w-72 sm:h-72 pointer-events-none opacity-85 z-0">
              <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                <rect x="10" y="10" width="180" height="180" rx="16" fill="#F7F1E6" stroke="#E3D7C5" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="70" stroke="#DFD2BF" strokeWidth="1" fill="none" />
                <circle cx="100" cy="100" r="50" stroke="#D3C3AD" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                {/* Lace Petals */}
                {Array.from({ length: 16 }).map((_, i) => {
                  const angle = (i * 360) / 16;
                  const rad = (angle * Math.PI) / 180;
                  const x = 100 + Math.cos(rad) * 65;
                  const y = 100 + Math.sin(rad) * 65;
                  return <circle key={i} cx={x} cy={y} r="8" fill="#FAF6EE" stroke="#E1D5C3" strokeWidth="1" />;
                })}
              </svg>
            </div>

            {/* EMERGING CARDS & PHOTOS LAYER (Rising up out of the envelope pocket) */}
            <div className="relative w-full flex flex-row items-end justify-between px-1 sm:px-6 z-10 pt-8 pb-24 sm:pb-28">
              
              {/* LEFT CARD: Ornate Scalloped Oval Frame with Couple Photo & Calla Lilies */}
              <motion.div
                initial={{ y: 80, rotate: -6, opacity: 0 }}
                animate={{ y: 0, rotate: -3, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-1/2 max-w-[240px] sm:max-w-[280px] -mr-4 sm:-mr-8 z-20"
              >
                {/* Calla Lily Flowers sticking out on the left edge */}
                <div className="absolute -top-8 -left-5 sm:-left-7 w-14 sm:w-18 h-32 pointer-events-none z-30">
                  <svg viewBox="0 0 60 120" fill="none" className="w-full h-full drop-shadow-md">
                    {/* Stem */}
                    <path d="M 30 110 Q 20 60, 15 10" stroke="#7A8B6E" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 38 115 Q 32 70, 35 25" stroke="#8A9B7E" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Calla Flower 1 */}
                    <path d="M 15 10 C 5 5, 5 -5, 20 -2 C 30 -2, 28 15, 15 10 Z" fill="#FFFCF7" stroke="#E2D6C4" strokeWidth="1" />
                    <ellipse cx="17" cy="4" rx="2" ry="6" fill="#EAD49B" />
                    {/* Calla Flower 2 */}
                    <path d="M 35 25 C 25 20, 25 10, 40 13 C 50 13, 48 30, 35 25 Z" fill="#FFFDF9" stroke="#E2D6C4" strokeWidth="1" />
                    <ellipse cx="37" cy="19" rx="1.5" ry="5" fill="#EAD49B" />
                  </svg>
                </div>

                {/* Molded Ivory Oval Frame Container */}
                <div className="relative bg-gradient-to-b from-[#FAF6EE] to-[#F1E7D8] p-3 rounded-[42px] border-2 border-[#E3D6C3] card-lace-shadow flex flex-col items-center">
                  {/* Scalloped Frame Rim */}
                  <div className="w-full h-full rounded-[36px] border border-[#DDD0BC] p-2 bg-[#F6EDDF] flex flex-col items-center">
                    <div className="relative w-full aspect-[4/5] rounded-[50%] p-1.5 bg-[#FAF6EE] border border-[#D3C4B0] shadow-inner overflow-hidden">
                      <img
                        src={data.couplePhoto}
                        alt="Couple Portrait"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-[50%] transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT CARD: Save the Date Card with Bride Photo */}
              <motion.div
                initial={{ y: 80, rotate: 6, opacity: 0 }}
                animate={{ y: 0, rotate: 3, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-1/2 max-w-[240px] sm:max-w-[280px] z-10"
              >
                <div className="bg-[#FAF6EE] border border-[#E3D6C3] p-3 sm:p-4 rounded-xl card-lace-shadow flex flex-col items-center space-y-2">
                  {/* Title: Save the Date */}
                  <h2 className="font-script text-3xl sm:text-4xl text-[#3D352E] pt-1">
                    Save the Date
                  </h2>

                  {/* Polaroid Style Photo Frame */}
                  <div className="relative w-full aspect-[4/3] bg-white p-1.5 rounded-sm border border-[#E2D6C4] shadow-xs">
                    <img
                      src={data.bridePhoto}
                      alt="Bride Walk"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-2xs transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* FRONT ENVELOPE POCKET COVER (OVERLAPS CARDS AT BOTTOM TO CREATE TUCKED IN EFFECT) */}
            <div className="absolute bottom-0 inset-x-0 h-48 sm:h-56 z-30 pointer-events-none">
              {/* Deep V-Cut Envelope Pocket SVG */}
              <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FAF6EE" />
                    <stop offset="100%" stopColor="#EFE5D5" />
                  </linearGradient>
                  <filter id="pocketShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="-5" stdDeviation="8" floodColor="#3D352E" floodOpacity="0.14" />
                  </filter>
                </defs>

                {/* V-Cut Pocket shape */}
                <path
                  d="M 0,220 L 0,40 L 260,120 Q 300,135 340,120 L 600,40 L 600,220 Z"
                  fill="url(#pocketGrad)"
                  stroke="#E3D7C5"
                  strokeWidth="1.5"
                  filter="url(#pocketShadow)"
                />
              </svg>

              {/* CENTER HEART LACE DATE BADGE (Sits right on top of the V-cut pocket notch) */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto">
                <div className="relative bg-[#FAF6EE] px-6 sm:px-8 py-2.5 rounded-full border-2 border-[#E3D6C3] card-lace-shadow flex items-center justify-center space-x-2">
                  <span className="text-xs text-[#A8937D]">❦</span>
                  <span className="font-cormorant text-base sm:text-xl font-bold tracking-[0.22em] text-[#3D352E]">
                    {data.displayDate}
                  </span>
                  <span className="text-xs text-[#A8937D]">❦</span>
                </div>
              </div>

              {/* BOTTOM EMBOSSED WAX SEAL MEDALLION */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#EAE0D1] via-[#D8CA8] to-[#BCA890] wax-seal-shadow border border-[#FAF3E8] p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-[#FAF1E6]/70 flex flex-col items-center justify-center text-center p-1 bg-[#E1D0BC]/40">
                    <span className="font-pinyon text-2xl sm:text-3xl text-[#4A3E33]">
                      {data.brideName[0]}&{data.groomName[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* DRAPED PEARL STRAND (Hanging down right side of envelope pocket) */}
              <div className="absolute top-4 right-2 sm:right-6 w-28 sm:w-36 h-44 pointer-events-none z-40">
                <svg className="w-full h-full" viewBox="0 0 120 180">
                  {/* Double pearl strand loop */}
                  <path
                    d="M 100 -10 Q 110 90, 50 145 T 20 180"
                    stroke="#D5C4B0"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 115 0 Q 125 110, 60 160"
                    stroke="#DFCFC0"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Pearl beads along main loop */}
                  {[
                    { cx: 102, cy: 15, r: 4 },
                    { cx: 105, cy: 35, r: 4.5 },
                    { cx: 103, cy: 58, r: 5 },
                    { cx: 95, cy: 82, r: 5 },
                    { cx: 80, cy: 106, r: 5 },
                    { cx: 62, cy: 128, r: 4.5 },
                    { cx: 45, cy: 148, r: 4 },
                    { cx: 28, cy: 165, r: 3.5 },
                  ].map((p, i) => (
                    <g key={i}>
                      <circle cx={p.cx} cy={p.cy} r={p.r} fill="#FFFCF8" stroke="#D3C3B0" strokeWidth="0.8" />
                      <circle cx={p.cx - p.r * 0.3} cy={p.cy - p.r * 0.3} r={p.r * 0.35} fill="#FFFFFF" />
                    </g>
                  ))}
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

