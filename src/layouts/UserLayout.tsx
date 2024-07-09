import { Outlet } from 'react-router-dom';
import * as rootcomponents from '../components/index';
import { sidebarLinks } from '../../src/data/index';

export const UserLayout: React.FC = () => {
  return (
    <main className="h-screen flex flex-col tablet:flex-row font-[outfit] overflow-hidden">
      <aside>
        <rootcomponents.Sidebar userLinks={sidebarLinks} />
      </aside>
      <section className="flex-1 flex flex-col bg-zinc-50">
        <main className="flex-1 overflow-y-auto pb-3">
          <Outlet />
        </main>
      </section>
    </main>
  );
};
