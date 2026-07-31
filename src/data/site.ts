import { Landmark, RadioTower, Trophy, UserRound, UsersRound } from 'lucide-react';

export const HLS_SOURCE = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
export const REGISTER_URL = 'https://makemypass.com/event/unfold-2026';
export const EMAIL_ADDRESS = 'srieeejtchapterkerala@gmail.com';

export const ticketCategories = [
  { Icon: Trophy, name: 'IEEE Member Pass', early: '₹399', normal: '₹499' },
  { Icon: UserRound, name: 'Non-IEEE / General Pass', early: '₹499', normal: '₹599' },
  { Icon: UsersRound, name: 'Team Pass (2–5 Members)', early: '₹390 / head', normal: '₹470 / head' },
];

export const organisers = [
  { Icon: RadioTower, name: 'IEEE IA/IE/PELS', detail: 'Joint Chapter Kerala', tag: 'Lead organiser' },
  { Icon: Landmark, name: 'CCE IEEE SB', detail: 'Student Branch', tag: 'Campus partner' },
];
