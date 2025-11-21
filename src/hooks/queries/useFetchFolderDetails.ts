import fetchFolderDetails from '@/apis/folder-apis/fetchFolderDetails';
import { FolderDetailsProps } from '@/types/folders';
import { useQuery } from '@tanstack/react-query';

export default function useFetchFolderDetails(data: FolderDetailsProps) {
  return useQuery({
    queryKey: ['folderDetails', data.pageId, data.folderId],
    queryFn: () => fetchFolderDetails(data),
    enabled: !!data.folderId && !!data.pageId,
    placeholderData: (prev) => prev,
  });
}
