export interface InvitationData {
  coupleNames: string;
  brideName: string;
  groomName: string;
  eventTitle: string;
  weddingDate: string; // ISO date string e.g. "2027-06-21T12:30:00"
  displayDate: string; // e.g. "21.06.2027"
  dateFormatted: string; // e.g. "ON SATURDAY, 21 JUNE 2027"
  timeFormatted: string; // e.g. "TWELVE THIRTY IN THE AFTERNOON"
  locationName: string; // e.g. "Occitanie, France"
  venueDetails: string; // e.g. "Château de Cassan, Route de Roujan"
  couplePhoto: string;
  bridePhoto: string;
  silkBgPhoto: string;
  envelopeImage: string;
  messageText: string;
  musicEnabled: boolean;
}

export interface GuestRSVP {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  attending: 'yes' | 'no' | 'maybe';
  guestCount: number;
  dietaryRestrictions?: string;
  noteToCouple?: string;
  submittedAt: string;
}
