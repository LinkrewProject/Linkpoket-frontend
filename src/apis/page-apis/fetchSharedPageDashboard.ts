import { PageParamsData } from '@/types/pages';
import { SharedPageDashboardResponse } from '@/types/members';
import { axiosInstance } from '../axiosInstance';

export async function fetchSharedPageDashboard(
  data: PageParamsData
): Promise<SharedPageDashboardResponse> {
  try {
    const response = await axiosInstance.get<SharedPageDashboardResponse>(
      '/api/share-pages/dashboard',
      {
        params: {
          pageId: data.pageId,
          commandType: 'VIEW',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching shared page dashboard:', error);
    throw error;
  }
}
