import { axiosInstance } from '../axiosInstance';
import { PageData, PageParamsData } from '@/types/pages';

export async function fetchSharedPage(data: PageParamsData): Promise<PageData> {
  try {
    const response = await axiosInstance.get<PageData>(
      '/api/share-pages/main',
      {
        params: {
          pageId: data.pageId,
          commandType: 'VIEW',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching shared page:', error);
    throw error;
  }
}
