import { WelcomeBanner } from '@/components';

export default function Welcome() {
  const user = true;
  return <WelcomeBanner isUserLog={user} />;
}
