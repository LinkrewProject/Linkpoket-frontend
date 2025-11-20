import { axiosInstance } from '../axiosInstance';
import { PageData } from '@/types/pages';

export async function fetchPersonalPage(): Promise<PageData> {
  try {
    const response = await axiosInstance.get<PageData>(
      '/api/personal-pages/main'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching personal page:', error);
    throw error;
  }
}
