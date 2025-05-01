import React from "react";
import { useTranslation } from "react-i18next";
import Title from "../../components/Title/Title";
import teacher from "/Mamura_Yuldasheva.jpg";

const WhyUs = () => {
  const { t } = useTranslation("home");

  return (
    <section className="duration-300 bg-primary text-secondary container py-10 sm:py-20">
      <Title title={t("whyUs.title")} description={t("whyUs.description")} />
      <div className="py-12 flex flex-col xl:flex-row items-center justify-center gap-10 sm:gap-20">
        <div className="flex flex-col gap-16 xl:gap-32 sm:w-96 items-center xl:items-end">
          {t("whyUs.features", { returnObjects: true })
            .slice(0, 2)
            .map((feature, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                key={index}
                className="flex flex-col text-center items-center xl:items-end max-w-80 xl:text-end gap-2">
                <div className="flex flex-col-reverse xl:flex-row items-center gap-3 text-center">
                  <h3 className="xl:whitespace-nowrap font-medium text-lg text-main dark:text-accent2">
                    {feature.title}
                  </h3>
                  <img
                    width={50}
                    src={feature.img}
                    alt="icon"
                    className="shadow-md sm:shadow-sm shadow-accent2 p-2 border border-accent2 rounded-full"
                  />
                </div>
                <p className="text-[13px] opacity-90">{feature.description}</p>
              </div>
            ))}
        </div>
        <div
          data-aos="zoom-out"
          className="border-4 dark:border-secondary rounded-2xl shadow-lg shadow-accent2">
          <img
            width={300}
            className="rounded-xl border-4 border-[#f4ce73] w-[250px] lg:w-[300px]"
            src={teacher}
            alt="Mamura Yuldasheva"
          />
        </div>
        <div className="flex flex-col gap-16 xl:gap-32 sm:w-96 items-center xl:items-start">
          {t("whyUs.features", { returnObjects: true })
            .slice(2)
            .map((feature, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                key={index}
                className="flex flex-col text-center items-center xl:items-start max-w-80 xl:text-start gap-2">
                <div className="flex flex-col-reverse xl:flex-row-reverse items-center gap-3 text-center">
                  <h3 className="xl:whitespace-nowrap font-medium text-lg text-main dark:text-accent2">
                    {feature.title}
                  </h3>
                  <img
                    width={50}
                    src={feature.img}
                    alt="icon"
                    className="shadow-md sm:shadow-sm shadow-accent2 p-2 border border-accent2 rounded-full"
                  />
                </div>
                <p className="text-[13px] opacity-90">{feature.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
