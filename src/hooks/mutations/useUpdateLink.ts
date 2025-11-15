import { updateLink } from '@/apis/link-apis/updateLink';
import { UpdateLinkData, UpdateLinkResponse } from '@/types/links';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

export function useUpdateLink(
  options?: UseMutationOptions<UpdateLinkResponse, unknown, UpdateLinkData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');
  const isBookmarksPage = location.pathname === '/bookmarks';

  return useMutation({
    mutationFn: updateLink,

    onSuccess: (response, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['favorite'],
      });

      if (!isFolderPage && isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
        });
      }

      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
        });
      }

      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }

      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
        });
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
        });
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
        });
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }
      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
