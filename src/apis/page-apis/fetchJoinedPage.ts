import { axiosInstance } from '../axiosInstance';
import { FetchJoinedPageResponseData } from '@/types/pages';

export async function fetchJoinedPage(): Promise<FetchJoinedPageResponseData> {
  try {
    const response = await axiosInstance.get<FetchJoinedPageResponseData>(
      '/api/personal-pages/overview'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching joined page:', error);
    throw error;
  }
}
