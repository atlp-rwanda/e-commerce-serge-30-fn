import { Outlet } from 'react-router-dom';
export const VendorLayout: React.FC = () => {
  return (
    <main className="h-screen">
      <aside>sidebar vendor</aside>
      <section>
        <nav>navbar vendor</nav>
        <Outlet />
      </section>
    </main>
  );
};
