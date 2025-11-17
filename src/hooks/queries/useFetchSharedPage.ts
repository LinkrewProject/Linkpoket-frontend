import { fetchSharedPage } from '@/apis/page-apis/fetchSharedPage';
import { useQuery } from '@tanstack/react-query';

export function useFetchSharedPage(pageId: string, enabled: boolean = true) {
  const { data, ...rest } = useQuery({
    queryKey: ['sharedPage', pageId],
    queryFn: () => fetchSharedPage({ pageId }),
    enabled: enabled && !!pageId, // enabled가 true이고 pageId가 있을 때만 쿼리 실행
  });

  return {
    data,
    ...rest,
  };
}
