import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { DEFAULT_INVITATION } from './constants';
import { InvitationData, GuestRSVP } from './types';
import { HeaderBar } from './components/HeaderBar';
import { EnvelopeSection } from './components/EnvelopeSection';
import { DetailsSection } from './components/DetailsSection';
import { AddressModal } from './components/AddressModal';
import { PersonalizeModal } from './components/PersonalizeModal';
import { VideoIntroScreen } from './components/VideoIntroScreen';

export default function App() {
  const [invitationData, setInvitationData] = useState<InvitationData>(() => {
    const saved = localStorage.getItem('pearl_ivory_invitation_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.couplePhoto && parsed.couplePhoto.includes('wedding_couple_portrait')) {
          parsed.couplePhoto = DEFAULT_INVITATION.couplePhoto;
        }
        if (parsed.bridePhoto && parsed.bridePhoto.includes('wedding_bride_portrait')) {
          parsed.bridePhoto = DEFAULT_INVITATION.bridePhoto;
        }
        return { ...DEFAULT_INVITATION, ...parsed };
      } catch {
        return DEFAULT_INVITATION;
      }
    }
    return DEFAULT_INVITATION;
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isPersonalizeModalOpen, setIsPersonalizeModalOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [guests, setGuests] = useState<GuestRSVP[]>(() => {
    const saved = localStorage.getItem('pearl_ivory_guests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Save invitation data to localStorage
  useEffect(() => {
    localStorage.setItem('pearl_ivory_invitation_data', JSON.stringify(invitationData));
  }, [invitationData]);

  // Save guests to localStorage
  useEffect(() => {
    localStorage.setItem('pearl_ivory_guests', JSON.stringify(guests));
  }, [guests]);

  const handleUpdateInvitation = (newData: Partial<InvitationData>) => {
    setInvitationData((prev) => ({ ...prev, ...newData }));
  };

  const handleSaveGuest = (newGuest: GuestRSVP) => {
    setGuests((prev) => [newGuest, ...prev]);
  };

  const handleDeleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  const handleClearGuests = () => {
    if (window.confirm('Are you sure you want to clear all guest submissions?')) {
      setGuests([]);
    }
  };

  const handleOpenInvitation = () => {
    setIsEnvelopeOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handle browser autoplay policy block gracefully if needed
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] font-sans antialiased relative overflow-x-hidden pt-12 pb-20 selection:bg-[#E2D4C3]">
      {/* Global Background Audio Element */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}Sounds.mp3`}
        loop
      />

      {/* Background Soft Grain & Glow */}
      <div className="fixed inset-0 bg-radial from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] pointer-events-none -z-10" />

      {/* Header Bar Controls */}
      <HeaderBar
        musicEnabled={invitationData.musicEnabled}
        onToggleMusic={() =>
          setInvitationData((prev) => ({ ...prev, musicEnabled: !prev.musicEnabled }))
        }
        onReplayVideo={() => setIsEnvelopeOpen(false)}
      />

      {/* Video Intro Overlay Screen (Fade Out transition to scroll site) */}
      <AnimatePresence>
        {!isEnvelopeOpen && (
          <VideoIntroScreen
            data={invitationData}
            onOpenInvitation={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* Main Interactive Digital Save the Date Content */}
      <main className="w-full">
        {/* Envelope & Open Reveal Section */}
        <EnvelopeSection
          data={invitationData}
          isOpen={isEnvelopeOpen}
          onToggleOpen={() => setIsEnvelopeOpen(!isEnvelopeOpen)}
        />

        {/* Details, Countdown & Address Collection Section */}
        <DetailsSection
          data={invitationData}
          onOpenAddressModal={() => setIsAddressModalOpen(true)}
        />
      </main>

      {/* Address Collection / RSVP Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        coupleNames={invitationData.coupleNames}
        onSaveGuest={handleSaveGuest}
      />

      {/* Personalization / Customizer Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeModalOpen}
        onClose={() => setIsPersonalizeModalOpen(false)}
        data={invitationData}
        onUpdateData={handleUpdateInvitation}
        guests={guests}
        onClearGuests={handleClearGuests}
        onDeleteGuest={handleDeleteGuest}
      />
    </div>
  );
}
