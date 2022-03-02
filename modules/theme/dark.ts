import { atomWithStorage } from 'jotai/utils';

const darkMode = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
export const darkModeAtom = atomWithStorage('darkMode', darkMode);
