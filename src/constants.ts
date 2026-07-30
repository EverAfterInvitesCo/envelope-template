import { InvitationData } from './types';

import silkBgAsset from './assets/images/ivory_silk_bg_1785327681883.jpg';
import envelopeIntroAsset from './assets/images/envelope_intro_1785332362014.jpg';

const base = import.meta.env.BASE_URL;

export const DEFAULT_INVITATION: InvitationData = {
  coupleNames: 'Clara & Elliot',
  brideName: 'Clara',
  groomName: 'Elliot',
  eventTitle: 'A LOVE LETTER FROM',
  weddingDate: '2027-06-21T12:30:00',
  displayDate: '21.06.2027',
  dateFormatted: 'ON SATURDAY, 21 JUNE 2027',
  timeFormatted: 'TWELVE THIRTY IN THE AFTERNOON',
  locationName: 'Occitanie, France',
  venueDetails: 'Château de Cassan, 34320 Roujan, Occitanie, France',
  couplePhoto: `${base}test-5.jpg`,
  bridePhoto: `${base}test-1.jpg`,
  silkBgPhoto: silkBgAsset,
  envelopeImage: envelopeIntroAsset,
  messageText: 'FORMAL INVITATION TO FOLLOW',
  musicEnabled: true,
};
