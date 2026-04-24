import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/bg.avif';

export default function HeroSection() {
  return (
    <div className="relative flex h-[90vh] min-w-full flex-col items-center justify-center border-b shadow-2xl">
      <div className="absolute z-1 h-[90vh] w-full bg-black/80"></div>
      <img
        src={heroBg}
        alt="hero-bg"
        className="absolute h-[90vh] min-w-full object-contain object-center"
      />
      <div className="z-10 mt-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          Welcome to Markwise
        </h1>
        <p className="mt-5 text-xl text-white opacity-90 md:text-2xl">
          Scan. Mark. Manage attendance with ease.
        </p>
        <div className="mt-10 *:mx-3">
          <Button className="transition hover:scale-110" size="lg">
            <NavLink to="/teacher/signup">Teacher Signup</NavLink>
          </Button>
          <Button className="transition hover:scale-110" size="lg">
            <NavLink to="/student/signup">Student Signup</NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
