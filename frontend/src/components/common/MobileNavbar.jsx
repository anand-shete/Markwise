import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router';

const MobileNavbar = () => {
  const teacher = useSelector(state => state.teacher);
  const student = useSelector(state => state.student);
  const { pathname } = useLocation();

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-40 bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'translate-y-0' : '-translate-y-100'
      }`}
    >
      {pathname.length === 1 && (
        <div className="flex flex-col space-y-4 p-4">
          <NavLink to="/" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Home</Button>
          </NavLink>
          <NavLink to="/teacher/signup" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Register as Teacher</Button>
          </NavLink>
          <NavLink to="/student/signup" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Register as Student</Button>
          </NavLink>
        </div>
      )}
      {pathname.startsWith('/teacher') && (
        <div className="flex flex-col space-y-4 p-4">
          <NavLink to="/teacher/dashboard" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Dashboard</Button>
          </NavLink>
          <NavLink to="/teacher/signup" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Teacher Sign Up</Button>
          </NavLink>
          <NavLink to="/teacher/logout" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Logout</Button>
          </NavLink>
        </div>
      )}
      {pathname.startsWith('/student') && (
        <div className="flex flex-col space-y-4 p-4">
          <NavLink to="/student/dashboard" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Dashboard</Button>
          </NavLink>
          <NavLink to="/student/signup" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Student Sign Up</Button>
          </NavLink>
          <NavLink to="/student/logout" onClick={() => setIsOpen(!isOpen)}>
            <Button className="w-full">Logout</Button>
          </NavLink>
        </div>
      )}

      <Button>Click</Button>
    </div>
  );
};

export default MobileNavbar;
