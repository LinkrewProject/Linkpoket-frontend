import Bell from '@/assets/widget-ui-assets/Bell.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';

export function UserActions() {
  return (
    <div className="flex items-center gap-2">
      <button>
        <Bell className="cursor-pointer px-[3px] py-[2px]" />
      </button>
      <button>
        <Menu className="cursor-pointer" />
      </button>
    </div>
  );
}
