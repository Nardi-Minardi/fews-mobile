import {useEffect} from 'react';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useAtom, useSetAtom} from 'jotai';
import apiConfig from '../config/apiConfig';
import {
  deviceAtom,
  deviceParamsAtom,
  deviceTagAtom,
  Device,
} from '../atoms/deviceAtom';

export const useDevice = (opts?: { device_tag_id?: number }) => {
  const [params, setParams] = useAtom(deviceParamsAtom);
  const [_, setDevice] = useAtom(deviceAtom);

  const query = useInfiniteQuery<{data: Device[]; nextOffset?: number}>({
    queryKey: ['dataDevice', params.search, opts?.device_tag_id],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const offset = typeof pageParam === 'number' ? pageParam : 0;
      const p: Record<string, any> = {
        offset,
        limit: params.limit,
        search: params.search,
      };
      if (typeof opts?.device_tag_id === 'number') {
        // API expects value like "[1]"
        p.device_tag_id = `[${opts.device_tag_id}]`;
      }
      const response = await apiConfig.get('/dashboard/devices', { params: p });
      // console.log('Fetching devices with params:', p, 'Response:', response.data);

      if (response.data.status_code !== 200) {
        throw new Error('Failed to fetch Device data');
      }

      return {
        data: response.data.data as Device[],
        nextOffset:
          response.data.data.length === params.limit
            ? offset + params.limit
            : undefined,
      };
    },
    getNextPageParam: lastPage => lastPage.nextOffset,
  });

  // Update atom untuk UI
  useEffect(() => {
    if (!query.data) return;
    // Hanya update global deviceAtom untuk Home (tanpa filter tag)
    if (typeof opts?.device_tag_id === 'undefined') {
      const allDevices = query.data.pages.flatMap((page: any) => page.data);
      setDevice(allDevices);
    }
  }, [query.data, setDevice, opts?.device_tag_id]);

  // fungsi untuk search baru: reset data & refetch
  const searchDevice = (text: string) => {
    setParams({...params, search: text, offset: 0});
    query.refetch();
  };

  return {...query, searchDevice};
};

export const useDeviceTag = () => {
  const setDeviceTag = useSetAtom(deviceTagAtom);

  return useQuery({
    queryKey: ['dataDeviceTag'],
    queryFn: async () => {
      const response = await apiConfig.get('/dashboard/devices/tags');
      const data = response.data;
      if (data.status_code !== 200) {
        throw new Error('Failed to fetch Device Tag data');
      }
      setDeviceTag(response.data.data);
      return response.data.data;
    },
  });
};
