import { deleteLink } from '@/apis/link-apis/deleteLink';
import { DeleteLinkData, DeleteLinkResponse } from '@/types/links';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

export function useDeleteLink(
  options?: UseMutationOptions<DeleteLinkResponse, unknown, DeleteLinkData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    mutationFn: deleteLink,
    onMutate: async (variables) => {
      const context: Record<string, any> = {};

      // 관련 쿼리 취소
      if (isSharedPage)
        await queryClient.cancelQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
        });
      if (isFolderPage)
        await queryClient.cancelQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
        });
      if (isMainPage)
        await queryClient.cancelQueries({ queryKey: ['personalPage'] });

      // 기존 데이터 저장
      if (isSharedPage)
        context.sharedPage = queryClient.getQueryData([
          'sharedPage',
          variables.baseRequest.pageId,
        ]);
      if (isFolderPage)
        context.folderDetails = queryClient.getQueryData([
          'folderDetails',
          variables.baseRequest.pageId,
        ]);
      if (isMainPage)
        context.personalPage = queryClient.getQueryData(['personalPage']);

      //임시 UI 업데이트
      if (isFolderPage) {
        queryClient.setQueryData(
          ['folderDetails', variables.baseRequest.pageId],
          (old: any) => {
            if (!old) return old;
            return {
              ...old,
              data: {
                ...old.data,
                siteDetailResponses: old.data.siteDetailResponses.filter(
                  (f: any) => f.linkId !== variables.linkId
                ),
              },
            };
          }
        );
      }
      if (isSharedPage) {
        queryClient.setQueryData(
          ['sharedPage', variables.baseRequest.pageId],
          (old: any) => {
            if (!old) return old;
            return {
              ...old,
              data: {
                ...old.data,
                siteDetailResponses: old.data.siteDetailResponses.filter(
                  (f: any) => f.linkId !== variables.linkId
                ),
              },
            };
          }
        );
      }
      if (isMainPage) {
        queryClient.setQueryData(['personalPage'], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              siteDetailResponses: old.data.siteDetailResponses.filter(
                (f: any) => f.linkId !== variables.linkId
              ),
            },
          };
        });
      }
      return context;
    },

    onError: (error, variables, context) => {
      if (context?.sharedPage)
        queryClient.setQueryData(
          ['sharedPage', variables.baseRequest.pageId],
          context.sharedPage
        );
      if (context?.folderDetails)
        queryClient.setQueryData(
          ['folderDetails', variables.baseRequest.pageId],
          context.folderDetails
        );
      if (context?.personalPage)
        queryClient.setQueryData(['personalPage'], context.personalPage);
      console.error('폴더 생성 에러:', error);
    },
    onSettled: (data, error, variables, context) => {
      // 일반 페이지 쿼리 무효화
      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
          refetchType: 'active',
        });
      }
      // 폴더 상세 페이지 쿼리 무효화 (모든 폴더 ID에 대해)
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
          refetchType: 'active',
        });
      }
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderList', variables.baseRequest.pageId],
          refetchType: 'active',
        });
      }
      // 메인 페이지에서만 personalPage 캐시 무효화
      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
          refetchType: 'active',
        });
      }
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
