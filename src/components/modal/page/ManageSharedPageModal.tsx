import { useState } from 'react';
import Modal from '@/components/common-ui/Modal';
import { Button } from '@/components/common-ui/button';
import ToggleButton from '@/components/common-ui/ToggleButton';
import { Input } from '@/components/common-ui/Input';
import { Radio } from '@/components/common-ui/Radio';
import PageSortBox from '@/components/page-layout-ui/PageSortBox';

const MEMBERS = [
  {
    colorCode: 'bg-yellow-400',
    email: 'linkmoa@gmail.com',
    isWaiting: false,
    nickName: '김링크',
    role: 'HOST',
  },
  {
    colorCode: 'bg-sky-400',
    email: 'linkmoa@gmail.com',
    isWaiting: false,
    nickName: '링크누',
    role: 'VIEWER',
  },
  {
    colorCode: 'bg-yellow-300',
    email: 'linkmoa@gmail.com',
    isWaiting: false,
    nickName: '링크누룽',
    role: 'VIEWER',
  },
  {
    colorCode: 'bg-purple-400',
    email: 'linkmoa@gmail.com',
    isWaiting: true,
    nickName: '링크지',
    role: 'VIEWER',
  },
];

const TIERS = [
  { label: '베이직(5명)', value: 'BASIC' },
  { label: '스탠다드(10명)', value: 'STANDARD' },
  { label: '프리미엄(20명)', value: 'PREMIUM' },
];

interface ManageSharedPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageSharedPageModal = ({
  isOpen,
  onClose,
}: ManageSharedPageModalProps) => {
  const [isPublic, setIsPublic] = useState(false);
  const [tier, setTier] = useState('premium');
  const [search, setSearch] = useState('');

  const filteredMembers = (
    search.trim()
      ? MEMBERS.filter(
          (m) => m.nickName.includes(search) || m.email.includes(search)
        )
      : MEMBERS
  )
    .slice()
    .sort((a, b) => {
      if (a.isWaiting === b.isWaiting) return 0;
      return a.isWaiting ? 1 : -1;
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-[24px] md:max-w-[562px]"
    >
      <Modal.Header className="border-gray-40 mb-[16px] border-b-[1px] pb-[24px] text-[22px] font-bold">
        공유 페이지 관리
      </Modal.Header>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[16px] font-semibold">페이지 공개</span>
          <ToggleButton
            checked={isPublic}
            onClick={() => setIsPublic((v) => !v)}
          />
        </div>
        <div className="text-gray-70 mb-4 text-[16px]">
          페이지를 공개하면, 링크를 가진 모든 사용자가 볼 수 있습니다.
        </div>

        <div className="mb-2 flex gap-4">
          <div className="flex w-full gap-2">
            <Input
              containerClassName="flex-1 min-w-0"
              className="!w-auto"
              value="주소"
              readOnly
            />
            <Button size="sm" variant="secondary">
              링크 복사
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2 text-[16px] font-bold">
          공유 페이지 등급(멤버 초대 가능 수)
        </div>
        <div className="flex gap-4">
          {TIERS.map((t) => (
            <Radio
              key={t.value}
              name="tier"
              value={t.value}
              checked={tier === t.value}
              onChange={() => setTier(t.value)}
              label={t.label}
              isModal
            />
          ))}
        </div>
      </div>

      <div className="mb-2">
        <div className="mb-2 text-[16px] font-bold">공유 페이지 멤버</div>
        <div className="mb-2 flex gap-2">
          <Input
            containerClassName="flex-1 min-w-0"
            className="!w-auto"
            placeholder="멤버 닉네임/이메일로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button size="sm" variant="primary">
            멤버 초대
          </Button>
        </div>

        <div className="max-h-[220px] overflow-y-auto">
          {filteredMembers.map((m, i) => (
            <div
              key={i}
              className="border-gray-10 flex items-center gap-3 border-b py-2 last:border-b-0"
            >
              <div
                className={`text-primary-0 flex items-center justify-center rounded-full px-[16px] py-[10px] text-[22px] font-[500] ${m.colorCode}`}
              >
                {m.nickName[0]}
              </div>
              <div className="flex-1">
                <div className="text-gray-90 text-[18px] font-bold">
                  {m.nickName}
                </div>
                <div className="text-[16px] text-gray-50">{m.email}</div>
              </div>
              <div>
                <PageSortBox
                  options={
                    m.role === 'HOST' ? ['호스트', '뷰어'] : ['뷰어', '호스트']
                  }
                  onChange={(v) => console.log(v)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal.Footer className="pt-4">
        <Button variant="ghost" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageSharedPageModal;
