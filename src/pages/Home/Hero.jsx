import React from "react";
import education from "/hero_img.svg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation("home");

  return (
    <section className="bg-primary text-secondary duration-300">
      <div className="container flex flex-col justify-center py-0 mx-auto lg:py-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center py-4 sm:py-8 text-center rounded-sm lg:max-w-md xl:max-w-xl lg:text-left">
          <h1 className="text-4xl font-bold leading-none sm:text-6xl text-secondary">
            <span data-aos="flip-down" dangerouslySetInnerHTML={{ __html: t("hero.title") }} />
          </h1>
          <p className="mt-5 mb-7 text-lg">{t("hero.description")}</p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <button className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-main rounded-md group">
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-accent1 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-primary"></span>
              </span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-accent1 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-primary"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-accent1 rounded-md group-hover:translate-x-0"></span>
              <span className="relative w-full text-center text-primary dark:text-secondary transition-colors duration-200 ease-in-out ">
                {t("hero.button")}
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-start justify-center">
          <img
            src={education}
            alt="education"
            className="object-contain h-60 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
