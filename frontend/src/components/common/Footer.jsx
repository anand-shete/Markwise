import { NavLink } from 'react-router';

export default function Footer() {
  return (
    <footer className="w-full bg-black py-6 text-center text-white">
      <p>© 2026 Markwise. All rights reserved.</p>
      <div className="mt-2 flex justify-center gap-4">
        <NavLink
          to="https://github.com/anand-shete/Attendance-Management-System"
          target="_blank"
          className="hover:text-slate-300 hover:underline"
        >
          GitHub
        </NavLink>
        <NavLink to="/" className="hover:text-slate-300 hover:underline">
          Privacy Policy
        </NavLink>
        <NavLink to="/" className="hover:text-slate-300 hover:underline">
          Terms of Service
        </NavLink>
      </div>
    </footer>
  );
}
