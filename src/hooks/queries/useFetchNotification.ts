import { fetchNotifications } from '@/apis/alarm-apis/useFetchNotifications';
import { useQuery } from '@tanstack/react-query';

export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  });
};
