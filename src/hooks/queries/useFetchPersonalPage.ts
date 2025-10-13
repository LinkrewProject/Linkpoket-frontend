import { useQuery } from '@tanstack/react-query';
import { fetchPersonalPage } from '@/apis/page-apis/fetchPersonalPage';

export function useFetchPersonalPage(pageImageUrl: string) {
  return useQuery({
    queryKey: ['personalPage'],
    queryFn: () => fetchPersonalPage({ pageImageUrl }),
    placeholderData: (prev) => prev,
    structuralSharing: true,
  });
}
