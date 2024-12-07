import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Title from "../../components/Title/Title";
import { useTranslation } from "react-i18next";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const FAQ = () => {
  const { t } = useTranslation("home");
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="container pt-10">
      <Title title={t("faq.title")} description={t("faq.description")} />
      <div className="px-5 lg:px-20 py-5 lg:py-10">
        {t("faq.questions", { returnObjects: true }).map((item, index) => (
          <Accordion
            key={index}
            open={open === index + 1}
            icon={<Icon id={index + 1} open={open} />}>
            <AccordionHeader
              className="duration-300 text-base sm:text-xl outline-none hover:text-accent2 !font-exo text-secondary"
              onClick={() => handleOpen(index + 1)}>
              {item.question}
            </AccordionHeader>
            <AccordionBody className="!font-exo text-secondary">
              {item.answer}
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
