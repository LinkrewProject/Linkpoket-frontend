import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import updateFolder from '@/apis/folder-apis/updateFolder';
import { UpdateFolderData } from '@/types/folders';
import { useLocation } from 'react-router-dom';

export default function useUpdateFolder(
  pageId: string,
  options?: UseMutationOptions<any, unknown, UpdateFolderData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');
  const isBookmarksPage = location.pathname === '/bookmarks';

  return useMutation({
    ...options,
    mutationFn: updateFolder,
    onSuccess: (response, variables, context) => {
      // 폴더 상세, 공유페이지, 개인페이지 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['folderList', pageId],
        refetchType: 'active',
      });

      queryClient.invalidateQueries({
        queryKey: ['favorite'],
        refetchType: 'active',
      });

      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
        });
      }

      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
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
          refetchType: 'active',
        });
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
        });
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
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
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}
