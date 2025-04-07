import Bell from '@/widgets/assets/Bell.svg?react';
import Menu from '@/widgets/assets/Menu.svg?react';

export function UserActions() {
  return (
    <div className="flex items-center gap-2">
      <button>
        <Bell className="py-[2px] px-[3px]" />
      </button>
      <button>
        <Menu />
      </button>
    </div>
  );
}
