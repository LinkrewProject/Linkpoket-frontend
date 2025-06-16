import { axiosInstance } from '../axiosInstance';

interface PatchProfileColorResponse {
  email: string;
  colorCode: string;
}

export const patchProfileColor = async (
  colorCode: string
): Promise<PatchProfileColorResponse> => {
  const response = await axiosInstance.patch<{
    status: number;
    message: string;
    data: PatchProfileColorResponse;
  }>('/api/member/color-code', {
    colorCode,
  });

  return response.data.data;
};
