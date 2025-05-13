import { Button } from '@/components/common-ui/button';
import LandingMainWebp from '@/assets/common-ui-assets/LandingMain.webp';

const HeroSection: React.FC = () => {
  const heroTitles = ['링크를 한눈에', '모아두고', '간편하게 관리하세요'];

  const buttonVariants = [
    {
      text: '링크루 시작하기',
      href: '/signup',
      className: '',
    },
    {
      text: '구글 확장 프로그램 무료 다운로드',
      href: '/extension',
      className: 'bg-primary-10 text-primary-60',
    },
  ];

  return (
    <section className="bg-primary-5 h-[558.41px] w-full px-[90px] py-[112px]">
      <div className="mx-auto flex max-w-[1280px] items-start justify-between">
        <header className="flex w-[550px] flex-col">
          {heroTitles.map((title, index) => (
            <h1
              key={index}
              className={`text-[38px] leading-[140%] font-bold tracking-[0.01em] ${
                index === 0 ? 'text-primary-50' : 'text-gray-100'
              }`}
            >
              {title}
            </h1>
          ))}

          <div className="mt-[22px] space-x-4">
            {buttonVariants.map(({ text, href, className }, index) => (
              <a key={index} href={href}>
                <Button
                  className={`px-5 py-4 text-[19px] font-semibold ${className} ${
                    index === 0
                      ? 'hover:bg-primary-40 active:bg-primary-60'
                      : 'hover:bg-primary-20 active:bg-primary-30'
                  }`}
                >
                  {text}
                </Button>
              </a>
            ))}
          </div>
        </header>

        <img
          src={LandingMainWebp}
          alt="Landing page main illustration"
          className="w-[550px] object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
