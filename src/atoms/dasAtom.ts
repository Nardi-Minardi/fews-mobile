import { atom } from 'jotai';


export interface Das {
  color?: string;
  created_at: string;
  das_uid: string;
  id: number;
  kab_kota: string | null;
  kab_kota_name : string | null;
  kecamatan_kode : string | null;
  kecamatan_name : string | null;
  kel_desa_kode : string | null;
  kel_desa_name : string | null;
  kode_das: string;
  luas_das: number | null;
  name: string;
  provinsi_code : string | null;
  provinsi_name : string | null;
  sungai_id : number | null;
  updated_at: string;
  ws_id : string | null;
  geom: {
    type: string;
    coordinates: any[];
  };
}

export const dasAtom = atom<Das[]>([]);
