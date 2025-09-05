import { SkeletonBase } from './SkeletonBase';

export const ProfileSettingsModalSkeleton = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-100/50">
      <div className="bg-gray-0 relative flex w-[500px] flex-col overflow-hidden rounded-2xl p-6">
        {/* 헤더 스켈레톤 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="h-[24px] w-[80px] rounded">
            <SkeletonBase />
          </div>
          <div className="h-[24px] w-[24px] rounded">
            <SkeletonBase />
          </div>
        </div>

        {/* 프로필 섹션 스켈레톤 */}
        <div className="mb-4 flex gap-[12px]">
          {/* 프로필 이미지 + 변경 버튼 */}
          <div className="flex flex-col items-center">
            <div className="h-[50px] w-[50px] rounded-full">
              <SkeletonBase />
            </div>
            <div className="mt-1 h-[20px] w-[30px] rounded">
              <SkeletonBase />
            </div>
          </div>

          {/* 닉네임 입력 + 이메일 */}
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-center gap-2">
              {/* 닉네임 입력 필드 */}
              <div className="h-[42px] w-[295px] rounded">
                <SkeletonBase />
              </div>
              {/* 변경 버튼 */}
              <div className="h-[42px] w-[60px] rounded">
                <SkeletonBase />
              </div>
            </div>
            {/* 이메일 */}
            <div className="mt-2 h-[20px] w-[200px] rounded">
              <SkeletonBase />
            </div>
          </div>
        </div>

        {/* 프로필 액션 버튼들 스켈레톤 */}
        <div className="space-y-2">
          {/* 로그아웃 버튼 */}
          <div className="flex items-center">
            <div className="flex w-full flex-col gap-1">
              <div className="h-[24px] w-[80px] rounded">
                <SkeletonBase />
              </div>
              <div className="h-[20px] w-[160px] rounded">
                <SkeletonBase />
              </div>
            </div>
            {/* 화살표 아이콘 */}
            <div className="h-[20px] w-[20px] rounded">
              <SkeletonBase />
            </div>
          </div>

          {/* 회원탈퇴 버튼 */}
          <div className="flex items-center">
            <div className="flex w-full flex-col gap-1">
              <div className="h-[24px] w-[80px] rounded">
                <SkeletonBase />
              </div>
              <div className="h-[20px] w-[160px] rounded">
                <SkeletonBase />
              </div>
            </div>
            {/* 화살표 아이콘 */}
            <div className="h-[20px] w-[20px] rounded">
              <SkeletonBase />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
