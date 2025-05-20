import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createSharedPage } from '@/apis/page-apis/createSharedPage';
import { CreateSharedPageData } from '@/types/pages';

export function useCreateSharedPage(
  options?: UseMutationOptions<any, unknown, CreateSharedPageData>
) {
  return useMutation({
    mutationFn: createSharedPage,

    ...options,
  });
}
