import { lazy, useEffect } from 'react';

import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useUserStore } from '@/stores/userStore';
import { usePageLayout } from '@/hooks/usePageLayout';
import { getPageDataLength } from '@/utils/pageData';
import { PageLayout } from '@/components/common-ui/PageLayout';
import ScrollToTopButton from '@/components/common-ui/ScrollToTopButton';
import { BackButton } from '@/components/common-ui/BackButton';
import { CopyLinkButton } from '@/components/common-ui/CopyLinkButton';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';

const PersonalPageContentSection = lazy(
  () => import('@/components/page-layout-ui/PersonalPageContentSection')
);

export default function PersonalPage() {
  const { data } = useFetchPersonalPage();

  const { setUser } = useUserStore();
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  useEffect(() => {
    if (!data) return;

    const pageId = data.pageId;
    const rootFolderId = data.rootFolderId;

    setPageInfo(pageId);

    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }

    localStorage.setItem(
      'personalPageData',
      JSON.stringify({
        data,
        lastUpdated: new Date().toISOString(),
      })
    );
  }, [data, setPageInfo, setParentsFolderId, setUser]);

  const folderData = data.folderDetailResponses;
  const linkData = data.linkDetailResponses;
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const pageTitle = data.pageTitle;

  return (
    <>
      <BackButton />
      <CopyLinkButton />
      <PageLayout>
        <PageHeaderSection pageTitle={pageTitle} />
        <PageControllerSection
          folderDataLength={folderDataLength}
          linkDataLength={linkDataLength}
          onSortChange={handleSort}
        />
        <PersonalPageContentSection
          folderData={folderData}
          linkData={linkData}
          sortType={sortType}
        />
        <ScrollToTopButton />
      </PageLayout>
    </>
  );
}
