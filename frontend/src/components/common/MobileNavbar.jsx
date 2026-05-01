import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const teacher = useSelector(state => state.teacher);
  const student = useSelector(state => state.student);
  const { pathname } = useLocation();

  return (
    <div className="block md:hidden">
      <div
        className={`fixed top-22 right-0 left-0 z-50 rounded-b-lg border-b border-black bg-slate-100 shadow-2xl shadow-black transition-all duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-200'} p-5 [&_button]:w-full [&_button]:border [&_button]:border-neutral-500 [&>div]:flex [&>div]:flex-col [&>div]:space-y-3`}
      >
        <div>
          <NavLink to="/" onClick={() => setIsOpen(!isOpen)}>
            <Button>Home</Button>
          </NavLink>
          <NavLink to="/teacher/signup" onClick={() => setIsOpen(!isOpen)}>
            <Button>Register as Teacher</Button>
          </NavLink>
          <NavLink to="/student/signup" onClick={() => setIsOpen(!isOpen)}>
            <Button>Register as Student</Button>
          </NavLink>
        </div>
        {teacher?._id && (
          <div>
            <NavLink to="/teacher/dashboard" onClick={() => setIsOpen(!isOpen)}>
              <Button>Dashboard</Button>
            </NavLink>
            <NavLink to="/teacher/signup" onClick={() => setIsOpen(!isOpen)}>
              <Button>Teacher Sign Up</Button>
            </NavLink>
            <NavLink to="/teacher/logout" onClick={() => setIsOpen(!isOpen)}>
              <Button>Logout</Button>
            </NavLink>
          </div>
        )}
        {student?._id && (
          <div>
            <NavLink to="/student/dashboard" onClick={() => setIsOpen(!isOpen)}>
              <Button>Dashboard</Button>
            </NavLink>
            <NavLink to="/student/signup" onClick={() => setIsOpen(!isOpen)}>
              <Button>Student Sign Up</Button>
            </NavLink>
            <NavLink to="/student/logout" onClick={() => setIsOpen(!isOpen)}>
              <Button>Logout</Button>
            </NavLink>
          </div>
        )}
      </div>

      <Button onClick={() => setIsOpen(!isOpen)} size="icon">
        {isOpen ? <X /> : <Menu />}
      </Button>
    </div>
  );
};

export default MobileNavbar;
