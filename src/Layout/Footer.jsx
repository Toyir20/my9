import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTelegram, FaYoutube, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Logo from "../components/Logo/Logo";

const Footer = () => {
  const { t } = useTranslation("layout");

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const contactInfo = [
    {
      label: t("footer.phone"),
      value: "+998 95 555 55 37",
      href: "tel:+998955555537",
    },
    {
      label: t("footer.email"),
      value: "my9learningcenter@gmail.com",
      href: "mailto:my9learningcenter@gmail.com",
    },
    {
      label: t("footer.address"),
      value: t("footer.address_info"),
      href: "https://www.google.com/maps/place/MY9+Learning+Center/@41.2941213,69.2220996,17z/data=!3m1!4b1!4m6!3m5!1s0x38ae8b00610f645b:0x7b8ed4724ba19468!8m2!3d41.2941173!4d69.2246745!16s%2Fg%2F11vq2yt_yr?entry=ttu",
    },
  ];

  return (
    <footer className="duration-300 px-4 pt-16 mx-auto container bg-primary text-secondary">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link
            to="/"
            aria-label="Go home"
            title="MY9 Learning Center"
            className="inline-flex items-center">
            <Logo footer={true} />
            <span className="ml-2 text-xl font-bold tracking-wide text-main uppercase">
              Learning Center
            </span>
          </Link>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm">{t("footer.welcome_message")}</p>
            <p className="mt-4 text-sm">{t("footer.join_us")}</p>
          </div>
        </div>
        <address className="space-y-2 text-sm not-italic">
          <p className="text-base font-bold tracking-wide text-accent2">
            {t("footer.contacts")}
          </p>
          {contactInfo.map((contact, index) => (
            <div key={index} className="flex">
              <p className="mr-1">{contact.label}</p>
              <a
                href={contact.href}
                aria-label={contact.label}
                title={contact.label}
                className="transition-colors duration-300 text-main hover:text-accent1">
                {contact.value}
              </a>
            </div>
          ))}
        </address>
        <div>
          <span className="text-base font-bold tracking-wide text-accent2">
            {t("footer.social")}
          </span>
          <div className="flex items-center mt-2 space-x-3">
            <a
              href="https://t.me/my9_lc"
              className="text-secondary transition-colors duration-300 hover:text-accent2">
              <FaTelegram size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61559184362290"
              className="text-secondary transition-colors duration-300 hover:text-accent2">
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/my9_lc/?hl=en"
              className="text-secondary transition-colors duration-300 hover:text-accent2">
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@my9_lc"
              className="text-secondary transition-colors duration-300 hover:text-accent2">
              <FaYoutube size={20} />
            </a>
          </div>
          <p className="mt-2 text-sm">{t("footer.follow_us")}</p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between py-5 border-t border-accent2 lg:flex-row">
        <p className="text-sm">
          © {currentYear} MY9 Learning Center. {t("footer.rights_reserved")}
        </p>
        {/* <h6 className="text-sm mb-3 sm:mb-0">
          Made by{" "}
          <a className="text-accent2 underline" href="https://www.uzakoff.uz/">
            Uzakoff
          </a>
        </h6> */}
        {/* <Link
          to="/"
          className="mb-3 sm:mb-0 max-w-fit text-sm duration-200 hover:text-accent2 border-b-2 pb-[2px] border-transparent hover:border-accent2">
          {t("footer.public_offer")}
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;
