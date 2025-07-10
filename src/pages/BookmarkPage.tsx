import { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import BookmarkPageContentSection from '@/components/page-layout-ui/BookmarkPageContentSection';
import { usePageStore } from '@/stores/pageStore';
import { usePageSearch } from '@/hooks/usePageSearch';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
export default function BookmarkPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const pageId = usePageStore((state) => state.pageId);

  const { searchKeyword, setSearchKeyword, searchResult } = usePageSearch(
    pageId,
    'TITLE'
  );

  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  const favoriteQuery = useFetchFavorite();

  // 실제 사용할 데이터
  const data = favoriteQuery.favorite;

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle="폴더1" folderId={1} />
      <PageControllerSection />
      {/* 컨텐츠 영역 */}
      <BookmarkPageContentSection
        view={view}
        searchResult={searchResult}
        contentData={data}
      />
    </div>
  );
}
