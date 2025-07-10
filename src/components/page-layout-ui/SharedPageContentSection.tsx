import { useState } from 'react';
import { PageContentSectionProps } from '@/types/pageItems';
import { useModalStore } from '@/stores/modalStore';

export default function SharedPageContentSection({
  view,
  contentData,
  searchResult,
}: PageContentSectionProps) {
  // const { openLinkModal, openFolderModal } = useModalStore();
  const [isBookmarkRerender, setIsBookmarkRerender] = useState(false);

  const folderData = contentData?.directoryDetailRespons ?? [];
  const linkData = contentData?.siteDetailResponses ?? [];
  const mergedList = searchResult
    ? [
        ...(searchResult.directorySimpleResponses ?? []),
        ...(searchResult.siteSimpleResponses ?? []),
      ].map((item, index) => ({
        ...item,
        orderIndex: index, // orderIndex는 없기 때문에 임의 부여
      }))
    : [...folderData, ...linkData].sort((a, b) => a.orderIndex - b.orderIndex);
  console.log('합친 데이터', mergedList);

  return (
    <div className={`w-full overflow-y-auto`}>
      <div
        className={`grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {/* FolderCard혹은 LinkCard렌더링 */}
      </div>
    </div>
  );
}
