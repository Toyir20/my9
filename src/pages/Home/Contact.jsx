import React from "react";
import Title from "../../components/Title/Title";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation("home");

  return (
    <section id="contact" className="bg-primary text-secondary container duration-300">
      <div className="max-w-7xl mx-auto pt-5 px-4 sm:px-6 lg:pt-10 lg:px-8">
        <Title
          title={t("contact.title")}
          description={t("contact.description")}
        />
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.6775696626164!2d69.222099575529!3d41.294121301775895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b00610f645b%3A0x7b8ed4724ba19468!2sMY9%20Learning%20Center!5e0!3m2!1sen!2s!4v1725615470240!5m2!1sen!2s"
                width="100%"
                height="480"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div>
              <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold text-accent2">
                    {t("contact.address.title")}
                  </h3>
                  <p className="mt-1 opacity-85">
                    {t("contact.address.line1")}
                  </p>
                  <p className="mt-1 opacity-85">
                    {t("contact.address.line2")}
                  </p>
                </div>
                <div className="border-t border-gray-400 px-6 py-4">
                  <h3 className="text-lg font-semibold text-accent2">
                    {t("contact.hours.title")}
                  </h3>
                  <p className="mt-1 opacity-85">
                    {t("contact.hours.schedule")}
                  </p>
                </div>
                <div className="border-t border-gray-400 px-6 py-4">
                  <h3 className="text-lg font-semibold text-accent2">
                    {t("contact.contacts.title")}
                  </h3>
                  <a
                    href={`mailto:${t("contact.contacts.email")}`}
                    className="mt-1 opacity-85 block">
                    {t("contact.contacts.emailLabel")}:{" "}
                    {t("contact.contacts.email")}
                  </a>
                  <a
                    href={`tel:${t("contact.contacts.phone")}`}
                    className="mt-1 opacity-85">
                    {t("contact.contacts.phoneLabel")}:{" "}
                    {t("contact.contacts.phone")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
