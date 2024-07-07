import NotificationPanel from './NotificationPanel';
function UserNavbar() {
  return (
    <nav>
      <header className="flex border w-full items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
        <div>
          <h1 className="text-lg font-medium">Hello, Sage</h1>
          <p className="text-sm text-gray-400">Wen, 20th 2024</p>
        </div>
        <div className="flex items-center gap-x-8">
          {/* <!-- notifcation icon --> */}
          <NotificationPanel />
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
            type="button"
            id="radix-:r0:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <img
              src="https://i.pravatar.cc/300"
              width="32"
              height="32"
              className="rounded-full ring ring-slate-800"
              alt="Avatar"
            />
            <span className="sr-only">Toggle user menu</span>
          </button>
        </div>
      </header>
    </nav>
  );
}
export default UserNavbar;
