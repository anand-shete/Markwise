import { CheckCircle2, GraduationCap, Presentation } from 'lucide-react';

export default function Features() {
  const studentFeatures = [
    'Scan QR codes for instant attendance marking',
    'View attendance history for every subject',
    'Track attendance percentage with simple analytics',
    'Access attendance records anytime from any device',
    'Receive real-time attendance status updates',
    'Maintain organized subject-wise attendance reports',
  ];

  const teacherFeatures = [
    'Generate secure QR codes for classroom attendance',
    'View detailed attendance reports of students',
    'Monitor low-attendance students quickly',
    'Manage classes, subjects, and student records efficiently',
    'Track daily, weekly, and monthly attendance trends',
    'Reduce manual attendance work and paperwork',
  ];

  return (
    <section className="min-w-full border-t bg-slate-200 py-20">
      <h1 className="pb-10 text-center text-3xl font-semibold tracking-tight">
        Markwise Features
      </h1>
      <div className="mx-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-400 bg-slate-100 p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7" />
            <h2 className="text-2xl font-bold">For Students</h2>
          </div>

          <ul className="mt-6 space-y-4">
            {studentFeatures.map(feature => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-400 bg-slate-100 p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Presentation className="h-7 w-7" />
            <h2 className="text-2xl font-bold">For Teachers</h2>
          </div>

          <ul className="mt-6 space-y-4">
            {teacherFeatures.map(feature => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
