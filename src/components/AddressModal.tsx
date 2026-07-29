import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GuestRSVP } from '../types';
import { X, CheckCircle2, Heart } from 'lucide-react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleNames: string;
  onSaveGuest: (guest: GuestRSVP) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  coupleNames,
  onSaveGuest,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: 'France',
    attending: 'yes' as 'yes' | 'no' | 'maybe',
    guestCount: 1,
    dietaryRestrictions: '',
    noteToCouple: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.streetAddress) return;

    const newGuest: GuestRSVP = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    onSaveGuest(newGuest);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      postalCode: '',
      country: 'France',
      attending: 'yes',
      guestCount: 1,
      dietaryRestrictions: '',
      noteToCouple: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-[#FAF6EE] border border-[#E8DFC2] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#8C7B6B] hover:text-[#3D352E] transition-colors rounded-full hover:bg-[#EFE5D5] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-1">
                <span className="text-xs font-cormorant tracking-[0.25em] text-[#8C7A68] uppercase font-semibold">
                  RSVP & MAILING DETAILS
                </span>
                <h3 className="font-script text-3xl sm:text-4xl text-[#3D352E]">
                  RSVP Please
                </h3>
                <p className="font-cormorant text-xs text-[#7A6C5D]">
                  Please confirm your attendance and provide your address so {coupleNames} can send your formal invitation.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 font-cormorant">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance & Partner"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-4 py-2.5 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-4 py-2 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-4 py-2 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="124 Rue de la Paix, Apt 3B"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-4 py-2.5 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Paris"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C]"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="75002"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C]"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="France"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Expected Attendance
                    </label>
                    <select
                      value={formData.attending}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attending: e.target.value as 'yes' | 'no' | 'maybe',
                        })
                      }
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C]"
                    >
                      <option value="yes">Will Attend 🤍</option>
                      <option value="maybe">Uncertain / Pending</option>
                      <option value="no">Regretfully Decline</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                      className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A4E42] mb-1 font-semibold">
                    Note for the Couple
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Leave a sweet message or dietary request..."
                    value={formData.noteToCouple}
                    onChange={(e) => setFormData({ ...formData, noteToCouple: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DED4C3] rounded-xl px-3 py-2 text-sm text-[#3D352E] focus:outline-none focus:border-[#B39B7C] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#B39B7C] hover:bg-[#A38B6C] text-[#FAF6EE] py-3 rounded-full font-semibold uppercase tracking-[0.2em] text-xs transition-colors shadow-md cursor-pointer"
                  >
                    Submit Address Details
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation View */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#F2EADB] rounded-full flex items-center justify-center mx-auto text-[#8C7A68]">
                <CheckCircle2 className="w-8 h-8 text-[#A38B6C]" />
              </div>

              <h3 className="font-script text-4xl text-[#3D352E]">
                Thank You!
              </h3>

              <p className="font-cormorant text-sm text-[#5A4E42] max-w-xs mx-auto leading-relaxed">
                Your address details have been securely recorded. {coupleNames} look forward to celebrating with you!
              </p>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-[#B39B7C] hover:bg-[#A38B6C] text-[#FAF6EE] px-6 py-2.5 rounded-full font-cormorant text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
