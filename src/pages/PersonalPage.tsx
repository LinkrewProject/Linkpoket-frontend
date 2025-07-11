import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PersonalPageContentSection from '@/components/page-layout-ui/PersonalPageContentSection';

export default function PersonalPage() {
  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle="폴더1" folderId={1} />
      <PageControllerSection />
      <PersonalPageContentSection />
    </div>
  );
}
