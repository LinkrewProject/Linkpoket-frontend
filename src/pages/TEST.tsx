import { Header } from '@/widgets/header/header';

export default function TEST() {
  return (
    <div>
      <Header isLoggedIn={false} hasSidebar={false} showDepth={true} />
    </div>
  );
}
