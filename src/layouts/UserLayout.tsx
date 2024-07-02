import { Outlet } from 'react-router-dom';
import * as rootcomponents from '../components/index';
export const UserLayout: React.FC = () => {
  return (
    <main className="h-screen flex flex-col md:flex-row font-[outfit] overflow-hidden">
      <aside>
        <rootcomponents.Sidebar />
      </aside>
      <section className="flex-1 flex flex-col bg-zinc-50">
        <main className="flex-1 overflow-y-auto pb-3">
          <Outlet />
        </main>
      </section>
    </main>
  );
};
