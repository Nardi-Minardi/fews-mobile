import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import apiConfig from '../config/apiConfig';
import { dasAtom } from '../atoms/dasAtom';

export const useDas = () => {
  const setDas = useSetAtom(dasAtom)

  return useQuery({
    queryKey: ['dataDas'],
    queryFn: async () => {
      const response = await apiConfig.get('/dashboard/das');
      const data = response.data;
      if(data.status_code !== 200){
        throw new Error('Failed to fetch DAS data');
      }
      setDas(response.data.data);
      return response.data.data;
    },
  });
};
