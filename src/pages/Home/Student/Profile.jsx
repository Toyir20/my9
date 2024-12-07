import React, { useEffect, useState } from 'react';
import "./Profile.css"
import axios from 'axios';
import { baseUrl } from '../../../constants/base-url';
import { Button } from '@material-tailwind/react';
let token = localStorage.getItem("token");
const Student = () => {

  const [activeIndex, setActiveIndex] = useState(null); // Accordion boshqaruvi
  const [modalContent, setModalContent] = useState(null); // Modal ma'lumotlari
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holati
  const [studentData, setStudentData] = useState([])
  const [studentCourse, setStudentCourse] = useState([])

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  // const courses = ["Reading", "Listening", "Speaking", "Writing"];

  const test = () => {
    axios.get(`${baseUrl}users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Tokenni kiritish kerak
        'Accept': '*/*',
        "Content-Type": "application/json"                         // Har qanday formatni qabul qilish
      }
    })
      .then((response) => {
        setStudentData(response.data.data)
        setStudentCourse(response.data.data.courses)
      })
      .catch((error) => {
        console.log('Xato:', error);
      });
  }
  useEffect(() => {
    test()
  }, [])
  const logout =()=>{
    localStorage.removeItem("token");
    location.reload()
  }

  return (
    <>
      <div className="course-container">
        <div className="header">
          <h1 className="title">Welcome, {`${studentData?.first_name}  ${studentData?.last_name}`}</h1>
        </div>
        <h2>All Courses</h2>
        {studentCourse?.map((item, index) => (
          <div className="accordion" key={index}>
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <h3>{item.title}</h3>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                {item.lesson.map((lesson, index) => (
                  <p
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      pointerEvents: lesson?.is_open ? "auto" : "none", // Disabled qilish
                      opacity: lesson?.is_open ? 1 : 0.5, // Disabled ko'rinishi
                      cursor: lesson?.is_open ? "pointer" : "not-allowed", // Ko'rsatkich kursori
                    }}
                    onClick={() => lesson?.is_open && openModal(lesson?.title)}
                  >
                    {lesson?.title}
                    {lesson?.is_open ? (
                      <i className="fa-solid fa-unlock"></i>
                    ) : (
                      <i className="fa-solid fa-lock"></i>
                    )}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        <div>
          <p>Telegram profile of your assistant <a style={{ textDecoration: "underline", color: "rgb(0, 148, 148)" }}
            href={`https://t.me/${studentData?.assistant?.phone_number}`}>
            {studentData?.assistant?.first_name == undefined ? " " : `${studentData?.assistant?.first_name}, ${studentData?.assistant?.last_name}`} </a> </p>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className='modal-video-container'>
                <p className='modal-title'>{modalContent}</p>
                <video controls src="https://media"></video>
                <p style={{ fontSize: "25px" }}>Tasks</p>
                <div className='modal-question'>
                  <ol type='1'>
                    <li>Task 1 for Lesson 1</li>
                    <li>Task 2 for Lesson 1</li>
                    <li>Task 3 for Lesson 1</li>
                  </ol>
                </div>
                <a href={`https://t.me/${studentData?.assistant?.phone_number}`}>Submit Tasks to Mentor</a>
              </div>
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
            </div>
          </div>
        )}

        <Button onClick={logout}>Log out</Button>
      </div>

    </>
  );
};



export default Student;
