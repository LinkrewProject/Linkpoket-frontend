import Modal from '@/components/common-ui/Modal';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
import ChevronLeft from '@/assets/common-ui-assets/ChevronLeft.svg?react';
import Check from '@/assets/common-ui-assets/Check.svg?react';

const ProfileChangeBody = ({ onBack }: { onBack: () => void }) => {
  const { nickname, colorCode } = useUserStore();
  const [profileColor, setProfileColor] = useState(colorCode || '');

  const colorPalette = [
    '#FF6464',
    '#FC82E3',
    '#FF931F',
    '#FFCA3E',
    '#48BF5A',
    '#60B5FF',
    '#5085FF',
    '#9771FF',
    '#A17C5E',
    '#5A5A5A',
  ];

  return (
    <>
      <Modal.Header>
        <div className="relative text-center">
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 pl-1 text-lg hover:cursor-pointer"
            onClick={onBack}
          >
            <ChevronLeft />
          </button>
          <h1 className="text-[22px] font-bold">프로필 변경</h1>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center">
          <div
            style={{ backgroundColor: profileColor }}
            className="flex h-[80px] w-[80px] items-center justify-center rounded-full text-[44px] text-white"
          >
            {nickname.charAt(0).toUpperCase()}
          </div>
          <div className="mt-6 grid grid-cols-5 gap-4">
            {colorPalette.map((color) => (
              <button
                key={color}
                className="relative h-[55px] w-[55px] rounded-full"
                style={{ backgroundColor: color }}
                onClick={() => setProfileColor(color)}
                type="button"
                aria-label={`색상 ${color} 선택`}
                aria-pressed={profileColor === color}
              >
                {profileColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ProfileChangeBody;
