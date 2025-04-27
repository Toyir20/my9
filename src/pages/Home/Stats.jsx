import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  const { t } = useTranslation("home");
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensure the animation triggers only once
    threshold: 0.3, // Trigger when 30% of the component is visible
  });

  const [countUpTriggered, setCountUpTriggered] = useState(false);

  useEffect(() => {
    if (inView) {
      setCountUpTriggered(true);
    }
  }, [inView]);

  const statsData = [
    { value: 8, label: t("stats.experience"), color: "pink" },
    { value: 500, label: t("stats.successful_students"), color: "lime" },
    { value: 15, label: t("stats.staff_members"), color: "teal" },
  ];

  return (
    <section
      ref={ref}
      className="duration-300 container flex flex-wrap justify-center gap-12 sm:gap-20 2xl:gap-40 items-start p-4 bg-primary text-secondary">
      {statsData.map((stat, index) => {
        const pink = stat.color === "pink";
        const lime = stat.color === "lime";
        const teal = stat.color === "teal";
        return (
          <div
            key={index}
            className={`flex flex-col text-center items-center duration-300 shadow-md ${
              pink && "shadow-pink-500"
            } ${lime && "shadow-lime-500"} ${
              teal && "shadow-teal-500"
            } sm:hover:shadow-md pb-3 sm:shadow-none ${
              pink && "sm:hover:shadow-pink-500"
            } ${lime && "sm:hover:shadow-lime-500"} ${
              teal && "sm:hover:shadow-teal-500"
            } rounded-3xl border-t-2 ${pink && "border-pink-500"} ${
              lime && "border-lime-500"
            } ${teal && "border-teal-500"} px-5 w-3/4 sm:max-w-72`}>
            <h2 className="text-6xl font-bold text-accent2 mt-2">
              {countUpTriggered ? (
                <CountUp
                  start={1} // Start from 1
                  end={stat.value}
                  suffix="+"
                  duration={4}
                />
              ) : (
                <span>{stat.value}</span> // Display the static value if not triggered
              )}
            </h2>
            <h3 className="text-lg sm:text-xl mt-2">{stat.label}</h3>
          </div>
        );
      })}
    </section>
  );
};

export default Stats;
