import React, { useEffect, useState } from "react";
import ThemeSwitcher from "../utils/Theme/ThemeSwitcher";
import LanguageSwitcher from "../utils/i18n/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Menu, Phone, PhoneCall, X, LogIn, CircleUserRound, LogOut } from "lucide-react";
import useThemeStore from "../utils/Theme/Theme";
import { useLocation } from "react-router-dom";

import {
  Drawer,
  Button,
  List,
  ListItem,
} from "@material-tailwind/react";
import { FaFacebook, FaTelegram, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../components/Logo/Logo";

const Header = () => {
  const { t } = useTranslation("layout");
  const { theme } = useThemeStore();
  const isDarkMode = theme === "dark";
  const location = useLocation();
  // LocalStorage'dan token o'qish
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Token mavjud bo'lsa true, aks holda false
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload()
  }

  console.log(location.pathname)
  const links =
    location.pathname === "/profile"
      ? [
        {
          text: "Contact Manager",
          scroll_to: "https://t.me/my9_manager",
          icon: "https://www.svgrepo.com/show/67982/telephone.svg",
        },
      ]
      : [
        {
          text: t("header.teachers"),
          scroll_to: "",
          icon: "https://www.svgrepo.com/show/493523/teacher-male.svg",
        },
        {
          text: t("header.courses"),
          scroll_to: "courses",
          icon: "https://www.svgrepo.com/show/382165/book-shelf-books-education-learning-school-study.svg",
        },
        {
          text: t("header.results"),
          scroll_to: "",
          icon: "https://www.svgrepo.com/show/324120/graduation-education-cap-mortarboard-graduate.svg",
        },
        {
          text: t("header.contact"),
          scroll_to: "contact",
          icon: "https://www.svgrepo.com/show/67982/telephone.svg",
        },
      ];

  const socialLinks = [
    {
      href: "https://t.me/my9_lc",
      label: "Telegram",
      icon: <FaTelegram />,
      duration: 200,
    },
    {
      href: "https://www.facebook.com/profile.php?id=61559184362290",
      label: "Facebook",
      icon: <FaFacebook />,
      duration: 400,
    },
    {
      href: "https://www.instagram.com/my9_lc/?hl=en",
      label: "Instagram",
      icon: <FaInstagram />,
      duration: 600,
    },
    {
      href: "https://www.youtube.com/@my9_lc",
      label: "YouTube",
      icon: <FaYoutube />,
      duration: 800,
    },
  ];

  const [scrolled, setScrolled] = useState(false); // adding shadow to the header when scrolled

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`duration-300 sticky top-0 w-full z-30 py-5 bg-primary text-secondary ${scrolled ? "shadow-sm shadow-main" : ""
        }`}>
      <div className="flex flex-row items-center justify-between container">
        <Link to="/" aria-label="Go home" title="MY9 Learning Center">
          <Logo />
        </Link>
        <nav className="hidden lg:flex">
          <ul className="flex flex-row items-center gap-7 text-lg">
            {links.map((link, index) => (
              <li key={index} data-aos="zoom-out">
                <a
                  // href={
                  //   link.scroll_to === "login" || link.scroll_to === "profile"
                  //     ? `${link.scroll_to}`
                  //     : `#${link.scroll_to}`
                  // }
                  href={
                    link.text === "Contact Manager"
                      ? link.scroll_to // To‘g‘ridan-to‘g‘ri Telegram URL ishlatiladi
                      : link.scroll_to === "login" || link.scroll_to === "profile"
                        ? `${link.scroll_to}`
                        : `#${link.scroll_to}`
                  }
                  className="duration-200 hover:text-accent2 border-b-2 pb-[2px] border-transparent hover:border-accent2">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-row items-center gap-2 sm:gap-5">
          <div className="hidden sm:flex flex-row gap-5 items-center">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          <a href={
            location.pathname == "/profile" ? "tel:+998953443434" : "tel:+998955555539"
          }>
            <button className="relative hidden lg:inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#007f7f_0%,#009494_50%,#00b3b3_100%)]"></span>
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-transparent px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
                <Phone
                  size={17}
                  className="animate-wiggle animate-infinite animate-duration-1000 animate-ease-out"
                />
                {
                  location.pathname == "/profile" ? "+998 95 344 34 34" : "+998 95 555 55 39"
                }

              </span>
            </button>
            <Button
              aria-label="call"
              className="flex lg:hidden duration-500 relative p-2 rounded-md bg-accent2 isolation-auto z-10 border-2 border-main">
              <PhoneCall
                size={15}
                className="animate-wiggle-more animate-infinite animate-duration-1000 animate-ease-out"
              />
            </Button>
          </a>
          {isLoggedIn ? (
            <div style={{ display: "flex" }}>
              <a href="/profile">
                <button className="relative hidden lg:inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#007f7f_0%,#009494_50%,#00b3b3_100%)]"></span>
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-transparent px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
                    <CircleUserRound
                      size={17}
                      className="animate-wiggle animate-infinite animate-duration-1000 animate-ease-out"
                    />
                    My Dashboard
                  </span>
                </button>
                <Button
                  aria-label="call"
                  className="flex lg:hidden duration-500 relative p-2 rounded-md bg-accent2 isolation-auto z-10 border-2 border-main">
                  <CircleUserRound
                    size={15}
                    className="animate-wiggle-more animate-infinite animate-duration-1000 animate-ease-out"
                  />
                </Button>
              </a>
              <a onClick={logout} style={{ marginLeft: "17px" }}>
                <button className="relative hidden lg:inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#007f7f_0%,#009494_50%,#00b3b3_100%)]"></span>
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-transparent px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
                    <LogOut
                      size={17}
                      className="animate-wiggle animate-infinite animate-duration-1000 animate-ease-out"
                    />
                    Log out
                  </span>
                </button>
                <Button
                  aria-label="call"
                  className="flex lg:hidden duration-500 relative p-2 rounded-md bg-accent2 isolation-auto z-10 border-2 border-main">
                  <LogOut
                    size={15}
                    className="animate-wiggle-more animate-infinite animate-duration-1000 animate-ease-out"
                  />
                </Button>
              </a>
            </div>
          ) : (
            <a href="/login">
              <button className="relative hidden lg:inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#007f7f_0%,#009494_50%,#00b3b3_100%)]"></span>
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-transparent px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
                  <LogIn
                    size={17}
                    className="animate-wiggle animate-infinite animate-duration-1000 animate-ease-out"
                  />
                  Course Login
                </span>
              </button>
              <Button
                aria-label="call"
                className="flex lg:hidden duration-500 relative p-2 rounded-md bg-accent2 isolation-auto z-10 border-2 border-main">
                Course Login
              </Button>
            </a>
          )}
          <div className="flex lg:hidden cursor-pointer">
            <Sidebar
              links={links}
              socialLinks={socialLinks}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

export function Sidebar({ links, socialLinks, isDarkMode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-20"></div>
      )}
      <button className="p-1" onClick={toggleDrawer}>
        <Menu size={30} color="#009494" />
      </button>
      <Drawer
        overlay={false}
        size={340}
        className="overflow-y-scroll h-screen bg-primary text-secondary border-l border-accent2"
        open={open}
        onClose={toggleDrawer}
        placement="right">
        <div className="relative py-5 flex flex-row items-center justify-between px-4">
          <Link to="/" aria-label="Go home" title="MY9 Learning Center">
            <Logo />
          </Link>
          <X
            className="bg-transparent border border-accent2 rounded-full p-1 active:opacity-50"
            color="#00b3b3"
            onClick={toggleDrawer}
          />
        </div>
        <List className="!font-exo flex flex-col items-start gap-2">
          {links.map((link, index) => (
            <ListItem
              key={index}
              className="shadow-sm shadow-accent2 dark:text-secondary dark:hover:text-primary">
              <a
                // href={
                //   link.scroll_to === "login" || link.scroll_to === "profile"
                //     ? `${link.scroll_to}`
                //     : `#${link.scroll_to}`
                // }
                href={
                  link.text === "Contact Manager"
                    ? link.scroll_to // To‘g‘ridan-to‘g‘ri Telegram URL ishlatiladi
                    : link.scroll_to === "login" || link.scroll_to === "profile"
                    ? `${link.scroll_to}`
                    : `#${link.scroll_to}`
                }
                onClick={toggleDrawer}
                className="w-full h-full flex flex-row items-center gap-3">
                <img width={25} src={link.icon} alt={link.text} />
                {link.text}
              </a>
            </ListItem>
          ))}
          <ListItem
            ripple={false}
            className="active:bg-transparent hover:bg-transparent focus:bg-transparent my-4">
            <span className="bg-accent1 h-[0.5px] w-full"></span>
          </ListItem>
          <ListItem
            ripple={false}
            className="active:bg-transparent hover:bg-transparent focus:bg-transparent shadow-sm shadow-accent2 dark:text-secondary dark:hover:text-primary">
            <div className="flex flex-row items-center justify-between w-full">
              <ThemeSwitcher sidebar={true} />
              <span className="h-10 w-[2px] bg-accent1 rounded-xl"></span>
              <LanguageSwitcher sidebar={true} />
            </div>
          </ListItem>
          <ListItem
            ripple={false}
            className="active:bg-transparent flex flex-col justify-center hover:bg-transparent focus:bg-transparent shadow-sm shadow-accent2 dark:text-secondary dark:hover:text-primary">
            <div className="flex items-center gap-12">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  target="_blank"
                  href={social.href}
                  aria-label={social.label}>
                  {React.cloneElement(social.icon, {
                    className: `size-7 !duration-[${social.duration}ms] animate-pulse text-main hover:text-accent1 hover:scale-110`,
                  })}
                </a>
              ))}
            </div>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
