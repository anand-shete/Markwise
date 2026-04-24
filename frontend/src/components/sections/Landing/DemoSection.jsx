export default function DemoSection() {
  return (
    <div className="my-20 min-w-full">
      <h1 className="text-center text-3xl font-bold tracking-tight">
        Project Walkthrough
      </h1>
      <div className="mx-20 flex flex-row justify-center space-x-8 py-10">
        <div className="">
          <h2 className="mt-3 text-2xl">See Markwise in Action</h2>
          <p className="mt-6 max-w-2xl text-base leading-7">
            This demo showcases the core workflow of Markwise, including
            QR-based attendance scanning, student attendance tracking, and
            teacher-side attendance management features.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7">
            The recorded demo was created during an earlier development phase.
            Since then, the platform has received major UI improvements,
            workflow refinements, and overall usability enhancements while
            maintaining the same core functionality.
          </p>
        </div>
        <iframe
          src="https://www.youtube.com/embed/q1NrGr6ikPM?si=5P_xhRLImXMHeLrm"
          title="Demo Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-[60vh] w-[60vw] rounded-md"
        ></iframe>
      </div>
    </div>
  );
}
