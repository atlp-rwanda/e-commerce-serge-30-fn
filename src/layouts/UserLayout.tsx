import { Outlet } from 'react-router-dom';
export const UserLayout: React.FC = () => {
  return (
    <main className="h-screen">
      <aside>sidebar</aside>
      <section>
        <nav>navbar</nav>
        <Outlet />
      </section>
    </main>
  );
};
