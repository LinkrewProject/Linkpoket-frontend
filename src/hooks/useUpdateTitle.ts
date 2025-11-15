import { useRef } from 'react';
import { usePageStore } from '@/stores/pageStore';
import useUpdateFolder from '@/hooks/mutations/useUpdateFolder';
import { useUpdateLink } from '@/hooks/mutations/useUpdateLink';
import useUpdateSharedPageTitle from '@/hooks/mutations/useUpdateSharedPageTitle';
import { useDebounce } from '@/hooks/useDebounce';
import { UpdateLinkData } from '@/types/links';

type TitleUpdate = {
  title: string;
};

type UseUpdateTitleOptions = {
  type?: string;
  link?: string;
  pageId?: string;
  isPageTitle?: boolean;
};

export function useUpdateTitle(
  id?: string,
  initialTitle: string = '',
  options?: UseUpdateTitleOptions | string,
  link?: string
) {
  // 옵션 파라미터 처리
  const opts: UseUpdateTitleOptions =
    typeof options === 'string' ? { type: options, link } : options || {};

  const lastUpdateRef = useRef({ title: initialTitle });
  const { pageId: storePageId } = usePageStore();
  const pageId = opts.pageId || storePageId;
  const { mutate: updateFolder } = useUpdateFolder(pageId);
  const { mutate: updateLink } = useUpdateLink();
  const { mutate: updateSharedPageTitle } = useUpdateSharedPageTitle(
    pageId || ''
  );

  const updateFolderImmediately = (title: string) => {
    if (!id) return;

    const updateData = {
      baseRequest: { pageId: pageId, commandType: 'EDIT' },
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

  const updatePageTitleImmediately = (title: string) => {
    if (!pageId || !opts.isPageTitle) return;

    const updateData = {
      baseRequest: { pageId, commandType: 'EDIT' as const },
      pageTitle: title,
    };

    updateSharedPageTitle(updateData, {
      onSuccess: () => {
        lastUpdateRef.current = { title };
      },
      onError: (error) => {
        console.error('페이지 제목 업데이트 실패:', error);
      },
    });
  };

  const handleDebouncedUpdate = (update: TitleUpdate) => {
    lastUpdateRef.current = update;
    if (opts.isPageTitle) {
      updatePageTitleImmediately(update.title);
    } else if (id) {
      // folderId나 linkId가 있으면 폴더/링크 업데이트
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
      linkUrl: opts.link ?? '',
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
    if (opts.type !== null && opts.type !== undefined) {
      updateLinkImmediately(update.title);
    }
  };
  const debouncedUpdate = useDebounce<TitleUpdate>(handleDebouncedUpdate, 500);
  const debouncedUpdateLink = useDebounce<TitleUpdate>(
    handleDebouncedUpdateLink,
    500
  );

  const handleBlur = (title: string) => {
    if (opts.isPageTitle) {
      lastUpdateRef.current = { title };
      updatePageTitleImmediately(title);
      return;
    }

    if (id) {
      // folderId나 linkId가 있으면 폴더/링크 업데이트
      lastUpdateRef.current = { title };
      updateFolderImmediately(title);
      return;
    }

    const currentPath = window.location.pathname;
    if (
      (opts.type === null && currentPath === '/') ||
      (opts.type === null && currentPath === '/bookmarks')
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
