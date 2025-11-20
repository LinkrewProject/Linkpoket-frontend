import { axiosInstance } from '../axiosInstance';
import { PageParamsData } from '@/types/pages';
import { SharedPageMemberList } from '@/types/members';

export async function fetchSharedPageMember(
  data: PageParamsData
): Promise<SharedPageMemberList> {
  try {
    const response = await axiosInstance.get<SharedPageMemberList>(
      '/api/share-pages/members',
      {
        params: {
          pageId: data.pageId,
          commandType: 'VIEW',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching shared page member:', error);
    throw error;
  }
}
