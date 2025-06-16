import { patchProfileNickname } from '@/apis/profile-apis/patchProfileNickname';
import { ToastCustom } from '@/components/common-ui/ToastCustom';
import { useUserStore } from '@/stores/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfileNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchProfileNickname,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profileNickname'] });
      useUserStore.getState().setNickname(variables);
    },
    onError: () => {
      ToastCustom.error('닉네임 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
