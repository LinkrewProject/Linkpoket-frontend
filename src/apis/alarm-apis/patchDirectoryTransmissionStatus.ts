import { axiosInstance } from '../axiosInstance';

export const patchDirectoryTransmissionStatus = async (data: {
  dispatchRequestId: number;
  requestStatus: 'ACCEPTED' | 'REJECTED';
  notificationType: 'TRANSMIT_DIRECTORY';
}) => {
  const response = await axiosInstance.patch(
    '/api/dispatch/folder-transmissions/status',
    data
  );
  return response.data;
};
