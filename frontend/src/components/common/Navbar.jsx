import { NavLink } from 'react-router';
import { MobileNavbar, DesktopNavbar } from '../';
import MarkwiseLogo from '@/assets/logo.png';

export default function Navbar() {
  return (
    <nav className="bg-opacity-95 fixed z-50 flex h-22 w-full flex-row items-center justify-around space-x-10 border-b border-white bg-slate-800">
      <div className="absolute left-0 -z-1 h-20 w-[15vw] bg-slate-800"></div>
      <NavLink to="/" className="group flex items-center space-x-2">
        <img src={MarkwiseLogo} alt="logo" className="h-18 rounded-xs" />
        <h1 className="group-hover:animate-in group-hover:slide-in-from-left-80 -z-2 text-2xl font-semibold tracking-tight text-white duration-500 group-hover:duration-500">
          Markwise
        </h1>
      </NavLink>

      <DesktopNavbar />

      <MobileNavbar />
    </nav>
  );
}
