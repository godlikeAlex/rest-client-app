import { Outlet } from 'react-router';
import { Footer, Header } from '@/components';
import { Notifications } from '@mantine/notifications';

export default function MainLayout() {
  return (
    <main style={{ position: 'relative' }}>
      <Header />
      <div style={{ position: 'absolute', top: 110, right: 0 }}>
        <Notifications
          withinPortal={false}
          autoClose={3500}
          styles={{
            root: {
              width: 450,
              borderRadius: 8,
            },
          }}
        />
      </div>
      <Outlet />
      <Footer />
    </main>
  );
}
