import React, { useEffect, useState } from 'react';
import "./Profile.css"
// import { baseUrl } from '../../../constants/base-url';
import { Button } from '@material-tailwind/react';
let token = localStorage.getItem("token");
import { getData } from '../../../api/api';
const Student = () => {

  const [activeIndex, setActiveIndex] = useState(null); // Accordion boshqaruvi
  const [modalContent, setModalContent] = useState(null); // Modal ma'lumotlari
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holati
  const [studentData, setStudentData] = useState([])
  const [studentCourse, setStudentCourse] = useState([])
  const [lessonFiles, setLessonFiles] = useState([])
  const [selectedLesson, setSelectedLesson] = useState([])

  const getSelectedLesson = (id) => {
    getData(`students/lessons/${id}`).then((res) => {

      setSelectedLesson(res?.data?.data)
    })
  }
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openModal = (content, files) => {
    getSelectedLesson(files.id)
    setLessonFiles(files)
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  const a = () => {

    getData(`users/me`)
      .then((response) => {
        setStudentData(response.data.data)
        setStudentCourse(response.data.data.courses)
      })
      .catch((error) => {
        // console.log('Xato:', error);
      });
  }

  useEffect(() => {
    a()
  }, [])
  const logout = () => {
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
                    onClick={() => lesson?.is_open && openModal(lesson?.title, lesson)}
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
            href={`https://t.me/+${studentData?.assistant?.phone_number}`}>
            {studentData?.assistant?.first_name == undefined ? " " : `${studentData?.assistant?.first_name}, ${studentData?.assistant?.last_name}`} </a> </p>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-video-container">
                <p className="modal-title">{selectedLesson?.title}</p>
                <div className="embed-container">
                  <iframe width="100%" height="355" src={`https://play.boomstream.com/${selectedLesson?.media}&hash=${selectedLesson?.hash}`} frameborder="0" scrolling="no" allowfullscreen=""></iframe>
                </div>
                <div className="modal-question">
                  <ul>
                    {
                      selectedLesson?.files?.length == 0 ? <p style={{ color: "red", fontSize: "18px", margin: "10px 0" }}>
                        No tasks for this lesson
                      </p>
                        :
                        selectedLesson?.files?.map((item, index) => {
                          return (
                            <li  key={index}>
                              <a
                                
                                style={{ display: "flex", alignItems: "center" }}
                                href={item?.file}
                                download
                                className="task-link"
                              >
                                {item?.name}
                              </a>
                            </li>
                          )
                        })
                    }
                  </ul>
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
