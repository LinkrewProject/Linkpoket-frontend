import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { FolderDetail } from '@/types/folders';

export default function FolderCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: FolderDetail;
}) {
  return (
    <div className="border-gray-10 flex h-[242px] min-w-[156px] flex-col gap-4 rounded-[16px] border p-[16px]">
      <div className="border-gray-10 flex h-[96px] items-center justify-center overflow-hidden rounded-lg bg-[url('@/assets/common-ui-assets/FolderImage.svg')] bg-cover bg-center bg-no-repeat"></div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-[15px] font-bold">{item.folderName}</p>
          </div>
          <p className="text-[13px] font-[400] text-gray-50">
            {item.createdDate} · 폴더
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button className="cursor-pointer">
            {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
          </button>
          <button className="cursor-pointer">
            <CardMenu />
          </button>
        </div>
      </div>
    </div>
  );
}
