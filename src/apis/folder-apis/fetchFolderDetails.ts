import { axiosInstance } from '../axiosInstance';
import { FetchFolderDetailsProps } from '@/types/folders';

export default async function fetchFolderDetails(
  data: FetchFolderDetailsProps
) {
  try {
    const response = await axiosInstance.get('/api/folders/details', {
      params: {
        pageId: data.pageId,
        commandType: 'VIEW',
        folderId: data.folderId,
        sortType: 'BASIC',
      },
    });
    return response.data;
  } catch (error) {
    console.error('폴더 상세 정보 조회 실패:', error);
    throw error;
  }
}
