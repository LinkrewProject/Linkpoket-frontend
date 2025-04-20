import Bell from '@/assets/widget-ui-assets/Bell.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';

export function UserActions() {
  return (
    <div className="flex items-center">
      <button className="active:bg-gray-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center active:rounded-[8px]">
        <Bell className="h-[20px] w-[20px]" />
      </button>
      <button className="active:bg-gray-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center active:rounded-[8px]">
        <Menu className="cursor-pointer" />
      </button>
    </div>
  );
}
