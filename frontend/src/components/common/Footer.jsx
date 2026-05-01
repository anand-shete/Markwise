import { NavLink } from 'react-router';

export default function Footer() {
  return (
    <footer className="w-full bg-black py-10 text-center text-white">
      <p className="text-base md:text-lg">
        © 2026 Markwise. All rights reserved.
      </p>
      <div className="mt-5 flex justify-center gap-4 text-sm text-slate-300">
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
