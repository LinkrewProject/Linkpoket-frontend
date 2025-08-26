import { PageControllerSectionProps } from '@/types/pages';
import DropDownView from '../common-ui/DropDownView';

export default function PageControllerSection({
  folderDataLength = 0,
  linkDataLength = 0,
  onSortChange,
}: PageControllerSectionProps) {
  return (
    <div className="mb-2 flex h-[42px] items-center justify-between">
      <div className="text-[14px] font-[500] text-gray-50">
        {folderDataLength}개의 폴더 | {linkDataLength}개의 링크
      </div>
      <DropDownView onChange={onSortChange} />
    </div>
  );
}
