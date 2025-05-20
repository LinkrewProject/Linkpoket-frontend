import { fetchSelectedPage } from '@/apis/page-apis/fetchSelectedPage';
import { useQuery } from '@tanstack/react-query';
import { SelectedPageData } from '@/types/pages';

export function useFetchSelectedPage({
  pageId,
  commandType,
}: SelectedPageData) {
  const { data, ...rest } = useQuery({
    queryKey: ['selectedPage', pageId, commandType],
    queryFn: () => fetchSelectedPage({ pageId, commandType }),
  });

  return {
    data,
    ...rest,
  };
}
