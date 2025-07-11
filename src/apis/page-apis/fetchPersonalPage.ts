import { axiosInstance } from '../axiosInstance';

export async function fetchPersonalPage() {
  try {
    const response = await axiosInstance.get('/api/personal-pages/mains');
    return response.data;
  } catch (error) {
    console.error('Error fetching personal page:', error);
    throw error;
  }
}
