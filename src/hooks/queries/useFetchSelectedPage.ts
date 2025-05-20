import { fetchSelectedPage } from '@/apis/page-apis/fetchSelectedPage';
import { useQuery } from '@tanstack/react-query';
import { SelectedPageData } from '@/types/pages';

type UseFetchSelectedPageProps = SelectedPageData & { enabled?: boolean };

export function useFetchSelectedPage({
  pageId,
  commandType,
  enabled = true,
}: UseFetchSelectedPageProps) {
  const { data, ...rest } = useQuery({
    queryKey: ['selectedPage', pageId, commandType],
    queryFn: () => fetchSelectedPage({ pageId, commandType }),
    enabled,
  });

  return {
    data,
    ...rest,
  };
}
