import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <span
          className="text-6xl font-black text-beiersdorf-blue leading-none select-none"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
            letterSpacing: "-0.03em",
          }}
        >
          B
        </span>
        <div className="flex flex-col justify-center mt-1">
          <span className="text-l font-light text-gray-900 leading-none tracking-tight">
            .SkinWise
          </span>
          <div className="w-full h-px bg-gray-300 my-1"></div>
          <span className="text-[7px] font-medium text-beiersdorf-blue uppercase tracking-widest opacity-70">
            Beiersdorf Studio
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
