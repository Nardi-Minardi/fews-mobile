import { useQuery } from '@tanstack/react-query';
import apiConfig from '../config/apiConfig';

export interface SensorItem {
  id: string;
  sensor_uid: string;
  device_uid: string;
  name: string;
  unit: string | null;
  value: number | null;
  last_sending_data: string | null;
  device_tag_id: number[];
  sensor_type?: string | null;
  criteria_status?: number | null;
  criteria_label?: string | null;
  criteria_color?: string | null;
}

export interface SensorsResponse {
  status_code: number;
  message: string;
  offset: number;
  total_data: number;
  data: Array<any>; // criteria masters, not used directly here
  sensors: SensorItem[];
}

export const useSensors = (
  deviceUid?: string | null,
  opts?: { offset?: number; limit?: number }
) => {
  const offset = typeof opts?.offset === 'number' ? opts.offset : 0;
  const limit = typeof opts?.limit === 'number' ? opts.limit : 50;
  return useQuery<SensorsResponse>({
    queryKey: ['sensors', deviceUid, offset, limit],
    enabled: !!deviceUid,
    queryFn: async () => {
      const resp = await apiConfig.get(`/dashboard/${deviceUid}/sensors`, {
        params: { offset, limit },
      });
      if (resp.data?.status_code !== 200) {
        throw new Error('Failed to fetch sensors');
      }
      return resp.data as SensorsResponse;
    },
    staleTime: 30_000,
  });
};
