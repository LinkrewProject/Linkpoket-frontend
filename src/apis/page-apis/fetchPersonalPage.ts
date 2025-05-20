import { axiosInstance } from '../axiosInstance';

export async function fetchPersonalPage() {
  try {
    const response = await axiosInstance.get('/api/page/login');
    return response.data;
  } catch (error) {
    console.error('Error fetching personal page:', error);
    throw error;
  }
}
