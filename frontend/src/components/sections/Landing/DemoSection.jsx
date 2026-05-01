export default function DemoSection() {
  return (
    <div className="my-20 min-w-full">
      <h1 className="mb-10 text-center text-2xl font-bold md:text-3xl">
        Live Demonstration
      </h1>
      <div className="mx-10 flex flex-col justify-center space-y-10 md:mx-20 md:flex-row md:space-y-0 md:space-x-8">
        <div>
          <h2 className="text-center text-xl md:text-left md:text-2xl">
            See Markwise in Action
          </h2>
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
          className="h-[60vh] w-full rounded-md md:w-[60vw]"
        ></iframe>
      </div>
    </div>
  );
}
