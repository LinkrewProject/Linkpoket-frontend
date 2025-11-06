import { axiosInstance } from '../axiosInstance';

export const deleteDirectoryRequest = async (data: {
  dispatchRequestId: number;
}) => {
  const response = await axiosInstance.delete(
    '/api/dispatch/folder-transmissions',
    { data }
  );
  return response.data;
};
