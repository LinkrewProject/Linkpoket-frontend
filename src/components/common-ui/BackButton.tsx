import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  className = '',
  onClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 개인페이지나 공유 페이지인지 확인
  const isPersonalPage =
    location.pathname === '/' || location.pathname.startsWith('/personal');
  const isSharedPage = location.pathname.startsWith('/shared');
  const shouldShow = isPersonalPage || isSharedPage;

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  if (!shouldShow) return null;

  return (
    <button
      onClick={handleBackClick}
      className={`hover:bg-gray-10 active:bg-gray-20 fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-colors md:hidden ${className}`}
      aria-label="뒤로가기"
    >
      <svg
        className="text-gray-90 h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};
