import { Button } from '@/shared/ui/button';
import DropDown from '@/shared/ui/DropDown';
import DropDownInline from '@/shared/ui/DropDownInline';
import { ViewToggle } from '@/shared/ui/ViewToggle';
import { Footer } from '@/widgets/footer/Footer';
import { FooterLanding } from '@/widgets/footer/FooterLanding';
import { Header } from '@/widgets/header/Header';
import SideBar from '@/widgets/side-bar/SideBar';
import { useState } from 'react';

const sharedPagesData = [
  { id: '1', title: '공유 페이지 1' },
  { id: '2', title: '공유 페이지 2' },
];

export default function TEST() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="flex flex-col gap-[24px] m-10 ">
      <div>
        <DropDown
          isHost={true}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onWithDrawPage={() => console.log('탈퇴')}
          onDeletePage={() => console.log('삭제')}
          onContact={() => console.log('문의')}
        />
      </div>
      <div>
        <Button>버튼</Button>
      </div>
      <div>
        <DropDownInline
          id="1"
          type="directory"
          initialTitle="타이틀"
          initialLink="링크"
        />
      </div>
      <div className="flex flex-col gap-[24px]">
        <div>
          <ViewToggle selectedView="grid" onChange={() => console.log('hi')} />
        </div>
        <div className="text-[18px] font-bold">
          밑에는 Header, Sidebar, Footer입니다. 이후 합칠 예정으로 우선은
          개별적으로 봐주세요
        </div>
        <div>
          <Header hasSidebar={true} showDepth={true} isLoggedIn={true} />
          <Header hasSidebar={false} showDepth={false} isLoggedIn={false} />
          <Header hasSidebar={false} showDepth={true} isLoggedIn={true} />
        </div>

        <div>
          <SideBar
            avatarUrl="/avatar.png"
            nickname="김링크"
            email="linkmoa@gmail.com"
            sharedPages={sharedPagesData}
            showFooter={true}
          />
        </div>
        <FooterLanding />
      </div>
    </div>
  );
}
