import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import apiConfig from '../config/apiConfig';
import { masterInstansiAtom, masterInstansiParamsAtom, Instansi } from '../atoms/masterAtom';

export const useMasterInstansi = () => {
  const [params] = useAtom(masterInstansiParamsAtom);
  const [_, setMasterInstansi] = useAtom(masterInstansiAtom);

  const query = useInfiniteQuery<{ 
    data: Instansi[]; 
    nextOffset?: number 
  }>({
    queryKey: ['dataMasterInstansi', params.search], // key include search
    initialPageParam: 0,
    queryFn: async ({ pageParam }): Promise<{ data: Instansi[]; nextOffset?: number }> => {
      const offset = typeof pageParam === 'number' ? pageParam : 0;
      const response = await apiConfig.get('/data-master/instansi', {
        params: {
          offset,
          limit: params.limit,
          search: params.search,
        },
      });

      if (response.data.status_code !== 200) {
        throw new Error('Failed to fetch Instansi data');
      }

      return {
        data: response.data.data as Instansi[],
        nextOffset: response.data.data.length === params.limit ? offset + params.limit : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });

  useEffect(() => {
    if (query.data) {
      const allInstansi = query.data.pages.flatMap((page:any) => page.data);
      setMasterInstansi(allInstansi);
    }
  }, [query.data, setMasterInstansi]);

  return query;
};
