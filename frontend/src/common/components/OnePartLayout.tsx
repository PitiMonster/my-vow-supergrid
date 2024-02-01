export const OnePartLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div className="h-screen min-w-screen bg-gradient-135 from-blue-10 to-blue-40 relative overflow-x-auto">
    <div className="relative flex items-center justify-center h-full min-h-[832px]">
      <div className="w-full h-full flex items-end justify-center absolute">
        <img
          src="/icons/blobs.svg"
          alt="background"
          className="hidden md:block h-full max_h_910:h-[108%]"
        />
      </div>
      {children}
    </div>
  </div>
);
