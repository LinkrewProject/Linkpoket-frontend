import { useRef } from 'react';
import { usePageStore } from '@/stores/pageStore';
import useUpdateFolder from '@/hooks/mutations/useUpdateFolder';
import { useUpdateLink } from '@/hooks/mutations/useUpdateLink';
import { useDebounce } from '@/hooks/useDebounce';
import { UpdateLinkData } from '@/types/links';

type TitleUpdate = {
  title: string;
};

export function useUpdateTitle(
  id?: string,
  initialTitle: string = '',
  type?: string,
  link?: string
) {
  const lastUpdateRef = useRef({ title: initialTitle });
  const { pageId } = usePageStore();
  const { mutate: updateFolder } = useUpdateFolder(pageId);
  const { mutate: updateLink } = useUpdateLink();

  const updateFolderImmediately = (title: string) => {
    if (!id) return;

    const updateData = {
      baseRequest: { pageId: pageId as string, commandType: 'EDIT' },
      folderId: id,
      folderName: title,
    };

    updateFolder(updateData, {
      onSuccess: () => {
        lastUpdateRef.current = { title };
      },
      onError: (error) => {
        console.error('폴더 업데이트 실패:', error);
      },
    });
  };

  const handleDebouncedUpdate = (update: TitleUpdate) => {
    lastUpdateRef.current = update;
    if (type !== null) {
      updateFolderImmediately(update.title);
    }
  };

  const updateLinkImmediately = (title: string) => {
    if (!id) return;

    const updateData: UpdateLinkData = {
      baseRequest: {
        pageId,
        commandType: 'EDIT',
      },
      linkUrl: link ?? '',
      linkId: id,
      linkName: title,
    };

    updateLink(updateData, {
      onSuccess: () => {
        lastUpdateRef.current = { title };
      },
      onError: (error) => {
        console.error('링크 업데이트 실패:', error);
      },
    });
  };

  const handleDebouncedUpdateLink = (update: TitleUpdate) => {
    lastUpdateRef.current = update;
    if (type !== null) {
      updateLinkImmediately(update.title);
    }
  };
  const debouncedUpdate = useDebounce<TitleUpdate>(handleDebouncedUpdate, 500);
  const debouncedUpdateLink = useDebounce<TitleUpdate>(
    handleDebouncedUpdateLink,
    500
  );

  const handleBlur = (title: string) => {
    const currentPath = window.location.pathname;
    if (
      (type === null && currentPath === '/') ||
      (type === null && currentPath === '/bookmarks')
    ) {
      return;
    }

    lastUpdateRef.current = { title };
    updateFolderImmediately(title);
  };

  return {
    debouncedUpdate,
    handleBlur,
    debouncedUpdateLink,
  };
}
