import { lazy } from 'react';

import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
import { usePageLayout } from '@/hooks/usePageLayout';
import { getPageDataLength } from '@/utils/pageData';
import { PageLayout } from '@/components/common-ui/PageLayout';
import { BackButton } from '@/components/common-ui/BackButton';
import { CopyLinkButton } from '@/components/common-ui/CopyLinkButton';
import { useMobile } from '@/hooks/useMobile';

const BookmarkPageContentSection = lazy(
  () => import('@/components/page-layout-ui/BookmarkPageContentSection')
);

export default function BookmarkPage() {
  const isMobile = useMobile();
  const { favorite: refinedData } = useFetchFavorite();
  const { sortType, handleSort } = usePageLayout();

  const folderData = refinedData.directorySimpleResponses;
  const linkData = refinedData.siteSimpleResponses;
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  return (
    <>
      <BackButton isMobile={isMobile} />
      <CopyLinkButton isMobile={isMobile} />
      <PageLayout isMobile={isMobile}>
        <PageHeaderSection pageTitle="북마크" isMobile={isMobile} />
        <PageControllerSection
          folderDataLength={folderDataLength}
          linkDataLength={linkDataLength}
          onSortChange={handleSort}
          isMobile={isMobile}
        />
        <BookmarkPageContentSection
          folderData={folderData}
          linkData={linkData}
          sortType={sortType}
          isMobile={isMobile}
        />
      </PageLayout>
    </>
  );
}
