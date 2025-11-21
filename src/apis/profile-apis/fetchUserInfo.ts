import { axiosInstance } from '../axiosInstance';

export default async function fetchUserInfo(): Promise<any> {
  try {
    const response = await axiosInstance.get('/api/member/me');
    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
}
