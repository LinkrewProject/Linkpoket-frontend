import Consult from '@/shared/assets/Consult.svg?react';
import DarkMode from '@/shared/assets/DarkMode.svg?react';
import Withdraw from '@/shared/assets/Withdraw.svg?react';
import Deleted from '@/shared/assets/Deleted.svg?react';
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
    <div className="inline-flex flex-col justify-center p-[8px] border border-gray-30 rounded-[10px] shadow-lg font-[600]">
      <div className="flex flex-col">
        <button
          onClick={onContact}
          className="flex items-center gap-[10px] p-[12px] hover:bg-gray-5 active:bg-gray-5 cursor-pointer"
        >
          <Consult /> <span className="text-[19px]">문의하기</span>
        </button>
        <div className="flex gap-[20px] items-center justify-between  hover:bg-gray-5 active:bg-gray-5 ">
          <button className="flex items-center gap-[10px] p-[12px]">
            <DarkMode /> <span className="text-[19px]">다크 모드 전환</span>
          </button>
          <ToggleButton checked={isDarkMode} onClick={onToggleDarkMode} />
        </div>
        <div className="flex"></div>
      </div>
      <div className="w-[274px] border border-gray-40" />
      <div className="flex flex-col">
        <button
          onClick={onWithDrawPage}
          className="flex items-center gap-[10px] p-[12px] text-status-danger  hover:bg-gray-5 active:bg-gray-5 cursor-pointer"
        >
          <Withdraw /> <span className="text-[19px]">공유 페이지 탈퇴</span>
        </button>
        {isHost && (
          <button
            onClick={onDeletePage}
            className="flex items-center gap-[10px] p-[12px] text-status-danger  hover:bg-gray-5 active:bg-gray-5 cursor-pointer"
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
