import { useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    if (!ref.current) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, setIsOpen]);
}

/* 
외부에선 ref값과 해당 컴포넌트의 마운트를 결정하는 set함수를 매개변수로 넣어 사용합니다 
useClickOutside(ref,setIsOpen) 이렇게 사용하시고, ref값을 가장 부모 요소에게 전달해주시면 됩니다. 참고 컴포넌트: dropdownInline.tsx 혹은 ModalNotification.tsx   
*/
