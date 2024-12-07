import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="text-center md:w-3/4 mx-auto flex justify-center items-center flex-col">
      <h2 className="text-3xl sm:text-4xl font-semibold">{title}</h2>
      <h4 className="mt-3 opacity-70 text-[13px] sm:text-base">{description}</h4>
    </div>
  );
};

export default Title;
