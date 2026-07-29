import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { InvitationData } from '../types';
import { Calendar, MapPin, Share2, Check } from 'lucide-react';

interface DetailsSectionProps {
  data: InvitationData;
  onOpenAddressModal: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({
  data,
  onOpenAddressModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate live countdown to target wedding date
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(data.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [data.weddingDate]);

  // Handle ICS File Download for Calendar
  const handleAddToCalendar = () => {
    const title = `${data.coupleNames} Wedding`;
    const details = `Join us for the wedding of ${data.coupleNames} in ${data.locationName}.`;
    const location = data.venueDetails;
    const startDate = new Date(data.weddingDate)
      .toISOString()
      .replace(/-|:|\.\d+/g, '');
    const endDate = new Date(new Date(data.weddingDate).getTime() + 6 * 3600000)
      .toISOString()
      .replace(/-|:|\.\d+/g, '');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Pearl Ivory Save The Date//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${data.coupleNames.replace(/\s+/g, '_')}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Copy Link
  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center space-y-16 text-center select-none">
      {/* Decorative Top Divider */}
      <div className="flex items-center justify-center space-x-4 opacity-60">
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#C4B5A5] to-transparent" />
        <span className="text-[#8C7A68] text-sm">✦</span>
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#C4B5A5] to-transparent" />
      </div>

      {/* MEET US IN Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-4 max-w-2xl"
      >
        <p className="font-cormorant text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7A6C5D] font-semibold">
          MEET US IN
        </p>

        <h2 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#332A24] font-normal leading-tight">
          {data.locationName}
        </h2>

        {/* Date & Time details formatted in uppercase serif */}
        <div className="space-y-2 pt-4">
          <p className="font-cormorant text-sm sm:text-lg tracking-[0.25em] uppercase text-[#4A3E33] font-medium">
            {data.dateFormatted}
          </p>
          <p className="font-cormorant text-xs sm:text-base tracking-[0.2em] uppercase text-[#7A6C5D]">
            {data.timeFormatted}
          </p>
          <p className="font-cormorant text-xs sm:text-sm tracking-[0.18em] uppercase text-[#8C7B6B] italic pt-2">
            {data.messageText}
          </p>
        </div>

        {/* Venue Location Sub-text & Maps button */}
        <div className="pt-2 flex justify-center items-center space-x-2 text-[#7A6C5D] text-xs font-cormorant">
          <MapPin className="w-3.5 h-3.5 text-[#B89D82]" />
          <span>{data.venueDetails}</span>
        </div>
      </motion.div>

      {/* COUNTDOWN TIMER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-[#FAF6EE]/80 border border-[#EBE2D3] rounded-2xl p-6 sm:p-8 card-lace-shadow backdrop-blur-xs space-y-4"
      >
        <p className="font-cormorant text-xs tracking-[0.25em] uppercase text-[#8C7B6B] font-semibold">
          COUNTING DOWN TO OUR BIG DAY
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 items-center">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-[#F4ECDF] py-3 sm:py-4 px-2 rounded-xl border border-[#E2D6C4]/60"
            >
              <span className="font-cormorant text-2xl sm:text-4xl md:text-5xl font-bold text-[#3D352E] tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-cormorant text-[9px] sm:text-xs tracking-[0.2em] text-[#7A6C5D] uppercase mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ACTION BUTTONS: "KINDLY SHARE YOUR ADDRESS HERE" & CALENDAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center space-y-6 w-full max-w-md"
      >
        {/* Main Pill Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenAddressModal}
          className="w-full bg-[#B39B7C] hover:bg-[#A38B6C] text-[#FAF6EE] py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-cormorant text-sm sm:text-base font-semibold tracking-[0.25em] uppercase border border-[#CBB394] cursor-pointer"
        >
          RSVP PLEASE
        </motion.button>

        {/* Secondary Utility Actions (Add to Calendar & Share) */}
        <div className="flex items-center justify-center space-x-4 pt-1">
          <button
            onClick={handleAddToCalendar}
            className="flex items-center space-x-2 bg-[#F2EADB] hover:bg-[#E8DDD0] text-[#4A3E33] px-4 py-2 rounded-full border border-[#DFD3BF] text-xs font-cormorant font-medium tracking-wider uppercase transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#8C7A68]" />
            <span>Add to Calendar</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-[#F2EADB] hover:bg-[#E8DDD0] text-[#4A3E33] px-4 py-2 rounded-full border border-[#DFD3BF] text-xs font-cormorant font-medium tracking-wider uppercase transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#8C7A68]" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>

        {/* "WE LOOK FORWARD TO CELEBRATING TOGETHER" */}
        <p className="font-cormorant text-xs sm:text-sm tracking-[0.22em] uppercase text-[#6B5E52] pt-4 font-medium">
          WE LOOK FORWARD TO CELEBRATING TOGETHER
        </p>
      </motion.div>

      {/* FOOTER & CREST MONOGRAM WITH SILK BACKGROUND */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full rounded-3xl overflow-hidden mt-12 py-16 px-6 border border-[#EAE2D2] shadow-md flex flex-col items-center justify-center space-y-4 text-center bg-[#FAF6EE]"
      >
        {/* Silk Background Image filling the entire footer */}
        <img
          src={data.silkBgPhoto}
          alt="Silk Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />

        {/* Soft readable overlay tint */}
        <div className="absolute inset-0 bg-[#FAF6EE]/50 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 space-y-3 flex flex-col items-center">
          <p className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#7A6C5D] font-medium">
            WITH LOVE
          </p>

          {/* Oval Monogram Medallion */}
          <div className="w-24 h-24 rounded-[50%] border-2 border-[#D5C4B0] bg-[#FAF6EE]/90 flex flex-col items-center justify-center shadow-md p-2">
            <span className="font-script text-3xl text-[#3D352E] leading-none">
              {data.brideName[0]}&{data.groomName[0]}
            </span>
            <span className="text-[10px] font-cormorant tracking-widest uppercase text-[#8C7B6B] mt-1">
              2027
            </span>
          </div>

          <p className="font-script text-3xl text-[#3D352E]">
            {data.coupleNames}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
