import { useEffect, useRef, useState } from 'react';
import 확장프로그램이미지 from '@/assets/common-ui-assets/크롬브라우저 이미지.webp';
import 폴더별정리이미지 from '@/assets/common-ui-assets/폴더별정리이미지_LINKPOKET.webp';
import 공유페이지이미지 from '@/assets/common-ui-assets/공유페이지이미지_LINKPOKET.webp';

const NewSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const featureData = [
    {
      description: (
        <>
          링크 포켓은 링크 공유, 저장, 관리를 위한
          <br />
          통합 링크 관리 서비스입니다.
        </>
      ),
      className: 'font-bold mb-4 text-[20px] md:text-[35px]',
    },
  ];

  const secondData = [
    {
      item: <>간편한 링크 저장</>,
      className: 'font-bold mb-4 text-[28px]',
    },
    {
      item: (
        <>
          주소창 우측의 링크포켓 아이콘을 클릭하면,
          <br />
          현재 사이트가 원하는 폴더에 즉시 저장됩니다.
        </>
      ),
      className: '',
    },
  ];

  const thirdData = [
    {
      item: (
        <>
          카드 형식으로 보기 좋게,
          <br />
          폴더별로 정리까지
        </>
      ),
      className: 'font-bold mb-4 text-[28px]',
    },
    {
      item: (
        <>
          대표 이미지와 제목이 있는 링크들을 폴더별로 나눠,
          <br />
          쉽게 찾고 관리할 수 있어요.
        </>
      ),
      className: '',
    },
  ];

  const forthData = [
    {
      item: (
        <>
          함께 쓰면 더 강력한
          <br />
          공유 페이지
        </>
      ),
      className: 'font-bold mb-4 text-[28px]',
    },
    {
      item: (
        <>
          팀, 스터디, 프로젝트 별로
          <br />
          필요한 자료를 함께 정리하고 공유하세요.
        </>
      ),
      className: '',
    },
  ];

  return (
    <section className="mx-auto my-[100px] flex w-full max-w-[980px] flex-col px-[24px]">
      {/* 1번째 */}
      {featureData.map((feature, idx) => {
        return (
          <p
            ref={idx === 0 ? sectionRef : undefined}
            key={idx}
            className={`${feature.className} text-center transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            {feature.description}
          </p>
        );
      })}

      {/* 2번째 */}
      <div className="flex justify-center">
        <div className="mt-[138px] flex flex-col-reverse md:w-full md:flex-row md:place-content-between">
          <div className="flex flex-col justify-center">
            {secondData.map((feature, idx) => {
              return (
                <p key={idx} className={`${feature.className} text-left`}>
                  {feature.item}
                </p>
              );
            })}
          </div>
          <img
            src={확장프로그램이미지}
            className="mb-12 w-[312px] rounded-3xl object-cover md:mb-0 md:w-[466px]"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* 3번째 */}
      <div className="flex justify-center">
        <div className="mt-[138px] flex flex-col md:w-full md:flex-row md:place-content-between">
          <img
            src={폴더별정리이미지}
            className="mb-12 w-[400px] rounded-3xl object-cover md:mb-0 md:w-[520px]"
            loading="lazy"
            fetchPriority="low"
          />
          <div className="flex flex-col justify-center">
            {thirdData.map((feature, idx) => {
              return (
                <p key={idx} className={`${feature.className} text-left`}>
                  {feature.item}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4번째 */}
      <div className="flex justify-center">
        <div className="mt-[138px] flex flex-col-reverse md:w-full md:flex-row md:place-content-between">
          <div className="flex flex-col justify-center">
            {forthData.map((feature, idx) => {
              return (
                <p key={idx} className={`${feature.className} text-left`}>
                  {feature.item}
                </p>
              );
            })}
          </div>
          <img
            src={공유페이지이미지}
            className="mb-12 w-[312px] rounded-3xl object-cover md:mb-0 md:w-[466px]"
            loading="lazy"
            fetchPriority="low"
          />
        </div>
      </div>
    </section>
  );
};

export default NewSection;
