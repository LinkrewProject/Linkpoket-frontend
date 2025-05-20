import { axiosInstance } from '../axiosInstance';
import { SelectedPageData } from '@/types/pages';

export async function fetchSelectedPage(data: SelectedPageData) {
  try {
    const response = await axiosInstance.get('/api/page/details', {
      params: {
        pageId: data.pageId,
        commandType: data.commandType,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching selected page:', error);
    throw error;
  }
}
