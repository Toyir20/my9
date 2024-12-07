import React from "react";
import not_found from "/404.svg";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center">
      <img width={600} src={not_found} alt="404 - page not found" />
    </div>
  );
};

export default ErrorPage;
