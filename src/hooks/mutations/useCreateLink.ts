import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createLink } from '@/apis/link-apis/createLink';
import { CreateLinkData, CreateLinkResponse } from '@/types/links';
import { useLocation } from 'react-router-dom';

export function useCreateLink(
  options?: UseMutationOptions<CreateLinkResponse, unknown, CreateLinkData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    ...options,
    mutationFn: createLink,
    onSuccess: (response, variables, context) => {
      // 현재 페이지의 모든 관련 쿼리 무효화

      // 일반 페이지 쿼리 무효화
      if (!isFolderPage && isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
        });
      }

      // 폴더 상세 페이지 쿼리 무효화
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
        });
      }

      // 메인 페이지에서만 personalPage 캐시 무효화
      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }

      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('폴더 생성 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}
