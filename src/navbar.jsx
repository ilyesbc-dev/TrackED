import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", mobile: "Home" },
  { to: "/student", label: "Student", mobile: "Student Dashboard" },
  { to: "/teacher", label: "Teacher", mobile: "Teacher Dashboard" },
  { to: "/admin", label: "Admin", mobile: "Administration" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const desktopClass = ({ isActive }) =>
    `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors no-underline ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
    }`;

  const mobileClass = ({ isActive }) =>
    `rounded-xl px-4 py-3 text-base font-medium transition-colors no-underline ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-stone-50/85 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-700 text-sm font-bold text-white shadow-sm">
              L
            </div>
            <span className="text-lg font-bold tracking-tight text-stone-900">
             Track<span className="text-indigo-700">Ed</span>
            </span>
          </Link>

          <nav className="hidden lg:block" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end className={desktopClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-3.5 py-2 text-sm font-medium text-stone-700 no-underline transition-colors hover:bg-stone-100 hover:text-indigo-700 lg:inline-flex"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hidden items-center justify-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-indigo-800 lg:inline-flex"
          >
            Sign up
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex rounded-lg p-2 text-stone-700 transition-colors hover:bg-stone-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-stone-200 bg-stone-50 p-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={mobileClass}
                onClick={closeMenu}
              >
                {link.mobile}
              </NavLink>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-center text-base font-semibold text-stone-700 no-underline transition hover:bg-stone-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-xl bg-indigo-700 px-4 py-3 text-center text-base font-semibold text-white no-underline shadow-sm transition hover:bg-indigo-800"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;