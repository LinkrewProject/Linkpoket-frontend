import Bell from '@/assets/widget-ui-assets/Bell.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';
import { useState } from 'react';
import NotificationModal from '../modal/modal-alarm/ModalNotification';
import { NotificationItem } from '@/types/modalAlaram';

const notifications: NotificationItem[] = [
  {
    id: 1,
    type: 'link',
    senderEmail: 'linkmoa@gmail.com',
    receiverEmail: 'youremail@gmail.com',
    directoryName: '00페이지',
    dateTime: '2025.04.09 | 08:20',
  },
  {
    id: 2,
    type: 'edit',
    directoryName: '00페이지',
    dateTime: '2025.04.09 | 08:20',
  },
];

export function UserActions() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center">
      <button
        className="active:bg-gray-10 hover:bg-gray-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px]"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <Bell className="h-[20px] w-[20px]" />
      </button>
      {isOpen && (
        <NotificationModal
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(!isOpen)}
          notifications={notifications}
          onAccept={() =>
            console.log('수락하는 로직 + 모달닫기 함수로 대체예정')
          }
          onReject={() =>
            console.log('거절하는 로직 + 모달닫기 함수로 대체예정')
          }
          onDelete={() =>
            console.log('item.id 를 통해서 해당 알람 삭제하는 함수로 대체예정')
          }
        />
      )}

      <button className="active:bg-gray-10 hover:bg-gray-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px]">
        <Menu className="cursor-pointer" />
      </button>
    </div>
  );
}
