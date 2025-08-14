import { previewLink } from '@/apis/link-apis/previewLink';
import { PreviewLinkData, PreviewLinkResponse } from '@/types/links';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function usePreviewLink(
  options?: UseMutationOptions<PreviewLinkResponse, unknown, PreviewLinkData>
) {
  return useMutation({
    mutationFn: previewLink,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },
  });
}
