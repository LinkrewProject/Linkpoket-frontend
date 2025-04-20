import Consult from '@/assets/common-ui-assets/Consult.svg?react';
import DarkMode from '@/assets/common-ui-assets/DarkMode.svg?react';
import Withdraw from '@/assets/common-ui-assets/Withdraw.svg?react';
import Deleted from '@/assets/common-ui-assets/Deleted.svg?react';
import ToggleButton from './ToggleButton';

interface DropDownProps {
  isHost: boolean;
  isDarkMode: boolean;
  onToggleDarkMode?: () => void; //우선 후순위 기능이기에 옵셔널 처리리
  onWithDrawPage: () => void;
  onDeletePage: () => void;
  onContact: () => void;
}

export default function DropDown({
  isHost,
  isDarkMode = false,
  onToggleDarkMode,
  onWithDrawPage,
  onDeletePage,
  onContact,
}: DropDownProps) {
  return (
    <div className="border-gray-30 inline-flex flex-col justify-center rounded-[10px] border p-[8px] font-[600] shadow-lg">
      <div className="flex flex-col">
        <button
          onClick={onContact}
          className="hover:bg-gray-5 active:bg-gray-5 flex cursor-pointer items-center gap-[10px] p-[12px] hover:rounded-[8px]"
        >
          <Consult /> <span className="text-[19px]">문의하기</span>
        </button>
        <div className="hover:bg-gray-5 active:bg-gray-5 flex items-center justify-between gap-[20px] hover:rounded-[8px]">
          <button className="flex items-center gap-[10px] p-[12px]">
            <DarkMode /> <span className="text-[19px]">다크 모드 전환</span>
          </button>
          <ToggleButton
            checked={isDarkMode}
            onClick={onToggleDarkMode}
            className="mr-[10px]"
          />
        </div>
        <div className="flex"></div>
      </div>
      <div className="border-gray-40 mx-[10px] my-[8px] w-[274px] border" />
      <div className="flex flex-col">
        <button
          onClick={onWithDrawPage}
          className="text-status-danger hover:bg-gray-5 active:bg-gray-5 flex cursor-pointer items-center gap-[10px] p-[12px] hover:rounded-[8px]"
        >
          <Withdraw /> <span className="text-[19px]">공유 페이지 탈퇴</span>
        </button>
        {isHost && (
          <button
            onClick={onDeletePage}
            className="text-status-danger hover:bg-gray-5 active:bg-gray-5 flex cursor-pointer items-center gap-[10px] p-[12px] hover:rounded-[8px]"
          >
            <Deleted /> <span className="text-[19px]">페이지 삭제하기</span>
          </button>
        )}
      </div>
    </div>
  );
}

// api를 어떻게 받냐에 따라 수정 가능성이 있음 : user.role === 'host';
// 다음과 같이 쓰길 기대함.
// export default function TEST() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleToggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };
//   return (
//     <div>
//       <DropDown
//         isHost={true}
//         isDarkMode={isDarkMode}
//         onToggleDarkMode={handleToggleDarkMode}
//         onWithDrawPage={() => console.log('탈퇴')}
//         onDeletePage={() => console.log('삭제')}
//         onContact={() => console.log('문의')}
//       />
//     </div>
//   );
// }
