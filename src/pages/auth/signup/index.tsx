import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Radio } from '@/shared/ui/Radio';
import { Checkbox } from '@/shared/ui/CheckBox';

const SignupPage = () => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    ageGroup: '',
    gender: '',
    job: '',
    nickname: '',
    termsAgreed: false,
  });

  // 에러 상태 관리
  const [errors, setErrors] = useState({
    ageGroup: false,
    gender: false,
    job: false,
    nickname: false,
    termsAgreed: false,
  });

  // 폼이 제출되었는지 여부
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 입력 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // 라디오 버튼 변경 처리
  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 유효성 검사
  const validateForm = () => {
    const newErrors = {
      ageGroup: !formData.ageGroup,
      gender: !formData.gender,
      job: !formData.job.trim(),
      nickname: !formData.nickname.trim(),
      termsAgreed: !formData.termsAgreed,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean); // 모든 에러가 false면 true 반환
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      // 유효성 검사 통과 시 회원가입 로직 실행
      console.log('회원가입 진행:', formData);
      // 실제 API 호출 등의 로직 구현...
    } else {
      console.log('폼 유효성 검사 실패');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <h1 className="flex justify-center text-[28px] font-bold mb-8">
          링크모아 회원 가입
        </h1>

        {/* 연령대 */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">연령대</label>
          <div className="flex flex-row space-x-4">
            <Radio
              label="10대"
              name="ageGroup"
              value="10s"
              error={isSubmitted && errors.ageGroup}
              checked={formData.ageGroup === '10s'}
              onChange={() => handleRadioChange('ageGroup', '10s')}
            />
            <Radio
              label="20대"
              name="ageGroup"
              value="20s"
              error={isSubmitted && errors.ageGroup}
              checked={formData.ageGroup === '20s'}
              onChange={() => handleRadioChange('ageGroup', '20s')}
            />
            <Radio
              label="30대"
              name="ageGroup"
              value="30s"
              error={isSubmitted && errors.ageGroup}
              checked={formData.ageGroup === '30s'}
              onChange={() => handleRadioChange('ageGroup', '30s')}
            />
            <Radio
              label="40대 이상"
              name="ageGroup"
              value="40plus"
              error={isSubmitted && errors.ageGroup}
              checked={formData.ageGroup === '40plus'}
              onChange={() => handleRadioChange('ageGroup', '40plus')}
            />
          </div>
          {isSubmitted && errors.ageGroup && (
            <p className="mt-1 text-sm text-red-500">연령대를 선택해주세요.</p>
          )}
        </div>

        {/* 성별 */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">성별</label>
          <div className="flex flex-row space-x-4">
            <Radio
              label="남성"
              name="gender"
              value="male"
              error={isSubmitted && errors.gender}
              checked={formData.gender === 'male'}
              onChange={() => handleRadioChange('gender', 'male')}
            />
            <Radio
              label="여성"
              name="gender"
              value="female"
              error={isSubmitted && errors.gender}
              checked={formData.gender === 'female'}
              onChange={() => handleRadioChange('gender', 'female')}
            />
          </div>
          {isSubmitted && errors.gender && (
            <p className="mt-1 text-sm text-red-500">성별을 선택해주세요.</p>
          )}
        </div>

        {/* 직업 */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">직업</label>
          <Input
            name="job"
            value={formData.job}
            onChange={handleInputChange}
            placeholder="현재 직업을 선택해주세요."
            variant={isSubmitted && errors.job ? 'error' : 'default'}
            errorMessage={
              isSubmitted && errors.job ? '직업을 입력해주세요.' : undefined
            }
          />
        </div>

        {/* 닉네임 */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">닉네임</label>
          <Input
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            placeholder="사용하실 닉네임을 입력해주세요."
            variant={isSubmitted && errors.nickname ? 'error' : 'default'}
            errorMessage={
              isSubmitted && errors.nickname
                ? '닉네임을 입력해주세요.'
                : undefined
            }
          />
        </div>

        {/* 약관 */}
        <div className="space-y-2">
          <Checkbox
            label="아래 약관에 모두 동의합니다."
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleInputChange}
          />
          {isSubmitted && errors.termsAgreed && (
            <p className="text-sm text-red-500">약관에 동의해주세요.</p>
          )}

          {/* 약관 항목 1 */}
          <div
            className={`flex justify-between items-center text-sm ${isSubmitted && errors.termsAgreed ? 'text-red-500' : 'text-gray-700'} pl-1`}
          >
            <div className="flex items-center space-x-1">
              <span className="text-orange-500">✓</span>
              <span>(필수) 링크모아 이용약관 동의</span>
            </div>
            <button type="button" className="text-gray-500 underline">
              보기
            </button>
          </div>

          {/* 약관 항목 2 */}
          <div
            className={`flex justify-between items-center text-sm ${isSubmitted && errors.termsAgreed ? 'text-red-500' : 'text-gray-700'} pl-1`}
          >
            <div className="flex items-center space-x-1">
              <span className="text-orange-500">✓</span>
              <span>(필수) 개인정보 처리방침 동의</span>
            </div>
            <button type="button" className="text-gray-500 underline">
              보기
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full h-12" variant="primary">
          회원 가입
        </Button>
      </form>
    </main>
  );
};

export default SignupPage;
