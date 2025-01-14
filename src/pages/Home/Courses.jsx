import React from "react";
import Title from "../../components/Title/Title";
import check_icon from "/check_icon.svg";
import { useTranslation } from "react-i18next";

const Courses = () => {
  const { t } = useTranslation("home");
  const lang = localStorage.getItem("language");

  const courses = [
    {
      id: 1,
      title: t("courses.generalEnglish.title"),
      features: [
        t("courses.generalEnglish.features.feature1"),
        t("courses.generalEnglish.features.feature2"),
        t("courses.generalEnglish.features.feature3"),
        t("courses.generalEnglish.features.feature4"),
      ],
    },
    {
      id: 2,
      title: t("courses.ieltsStandard.title"),
      features: [
        t("courses.ieltsStandard.features.feature1"),
        t("courses.ieltsStandard.features.feature2"),
        t("courses.ieltsStandard.features.feature3"),
        t("courses.ieltsStandard.features.feature4"),
        t("courses.ieltsStandard.features.feature5"),
      ],
    },
    {
      id: 3,
      title: t("courses.intensiveSpeaking.title"),
      features: [
        t("courses.intensiveSpeaking.features.feature1"),
        t("courses.intensiveSpeaking.features.feature2"),
        t("courses.intensiveSpeaking.features.feature3"),
        t("courses.intensiveSpeaking.features.feature4"),
        t("courses.intensiveSpeaking.features.feature5"),
      ],
    },
    {
      id: 4,
      title: t("courses.teacherTraining.title"),
      features: [
        t("courses.teacherTraining.features.feature1"),
        t("courses.teacherTraining.features.feature2"),
        t("courses.teacherTraining.features.feature3"),
        t("courses.teacherTraining.features.feature4"),
        t("courses.teacherTraining.features.feature5"),
        t("courses.teacherTraining.features.feature6"),
      ],
    },
  ];

  return (
    <section id="courses" className="container">
      <Title
        title={t("courses.title")}
        description={t("courses.description")}
      />
      <div className="my-10 flex flex-row items-center justify-center flex-wrap gap-10">
        {courses.map((course, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={100 * (index + 1)}
            className={`w-80 xl:w-72 relative shadow-lg shadow-accent1 ${lang == "uk" ? "h-[450px]" : "h-[520px]"} border-2 border-accent2 p-5 rounded-xl`}>
            <h5 className="text-center text-accent2 text-2xl font-semibold mb-5">
              {course.title}
            </h5>
            <ul className="flex flex-col items-start gap-2">
              {course.features.map((feature, idx) => (
                <li key={idx} className="flex flex-row items-start gap-2">
                  <img width={30} src={check_icon} alt="checked-icon" />
                  <p className="text-sm opacity-90">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="absolute bottom-5 left-7 w-4/5 rounded-xl bg-main flex items-center justify-center border-2 border-accent1 shadow-lg hover:bg-accent1 text-primary dark:text-secondary hover:text-primary duration-300 cursor-pointer active:scale-[0.98]">
              <button className="py-2 px-1 text-sm">
                <a href="https://t.me/my9lc_admin">  {t("courses.signUpButton")}</a>
              
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
