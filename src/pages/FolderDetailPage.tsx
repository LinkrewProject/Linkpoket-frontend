import { lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';
import { usePageLayout } from '@/hooks/usePageLayout';
import { getPageDataLength } from '@/utils/pageData';
import { ErrorState } from '@/components/common-ui/ErrorState';
import { PageLayout } from '@/components/common-ui/PageLayout';
import { Spinner } from '@/components/common-ui/Spinner';
import { BackButton } from '@/components/common-ui/BackButton';
import { CopyLinkButton } from '@/components/common-ui/CopyLinkButton';

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

  const { data, isLoading, isError } = useFetchFolderDetails(requestParams);

  if (isError) {
    return <ErrorState message="폴더 데이터를 불러올 수 없습니다." />;
  }

  if (isLoading) {
    return (
      <div className="relative h-full w-full">
        <Spinner display={true} position="center" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const folderData = data.data.folderDetailResponses;
  const linkData = data.data.linkDetailResponses;
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const folderName = data.data.targetFolderName;

  return (
    <>
      <BackButton />
      <CopyLinkButton />
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
    </>
  );
}
