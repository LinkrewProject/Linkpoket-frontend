import { useQuery } from '@tanstack/react-query';
import { fetchPersonalPage } from '@/apis/page-apis/fetchPersonalPage';

export function useFetchPersonalPage(enabled: boolean = true) {
  return useQuery({
    queryKey: ['personalPage'],
    queryFn: () => fetchPersonalPage(),
    enabled: enabled, // enabled가 true일 때만 쿼리 실행
    placeholderData: (prev) => prev,
  });
}
