import { TransferFolderData } from '@/types/folders';
import { axiosInstance } from '../axiosInstance';
import axios from 'axios';

export async function transferFolder(data: TransferFolderData) {
  try {
    const res = await axiosInstance.post(
      '/api/dispatch/directory-transmissions',
      data
    );
    console.log('보내는 데이터', data);
    return res.data;
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      console.log('[TX][ERR] status:', e.response?.status);
      console.log('[TX][ERR] body:', e.response?.data); // ← 여기 detail/fieldErrors 나옴
      console.log('[TX][ERR] sent:', e.config?.data); // ← 실제로 보낸 JSON
    }
    throw e;
  }
}
