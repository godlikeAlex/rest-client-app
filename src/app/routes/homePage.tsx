import { WelcomeBanner } from '@/components';

export default function HomePage() {
  const user = true;
  return <WelcomeBanner isUserLog={user} />;
}
