import { PageContentSectionProps } from '@/types/pageItems';
import { useModalStore } from '@/stores/modalStore';

export default function PersonalPageContentSection({
  searchResult,
  pageDetails,
}: PageContentSectionProps) {
  // const { openLinkModal, openFolderModal } = useModalStore();

  const folderData = pageDetails?.directoryDetailRespons ?? [];
  const linkData = pageDetails?.siteDetailResponses ?? [];

  const mergedList = searchResult
    ? [
        ...(searchResult.directorySimpleResponses ?? []),
        ...(searchResult.siteSimpleResponses ?? []),
      ].map((item, index) => ({
        ...item,
        orderIndex:
          'orderIndex' in item && typeof item.orderIndex === 'number'
            ? item.orderIndex
            : index,
      }))
    : [...folderData, ...linkData].sort((a, b) => a.orderIndex - b.orderIndex);

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
