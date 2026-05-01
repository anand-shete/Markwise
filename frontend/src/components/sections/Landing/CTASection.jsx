import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import qr from '@/assets/qr.svg';

const CTASection = () => {
  return (
    <section className="min-w-full border-t bg-white py-16">
      <div className="mx-6 grid items-center md:mx-10 md:grid-cols-2">
        <div className="flex justify-center">
          <img
            src={qr}
            alt="Markwise QR"
            className="h-auto w-64 brightness-90 transition-all hover:-translate-y-5 hover:scale-102 hover:brightness-100"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold md:text-2xl">
            Instantly Mark Attendance with QR
          </h2>
          <p className="mt-4 text-sm text-slate-600 md:text-base">
            Teachers generate a secure QR for each class. Students scan to
            instantly record attendance — simple, fast, and tamper-resistant.
          </p>

          <ul className="mt-4 list-inside list-disc text-sm text-slate-700">
            <li>Instant scan and mark</li>
            <li>Secure QR per session</li>
            <li>Easy reports & analytics</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="transition hover:scale-105">
              <NavLink to="/teacher/signup">I'm a Teacher</NavLink>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="transition hover:scale-105"
            >
              <NavLink to="/student/signup">I'm a Student</NavLink>
            </Button>

            <Button variant="ghost" size="lg" asChild>
              <NavLink
                to={'https://www.youtube.com/watch?v=q1NrGr6ikPM'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Show Demo
              </NavLink>
            </Button>
          </div>

          <p className="mt-3 text-xs text-slate-500">Completely Free to Use</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
