import Hamburger from '@/assets/widget-ui-assets/Hamburger.svg?react';

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <Hamburger />
    </button>
  );
}
