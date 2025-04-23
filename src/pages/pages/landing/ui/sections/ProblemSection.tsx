import YellowCheck from '@/assets/common-ui-assets/YellowCheck.svg?react';
import LinkManagementImg from '@/assets/common-ui-assets/LinkManagementImg.svg?react';
import Logo from '@/assets/common-ui-assets/Logo.svg?react';

const ProblemSection: React.FC = () => {
  const problemDescriptions = [
    {
      texts: [
        { text: '필요한 링크를 찾느라', highlight: true },
        { text: '매번 메모앱이나 채팅방을 뒤져본 적', highlight: false },
      ],
    },
    {
      texts: [
        { text: '브라우저마다 즐겨찾기 위치가 달라서', highlight: false },
        { text: '다시 검색하느라 ', highlight: true },
        { text: '시간을 낭비했던 적', highlight: false },
      ],
    },
  ];

  return (
    <section className="bg-white px-[90px] pt-[100px]">
      <div className="w-[1100px]">
        <h2 className="mb-14 text-[38px] font-bold">혹시 이런 적 있나요?</h2>

        <div className="flex justify-between">
          {/* 문제점 설명 */}
          <div className="flex w-[542px] flex-col space-y-4">
            {problemDescriptions.map((problem, index) => (
              <div
                key={index}
                className="bg-gray-5 rounded-[20px] px-[54px] py-[43px]"
              >
                <div className="flex items-center">
                  <YellowCheck />
                  <div className="ml-4">
                    {problem.texts.map((textItem, textIndex) =>
                      textIndex === 0 ? (
                        <p
                          key={textIndex}
                          className={`text-[24px] font-semibold ${
                            textItem.highlight && 'text-primary-50'
                          }`}
                        >
                          {textItem.text}
                        </p>
                      ) : (
                        <span
                          key={textIndex}
                          className={`text-[24px] font-semibold ${
                            textItem.highlight && 'text-primary-50'
                          }`}
                        >
                          {textItem.text}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 링크 일러스트레이션 */}
          <LinkManagementImg />
        </div>

        {/* LINKREW 소개 */}
        <div className="mt-[152px] flex w-[1110px] flex-col items-center">
          <Logo className="h-[122px] w-[122px] object-contain" />
          <p className="mt-6 mb-2 text-[38px] font-bold">
            그럴 땐, <span className="text-primary-50">LINKREW</span> 하나면
            충분해요
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
