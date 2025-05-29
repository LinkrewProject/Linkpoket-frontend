import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import updateFolder from '@/apis/folder-apis/updateFolder';
import { UpdateFolderData } from '@/types/folders';

export default function useUpdateFolder(
  pageId: number,
  options?: UseMutationOptions<any, unknown, UpdateFolderData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateFolder,
    onSuccess: async (response, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['selectedPage', pageId, 'VIEW'],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
          refetchType: 'active',
        }),
      ]);

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
