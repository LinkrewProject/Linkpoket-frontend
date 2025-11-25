import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/stores/userStore';
import { fetchJoinedPage } from '@/apis/page-apis/fetchJoinedPage';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
import {
  baseCards,
  DEFAULT_SHARED_PAGE_IMAGE,
  HomeCard,
} from '@/constants/homeCards';
import { resolvePageImageUrl } from '@/utils/resolvePageImageUrl';

export default function WebHome() {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<HomeCard | null>(null);
  const [cards, setCards] = useState<HomeCard[]>(baseCards);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // 랜덤 색상 생성 함수
  const getRandomColor = (index: number) => {
    const colors = [
      '#8B5CF6', // 보라색
      '#EF4444', // 빨간색
      '#F59E0B', // 주황색
      '#10B981', // 초록색
      '#3B82F6', // 파란색
      '#EC4899', // 핑크색
      '#06B6D4', // 청록색
      '#84CC16', // 라임색
      '#F97316', // 오렌지색
      '#8B5A2B', // 갈색
    ];
    return colors[index % colors.length];
  };

  // /api/personal-pages/overview를 사용하여 모든 페이지 + 폴더 정보 한번에 가져오기
  const { data: overviewData, isLoading: overviewLoading } = useQuery({
    queryKey: ['pagesOverview'],
    queryFn: fetchJoinedPage,
    enabled: isLoggedIn,
    // 웹에서는 실시간성을 위해 자주 refetch
    staleTime: 0,
    gcTime: 1000 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // Overview API 응답에서 데이터 추출
  const personalPage = useMemo(
    () => overviewData?.data?.find((p: any) => p.pageType === 'PERSONAL'),
    [overviewData?.data]
  );

  const sharedPages = useMemo(
    () => overviewData?.data?.filter((p: any) => p.pageType === 'SHARED') || [],
    [overviewData?.data]
  );

  // 북마크 데이터만 별도로 가져오기 (북마크는 페이지가 아니므로)
  const { favorite: bookmarkData, isLoading: bookmarkLoading } =
    useFetchFavorite();

  // Overview 데이터를 사용하여 카드 생성
  useEffect(() => {
    if (
      !overviewLoading &&
      !bookmarkLoading &&
      (personalPage || sharedPages.length > 0)
    ) {
      console.log('✅ [WEB] 데이터 로딩 완료!');

      // 1. 기본 카드 업데이트 (개인 페이지, 북마크)
      const updatedBaseCards = baseCards.map((card) => {
        let folders: any[] = [];
        let backgroundImage = card.backgroundImage;

        switch (card.id) {
          case 'space-travel': // 개인 페이지
            folders =
              personalPage?.folders?.map((folder: any) => ({
                folderId: folder.folderId,
                folderTitle: folder.folderName,
              })) || [];
            backgroundImage = resolvePageImageUrl(
              personalPage?.pageImageUrl,
              card.backgroundImage
            );
            break;
          case 'ocean-life': // 북마크
            folders =
              bookmarkData?.directorySimpleResponses?.map((folder: any) => ({
                folderId: folder.folderId,
                folderTitle: folder.folderTitle,
              })) || [];
            break;
        }

        return { ...card, folders, backgroundImage };
      });

      // 2. 공유 페이지 카드 생성
      const sharedPageCards: HomeCard[] = sharedPages.map((page: any) => ({
        id: `shared-page-${page.pageId}`,
        title: page.pageTitle,
        category: 'shared',
        tags: ['collaboration', 'team'],
        interestedCount: 0,
        backgroundImage: resolvePageImageUrl(
          page.pageImageUrl,
          DEFAULT_SHARED_PAGE_IMAGE
        ),
        pageId: page.pageId,
        isSharedPage: true,
        folders:
          page.folders?.map((folder: any) => ({
            folderId: folder.folderId,
            folderTitle: folder.folderName,
          })) || [],
      }));

      const updatedCards = [...updatedBaseCards, ...sharedPageCards];
      setCards(updatedCards);
      setIsDataLoaded(true);
      setVisibleCount(Math.min(12, updatedCards.length));
    }
  }, [
    personalPage,
    sharedPages,
    bookmarkData,
    overviewLoading,
    bookmarkLoading,
  ]);

  // 가로 스크롤 시 카드 점진 로딩
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 200) {
        setVisibleCount((c) => Math.min(cards.length, c + 12));
      }
    };
    el.addEventListener('scroll', onScroll, {
      passive: true,
    } as AddEventListenerOptions);
    return () => el.removeEventListener('scroll', onScroll);
  }, [cards.length]);

  const handleCardClick = (card: HomeCard) => {
    console.log('Card clicked:', card.title);

    // 공유 페이지 카드인 경우
    if (card.isSharedPage && card.pageId) {
      navigate(`/shared/${card.pageId}`);
      return;
    }

    // 기본 카드들
    switch (card.id) {
      case 'space-travel': // 개인 페이지
        navigate('/');
        break;
      case 'ocean-life': // 북마크
        navigate('/bookmarks');
        break;
      default:
        console.log('Unknown card:', card.id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="scrollbar-hide flex min-h-[calc(100vh-200px)] items-center justify-center px-8">
        <div
          ref={listRef}
          className="home-card-list scrollbar-hide flex w-full max-w-7xl snap-x overflow-x-auto pt-12 pb-6 pl-4"
        >
          {cards.slice(0, visibleCount).map((card, index) => (
            <div
              key={card.id}
              className="home-card group relative flex-shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleCardClick(card)}
              onMouseEnter={() => setHoveredCard(card)}
            >
              {/* 배경 이미지 */}
              <img
                src={card.backgroundImage}
                alt={card.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                {...({ fetchPriority: index === 0 ? 'high' : 'auto' } as any)}
                width={256}
                height={256}
                className="absolute inset-0 h-full w-full bg-gray-200 object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* 인기 태그 */}
              {card.isPopular && (
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                    PERSONAL
                  </span>
                </div>
              )}

              {/* 북마크 아이콘 (북마크 카드에만 표시) */}
              {card.id === 'ocean-life' && (
                <div className="absolute top-4 right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-orange-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* 제목과 정보 */}
              <div className="absolute right-4 bottom-4 left-4">
                <h3 className="mb-2 text-xl font-bold text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-white/90">
                  {card.interestedCount} people interested
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 폴더 목록 표시 영역 */}
      {hoveredCard && (
        <div className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 transform">
          <div className="max-w-4xl rounded-full bg-white/30 px-8 py-4 shadow-2xl backdrop-blur-md">
            {!isDataLoaded ? (
              // 데이터 로딩 중일 때
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                  <span className="text-sm text-gray-500">폴더 로딩 중...</span>
                </div>
              </div>
            ) : hoveredCard.folders && hoveredCard.folders.length > 0 ? (
              // 폴더 데이터가 있을 때
              <div className="flex flex-wrap items-center justify-center gap-3">
                {hoveredCard.folders.map((folder, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      // 폴더로 이동
                      if (hoveredCard.isSharedPage && hoveredCard.pageId) {
                        navigate(
                          `/shared/${hoveredCard.pageId}/folder/${folder.folderId}`
                        );
                      } else if (hoveredCard.id === 'ocean-life') {
                        navigate(`/bookmarks/folder/${folder.folderId}`);
                      } else {
                        navigate(`/personal/folder/${folder.folderId}`);
                      }
                    }}
                    className="cursor-pointer rounded-full bg-white px-6 py-2 transition-colors duration-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: getRandomColor(index) }}
                      />
                      <span className="text-base font-medium text-black">
                        {folder.folderTitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 폴더가 없을 때
              <div className="flex items-center justify-center">
                <span className="text-sm text-gray-500">폴더가 없습니다</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
