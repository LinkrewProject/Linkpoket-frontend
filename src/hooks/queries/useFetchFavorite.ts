import { fetchFavorite } from '@/apis/favorite-apis/fetchFavorite';
import { useQuery } from '@tanstack/react-query';

export default function useFetchFavorite() {
  const { data, ...rest } = useQuery({
    queryKey: ['favorite'],
    queryFn: fetchFavorite,
    select: (response) => response.data,
    placeholderData: (prev) => prev,
  });

  return { favorite: data, ...rest };
}
