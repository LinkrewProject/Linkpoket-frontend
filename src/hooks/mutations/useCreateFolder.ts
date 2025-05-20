import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createFolder } from '@/apis/folder-apis/createFolder';
import { CreateFolderData } from '@/types/folders';

export function useCreateFolder(
  options?: UseMutationOptions<any, unknown, CreateFolderData>
) {
  return useMutation({
    mutationFn: createFolder,
    ...options,
  });
}
