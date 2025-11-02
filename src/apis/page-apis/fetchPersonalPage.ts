import { axiosInstance } from '../axiosInstance';

type FetchPersonalPageParams = {
  pageImageUrl: string;
};

export async function fetchPersonalPage(params: FetchPersonalPageParams) {
  try {
    const response = await axiosInstance.get('/api/personal-pages/main', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching personal page:', error);
    throw error;
  }
}
