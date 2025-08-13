import { FEEDBACK_SURVEY_URL } from '@/constants/feedbackUrl';
import { PRIVACY_POLICY } from '@/constants/privacyPolicy';
import { TERMS_OF_SERVICE } from '@/constants/termsOfService';
import LockIcon from '@assets/common-ui-assets/Lock.svg?react';
import MessageIcon from '@assets/common-ui-assets/Message.svg?react';
import DocumentIcon from '@assets/common-ui-assets/document.svg?react';
import { Link } from 'react-router-dom';

type ContactItem = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  href: string;
};

export const ContactDetail = () => {
  const contactButtons: ContactItem[] = [
    { Icon: MessageIcon, title: '서비스 문의', href: FEEDBACK_SURVEY_URL },
    { Icon: DocumentIcon, title: '이용약관', href: TERMS_OF_SERVICE },
    { Icon: LockIcon, title: '개인정보 처리방침', href: PRIVACY_POLICY },
  ];

  return (
    <div className="relative">
      <div className="text-gray-90 border-gray-30 bg-gray-0 absolute -top-10 -left-40 flex flex-col rounded-lg border px-2 py-2 text-[14px] font-[500]">
        {contactButtons.map(({ Icon, title, href }) => (
          <Link
            key={title}
            to={href}
            target="_blank"
            className="hover:bg-gray-10 flex items-center gap-[10px] rounded-lg px-2 py-[11px]"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden />
            <span className="whitespace-nowrap">{title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
