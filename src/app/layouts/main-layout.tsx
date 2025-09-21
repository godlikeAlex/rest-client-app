import { Outlet } from 'react-router';
import { Footer, Header } from '@/components';
import { Notifications } from '@mantine/notifications';

export default function MainLayout() {
  return (
    <main style={{ position: 'relative' }}>
      <Header />
      <Notifications
        withinPortal={false}
        autoClose={3500}
        position="top-right"
      />
      <Outlet />
      <Footer />
    </main>
  );
}
