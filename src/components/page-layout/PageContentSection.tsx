import { useState } from 'react';
import FolderItem from './FolderItem';
import LinkItem from './LinkItem';
import { ContextMenu } from '../common-ui/ContextMenu';
import { PageContentSectionProps } from '@/types/pageItems';

export default function PageContentSection({ view }: PageContentSectionProps) {
  const [isBookmark, setIsBookmark] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`mx-auto mt-[40px] w-full max-w-[1180px] flex-1 overflow-y-auto px-[104px] text-3xl font-bold`}
    >
      <div
        className={`w-full max-w-[1180px] min-w-[328px] ${
          view === 'grid'
            ? 'grid-cols-custom grid gap-4'
            : 'flex flex-col gap-4'
        }`}
      >
        <FolderItem
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          item={{ id: '1', title: '폴더 이름' }}
          view={view}
        />
        <LinkItem
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          item={{ id: '1', title: '링크 이름' }}
          view={view}
        />
        <LinkItem
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          item={{ id: '1', title: '링크 이름' }}
          view={view}
        />
        <LinkItem
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          item={{ id: '1', title: '링크 이름' }}
          view={view}
        />
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    </div>
  );
}
