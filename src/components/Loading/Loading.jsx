import React from "react";
import Logo from "../Logo/Logo";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-y-scroll">
      <div className="absolute top-0 left-0 w-full h-full bg-primary opacity-5"></div>
      <div className="flex justify-center items-center w-full h-full text-center">
        <Logo loading={true} />
      </div>
    </div>
  );
};

export default Loading;
