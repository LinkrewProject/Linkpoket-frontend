import { axiosInstance } from '../axiosInstance';

export default async function fetchUserInfo() {
  try {
    const response = await axiosInstance.get('/api/member/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
}
