import {
  PatchSharedPageInvitationData,
  PatchSharedPageInvitationResponseData,
} from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export default async function patchSharedPageInvitation(
  data: PatchSharedPageInvitationData
): Promise<PatchSharedPageInvitationResponseData> {
  try {
    const response =
      await axiosInstance.patch<PatchSharedPageInvitationResponseData>(
        '/api/dispatch/share-page-invitations/status',
        data
      );
    return response.data;
  } catch (error) {
    console.error('Error patching shared page invitation:', error);
    throw error;
  }
}
