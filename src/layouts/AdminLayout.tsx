import { Outlet } from 'react-router-dom';
export const AdminLayout: React.FC = () => {
  return (
    <main className="h-screen">
      <aside>sidebar admin</aside>
      <section>
        <nav>navbar admin</nav>
        <Outlet />
      </section>
    </main>
  );
};
