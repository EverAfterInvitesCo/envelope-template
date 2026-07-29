import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InvitationData, GuestRSVP } from '../types';
import { X, Download, Trash2, Edit3, Users, Settings2, Sparkles, Image } from 'lucide-react';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  onUpdateData: (newData: Partial<InvitationData>) => void;
  guests: GuestRSVP[];
  onClearGuests: () => void;
  onDeleteGuest: (id: string) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  guests,
  onClearGuests,
  onDeleteGuest,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'guests'>('editor');
  const [formData, setFormData] = useState<InvitationData>(data);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateData(formData);
    onClose();
  };

  const exportCSV = () => {
    if (guests.length === 0) return;

    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'Address',
      'City',
      'Postal Code',
      'Country',
      'Attending',
      'Guests Count',
      'Dietary Notes',
      'Message',
      'Submitted At',
    ];

    const rows = guests.map((g) => [
      `"${g.fullName.replace(/"/g, '""')}"`,
      `"${g.email.replace(/"/g, '""')}"`,
      `"${g.phone.replace(/"/g, '""')}"`,
      `"${g.streetAddress.replace(/"/g, '""')}"`,
      `"${g.city.replace(/"/g, '""')}"`,
      `"${g.postalCode.replace(/"/g, '""')}"`,
      `"${g.country.replace(/"/g, '""')}"`,
      `"${g.attending}"`,
      g.guestCount,
      `"${(g.dietaryRestrictions || '').replace(/"/g, '""')}"`,
      `"${(g.noteToCouple || '').replace(/"/g, '""')}"`,
      `"${g.submittedAt}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${formData.coupleNames.replace(/\s+/g, '_')}_Address_Book.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#FAF6EE] border border-[#E8DFC2] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#8C7B6B] hover:text-[#3D352E] transition-colors rounded-full hover:bg-[#EFE5D5] cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-1 mb-6">
            <span className="text-xs font-cormorant tracking-[0.25em] text-[#8C7A68] uppercase font-semibold">
              INVITATION CONTROL PANEL
            </span>
            <h3 className="font-script text-3xl sm:text-4xl text-[#3D352E]">
              Personalize Save the Date
            </h3>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-2 border-b border-[#E3D7C5] pb-3 mb-6">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-cormorant text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-[#B39B7C] text-[#FAF6EE] shadow-xs'
                  : 'bg-[#F2EADB] text-[#5A4E42] hover:bg-[#E8DDD0]'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Event Details</span>
            </button>

            <button
              onClick={() => setActiveTab('guests')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-cormorant text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer relative ${
                activeTab === 'guests'
                  ? 'bg-[#B39B7C] text-[#FAF6EE] shadow-xs'
                  : 'bg-[#F2EADB] text-[#5A4E42] hover:bg-[#E8DDD0]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Address Book ({guests.length})</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto pr-1">
            {activeTab === 'editor' ? (
              <form onSubmit={handleSave} className="space-y-4 font-cormorant">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Couple Names
                    </label>
                    <input
                      type="text"
                      value={formData.coupleNames}
                      onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Header Title
                    </label>
                    <input
                      type="text"
                      value={formData.eventTitle}
                      onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Location / Region
                    </label>
                    <input
                      type="text"
                      value={formData.locationName}
                      onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Display Date (Badge)
                    </label>
                    <input
                      type="text"
                      value={formData.displayDate}
                      onChange={(e) => setFormData({ ...formData, displayDate: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Formatted Date Text
                    </label>
                    <input
                      type="text"
                      value={formData.dateFormatted}
                      onChange={(e) => setFormData({ ...formData, dateFormatted: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Formatted Time Text
                    </label>
                    <input
                      type="text"
                      value={formData.timeFormatted}
                      onChange={(e) => setFormData({ ...formData, timeFormatted: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                    Target Date for Countdown Timer
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.weddingDate.slice(0, 16)}
                    onChange={(e) => setFormData({ ...formData, weddingDate: new Date(e.target.value).toISOString() })}
                    className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                    Venue Location & Address
                  </label>
                  <input
                    type="text"
                    value={formData.venueDetails}
                    onChange={(e) => setFormData({ ...formData, venueDetails: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E]"
                  />
                </div>

                <div className="pt-2 border-t border-[#E3D7C5]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#5A4E42] mb-2 flex items-center space-x-1">
                    <Image className="w-3.5 h-3.5 text-[#8C7A68]" />
                    <span>Custom Photo URLs</span>
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Envelope Intro Image URL (e.g. /envelope.png)"
                      value={formData.envelopeImage}
                      onChange={(e) => setFormData({ ...formData, envelopeImage: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-1.5 text-xs text-[#3D352E]"
                    />
                    <input
                      type="text"
                      placeholder="Couple Portrait Photo URL"
                      value={formData.couplePhoto}
                      onChange={(e) => setFormData({ ...formData, couplePhoto: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-1.5 text-xs text-[#3D352E]"
                    />
                    <input
                      type="text"
                      placeholder="Bride Photo URL"
                      value={formData.bridePhoto}
                      onChange={(e) => setFormData({ ...formData, bridePhoto: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-1.5 text-xs text-[#3D352E]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#B39B7C] hover:bg-[#A38B6C] text-[#FAF6EE] px-6 py-2.5 rounded-full font-semibold uppercase tracking-[0.2em] text-xs transition-colors shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              /* Guests Address List */
              <div className="space-y-4 font-cormorant">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#7A6C5D] font-semibold">
                    {guests.length} Registered Guest Addresses
                  </span>
                  {guests.length > 0 && (
                    <div className="flex space-x-2">
                      <button
                        onClick={exportCSV}
                        className="flex items-center space-x-1 bg-[#B39B7C] hover:bg-[#A38B6C] text-[#FAF6EE] px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Export CSV</span>
                      </button>
                      <button
                        onClick={onClearGuests}
                        className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Clear all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {guests.length === 0 ? (
                  <div className="text-center py-12 text-[#8C7B6B] space-y-2">
                    <Users className="w-10 h-10 mx-auto opacity-40" />
                    <p className="text-sm">No guest addresses submitted yet.</p>
                    <p className="text-xs opacity-75">
                      When guests click "KINDLY SHARE YOUR ADDRESS HERE", their mailing info will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {guests.map((g) => (
                      <div
                        key={g.id}
                        className="bg-[#FFFDF9] border border-[#E2D6C4] rounded-2xl p-4 shadow-2xs space-y-2 relative"
                      >
                        <button
                          onClick={() => onDeleteGuest(g.id)}
                          className="absolute top-3 right-3 text-[#A8937D] hover:text-red-700 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-[#3D352E] text-sm">{g.fullName}</span>
                          <span className="text-[10px] bg-[#F2EADB] px-2 py-0.5 rounded-full uppercase text-[#7A6C5D]">
                            {g.attending === 'yes' ? 'Attending' : g.attending} ({g.guestCount} guest)
                          </span>
                        </div>

                        <div className="text-xs text-[#5A4E42] space-y-0.5">
                          <p>📍 {g.streetAddress}, {g.city} {g.postalCode}, {g.country}</p>
                          {g.email && <p>✉️ {g.email} | 📞 {g.phone}</p>}
                          {g.noteToCouple && <p className="italic text-[#7A6C5D] pt-1">"{g.noteToCouple}"</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
