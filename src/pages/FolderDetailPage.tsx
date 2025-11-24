import { lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';
import { usePageLayout } from '@/hooks/usePageLayout';
import { getPageDataLength } from '@/utils/pageData';
import { PageLayout } from '@/components/common-ui/PageLayout';

const SharedPageFolderContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageFolderContentSection')
);

export default function FolderDetailPage() {
  const { folderId: folderIdParam } = useParams();
  const folderId = folderIdParam ?? '';
  const { pageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  useEffect(() => {
    if (folderId) {
      setParentsFolderId(folderId);
    }
  }, [folderId, setParentsFolderId]);

  const requestParams = {
    pageId,
    commandType: 'VIEW' as const,
    folderId: folderId,
    sortType: 'BASIC' as const,
  };

  const { data } = useFetchFolderDetails(requestParams);

  const folderData = data.folderDetailResponses;
  const linkData = data.linkDetailResponses;
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const folderName = data.targetFolderName;

  return (
    <PageLayout>
      <PageHeaderSection
        pageTitle={folderName}
        pageId={pageId}
        folderId={folderId}
      />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
        onSortChange={handleSort}
      />
      <SharedPageFolderContentSection
        folderData={folderData}
        linkData={linkData}
        sortType={sortType}
      />
    </PageLayout>
  );
}
