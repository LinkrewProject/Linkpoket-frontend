import { fetchFavorite } from '@/apis/favorite-apis/fetchFavorite';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useFetchFavorite() {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['favorite'],
    queryFn: fetchFavorite,
    select: (response) => response.data,
  });

  return { favorite: data, ...rest };
}
