import { axiosInstance } from '../axiosInstance';
import { PageData } from '@/types/pages';

export async function fetchPersonalPage(): Promise<PageData> {
  try {
    const response = await axiosInstance.get<PageData>(
      '/api/personal-pages/main'
    );
    return response.data;
  } catch (error) {
    console.error('개인 페이지 조회 실패:', error);
    throw error;
  }
}
