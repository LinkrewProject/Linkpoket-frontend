import { useState } from 'react';
import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';

const AddLinkModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string, url: string) => Promise<void>;
}) => {
  const [link, setLink] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!link) return;

    if (url && !isValidUrl(url)) {
      console.error('유효하지 않은 URL 형식입니다.');
      // TODO 사용자에게 에러 메시지를 표시하는 로직 추가
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(link, url);
      setLink('');
      setUrl('');
      onClose();
    } catch (error) {
      console.error('링크 전송 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header showCloseButton>링크 추가</Modal.Header>

      <Modal.Body>
        <div className="space-y-4">
          <Input
            label={'URL'}
            placeholder="해당 링크의 URL을 입력해주세요."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            isModal={true}
            containerClassName="w-full"
            labelClassName="leading-[140%]"
          />
          <Input
            label={'링크명'}
            placeholder="링크명을 입력해 주세요"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            isModal={true}
            containerClassName="w-full"
            labelClassName="leading-[140%]"
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton
          onClick={() => {
            setLink('');
            setUrl('');
          }}
        />
        <Modal.ConfirmButton
          onClick={handleSubmit}
          disabled={!link || isSubmitting}
          variant={link ? 'primary' : 'default'}
        >
          {isSubmitting ? '추가 중...' : '추가'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLinkModal;
