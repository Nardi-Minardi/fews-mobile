import { atom } from 'jotai';


export interface Device {
  id: number;
  device_uid: string;
  device_tag_id: number[];
  das_id: number;
  sungai_id: number | null;
  owner: string;
  device_name: string;
  hidrologi_type: string;
  device_status: string;
  last_sending_data: string | null;
  last_battery: number | null;
  lasst_signal: string | null;
  lat: number | null;
  long: number | null;
  cctv_url: string | null;
  value : number | null;
  instansi_id: number | null;
  created_at: string;
  updated_at: string;
  das_name: string;
  provinsi_code : string | null;
  kab_kota_code : string | null;
  kecamatan_code : string | null;
  kel_desa_code : string | null;
}

export interface DeviceTag {
  id: number;
  name: string;
}

export const deviceAtom = atom<Device[]>([]);

export const deviceTagAtom = atom<DeviceTag[]>([]);

export const deviceParamsAtom = atom({
  device_tag_id: undefined as number | undefined,
  search: '',
  offset: 0,
  limit: 50,
});
