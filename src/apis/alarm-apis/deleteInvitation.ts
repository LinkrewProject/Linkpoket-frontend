import { axiosInstance } from '../axiosInstance';

export const deleteInvitation = async (data: { dispatchRequestId: number }) => {
  const response = await axiosInstance.delete(
    '/api/dispatch/share-page-invitations',
    { data }
  );
  return response.data;
};
