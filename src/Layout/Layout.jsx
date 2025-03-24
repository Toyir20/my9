import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "../components/Loading/Loading";
import "./Layout.css"
import { getData } from '../api/api';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    getData(`notification/`)
      .then((response) => {
        setActive(response?.data?.data?.is_active);
        console.log(response)
      })
      .catch((error) => {
        // console.log('Xato:', error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {active === true ? <div className="notification-bar">
            🚧 Saytda profilaktika ishlari olib borilmoqda 🚧
          </div>

            :
            ""}

          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
