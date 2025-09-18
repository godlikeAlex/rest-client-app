import { Outlet } from 'react-router';
import { Footer, Header } from '@/components';

export default function MainLayout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
