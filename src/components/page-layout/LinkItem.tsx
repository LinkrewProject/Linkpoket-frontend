import LinkItemIcon from '@/assets/common-ui-assets/LinkItemIcon.svg?react';
import ListBookmarkModal from './ListBookmarkOption';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import { PageItemProps } from '@/types/pageItems';

export default function LinkItem({
  item,
  view,
  isBookmark,
  setIsBookmark,
}: PageItemProps) {
  const isGrid = view === 'grid';

  return isGrid ? (
    <div className="bg-gray-0 hover:bg-gray-5 active:bg-gray-5 relative inline-flex cursor-pointer flex-col items-center gap-2 rounded-[10px] p-[12px]">
      <LinkItemIcon />
      <button
        className="absolute top-4 right-4 cursor-pointer bg-transparent"
        onClick={() => setIsBookmark((prev) => !prev)}
      >
        {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
      </button>
      <span className="text-gray-90 text-center text-[14px] font-[400]">
        {item.title}
      </span>
    </div>
  ) : (
    <div className="border-gray-30 hover:bg-gray-5 active:bg-gray-5 flex w-full items-center justify-between border-b px-[12px] py-[16px] last:border-b-0">
      <div className="flex items-center gap-[20px]">
        <LinkItemIcon width={42} height={38} />
        <span className="text-gray-90 text-[14px] font-[400]">
          {item.title}
        </span>
      </div>
      <div>
        <ListBookmarkModal
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
        />
      </div>
    </div>
  );
}
