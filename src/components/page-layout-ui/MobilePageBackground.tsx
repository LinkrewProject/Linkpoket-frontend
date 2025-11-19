import { useMobile } from '@/hooks/useMobile';
import { useLocation, useParams } from 'react-router-dom';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';
import { resolvePageImageUrl } from '@/utils/resolvePageImageUrl';
import { baseCards } from '@/constants/homeCards';

const FALLBACK_IMAGE =
  'https://d3b39vpyptsv01.cloudfront.net/photo/1/2/17f552dbb8d76670480cd3ec5e9ac0c2.jpg';

export default function MobilePageBackground() {
  const isMobile = useMobile();
  const location = useLocation();
  const params = useParams();

  // 현재 경로에 따라 페이지 타입 결정
  const isPersonalPage =
    location.pathname === '/' || location.pathname.startsWith('/personal');
  const isSharedPage = location.pathname.startsWith('/shared');
  const isBookmarkPage = location.pathname.startsWith('/bookmarks');

  // 개인 페이지 이미지 (개인 페이지일 때만 호출)
  const { data: personalData } = useFetchPersonalPage(isPersonalPage);
  const personalPageImageUrl = personalData?.data?.pageImageUrl;

  // 공유 페이지 이미지 (공유 페이지일 때만 호출)
  const pageId = params.pageId || '';
  const { data: sharedData } = useFetchSharedPage(pageId, isSharedPage);
  const sharedPageImageUrl = sharedData?.data?.pageImageUrl;

  // 북마크 카드 이미지 (/home에서 사용하는 이미지)
  const bookmarkCard = baseCards.find((card) => card.id === 'ocean-life');
  const bookmarkImageUrl = bookmarkCard?.backgroundImage;

  // 현재 페이지에 맞는 이미지 URL 결정
  let pageImageUrl: string | null | undefined;
  if (isPersonalPage) {
    pageImageUrl = personalPageImageUrl;
  } else if (isSharedPage) {
    pageImageUrl = sharedPageImageUrl;
  } else if (isBookmarkPage) {
    // 북마크 페이지는 /home에서 사용하는 북마크 카드 이미지 사용
    pageImageUrl = bookmarkImageUrl || null;
  }

  return (
    <div>
      {isMobile && (
        <div className="relative w-full">
          <img
            src={resolvePageImageUrl(pageImageUrl, FALLBACK_IMAGE)}
            alt="Page background"
            className="w-full object-cover"
            style={{ aspectRatio: '10 / 5.5' }}
            loading="eager"
            decoding="async"
          />
          {/* 하단 그라데이션 */}
          <div className="absolute right-0 bottom-[-10px] left-0 h-37 bg-gradient-to-t from-white via-white/12 via-white/50 via-white/88 to-transparent"></div>
        </div>
      )}
    </div>
  );
}
