import { atom } from 'jotai';

export interface Instansi {
  id: number;
  name: string;
}

// Atom untuk menyimpan semua data instansi yang sudah di-fetch
export const masterInstansiAtom = atom<Instansi[]>([]);

// Atom untuk menyimpan parameter pagination + search
export const masterInstansiParamsAtom = atom({
  search: '',
  offset: 0,
  limit: 50,
});
