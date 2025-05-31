import Bell from '@/assets/widget-ui-assets/Bell.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';
import { useState } from 'react';
import NotificationModal from '../modal/page/ModalNotification';
import { NotificationItem } from '@/types/modalAlarm';
import ModalMenu from '../modal/page/ModalMenu';
import { useFetchNotifications } from '@/hooks/queries/useFetchNotification';

//테스트용 목데이터 POSTMAN참고
// const notifications: NotificationItem[] = [
//   {
//     id: 1,
//     type: 'link',
//     senderEmail: 'linkmoa@gmail.com',
//     receiverEmail: 'youremail@gmail.com',
//     directoryName: '00페이지',
//     dateTime: '2025.04.09 | 08:20',
//   },
//   {
//     id: 2,
//     type: 'edit',
//     directoryName: '00페이지',
//     dateTime: '2025.04.09 | 08:20',
//   },
// ];

export function UserActions() {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: notifications = [] } = useFetchNotifications();

  return (
    <div className="flex items-center">
      <button
        className={`hover:bg-gray-10 active:bg-gray-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px] ${isAlarmOpen ? 'bg-gray-10 rounded-[8px]' : ''} `}
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(false);
          setIsAlarmOpen((prev) => !prev);
        }}
      >
        <Bell className="h-[20px] w-[20px]" />
      </button>
      {isAlarmOpen && (
        <NotificationModal
          isOpen={isAlarmOpen}
          setIsOpen={() => setIsAlarmOpen(!isAlarmOpen)}
          notifications={notifications}
          onAccept={(id) => console.log(`${id} 수락`)}
          onReject={(id) => console.log(`${id} 거절`)}
          onDelete={(id) => console.log(`${id} 삭제`)}
        />
      )}

      <button
        className={`hover:bg-gray-10 active:bg-gray-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px] ${isMenuOpen ? 'bg-gray-10 rounded-[8px]' : ''} `}
        onClick={(e) => {
          e.stopPropagation();
          setIsAlarmOpen(false);
          setIsMenuOpen((prev) => !prev);
        }}
      >
        <Menu className="relative" />
      </button>

      {isMenuOpen && (
        <ModalMenu
          isHost={true}
          // isDarkMode={isDarkMode}
          // onToggleDarkMode={handleToggleDarkMode}
          setIsOpen={() => setIsMenuOpen(!isMenuOpen)}
          onWithDrawPage={() => console.log('탈퇴')}
          onContact={() => console.log('문의')}
        />
      )}
    </div>
  );
}
