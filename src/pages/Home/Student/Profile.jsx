import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import "./Profile.css"
import { getData } from '../../../api/api';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import FileRenderer from './FileRenderer';
const Student = () => {

  const [activeIndex, setActiveIndex] = useState(null); // Accordion boshqaruvi
  const [modalContent, setModalContent] = useState(null); // Modal ma'lumotlari
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holati
  const [studentData, setStudentData] = useState([])
  const [studentCourse, setStudentCourse] = useState([])
  const [lessonFiles, setLessonFiles] = useState([])
  const [selectedLesson, setSelectedLesson] = useState([])
  const [courseLessons, setCourseLessons] = useState([])



  const getSelectedLesson = (id) => {
    getData(`students/lessons/${id}`).then((res) => {
      setSelectedLesson(res?.data?.data)
      console.log(res?.data?.data, "lessondatasi")
    })
  }
  const toggleAccordion = (index, id) => {
    console.log(id)
    getData(`students/courses/${id}/lessons`)
      .then((response) => {
        setCourseLessons(response.data.data)
        console.log(courseLessons)
      })
      .catch((error) => {
        // console.log('Xato:', error);
      });
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openModal = (content, files) => {
    console.log(files);
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
        console.log(response, "me")
      })
      .catch((error) => {
        // console.log('Xato:', error);
      });
    getData(`students/courses`)
      .then((response) => {
        setStudentCourse(response.data.data)
        console.log(response.data.data)
      })
      .catch((error) => {
        // console.log('Xato:', error);
      });

  }

  useEffect(() => {
    a()
  }, [])

  // dropdown

  const [isOpen, setIsOpen] = useState(false);

  const openStudentModal = () => {
    setIsOpen(true);
  };
  const closeStudentModal = () => {
    setIsOpen(false);
  };
  const [timeLimet, setTimelimet] = useState(0)
  return (
    <>
      <div className="course-container">
        <div className="header">
          <div >
            <div className="dropdown-container">
              <div className="dropdown-header" onClick={openStudentModal}>
                {`Welcome, ${studentData?.first_name} ${studentData?.last_name}`}

              </div>
              {isOpen && (
                <div className="modal-user">
                  <div className="modal-content">
                    <h2>Student Information</h2>
                    <p><strong>Name:</strong> {studentData?.first_name} {studentData?.last_name}</p>
                    <p><strong>Phone Number:</strong> {studentData?.phone_number}</p>
                    <p><strong>Date of Birth:</strong> {studentData?.birth_date}</p>
                    <p><strong>Date of Registration:</strong> {new Date(studentData?.created_at).toISOString().split('T')[0]}</p>
                    <h3>Courses</h3>
                    <ul>
                      {studentCourse.map((option, index) => (
                        <li key={index}>
                          <span><strong>Course Name:</strong> {option?.title}</span><br />
                          <span><strong>Payment Date:</strong> {option?.payment_date}</span><br />
                          <span><strong>Amount Paid:</strong> {option?.payment_amount}</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={closeStudentModal}>Close</button>
                  </div>
                </div>
              )}
              <i className="title">Assistant working hours:  Monday - Saturday 9 am - 6 pm</i>
            </div>
          </div>
        </div>
        {/* <div className="header">
          <i className="title">Ish vaqti dushanbadan-shanbagacha, soat 9:00 - 18:00 oralig’ida</i>
        </div> */}

        <h2>All Courses</h2>
        {studentCourse?.map((item, index) => (
          <div className="accordion" key={index}>
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(index, item.id)}
            >

              <h3 style={{ marginRight: "10px" }}>{item.title}</h3>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "10px" }}>Course end date {item?.expiry_date}</p>
                <span>{activeIndex === index ? "-" : "+"}</span>
              </div>

            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                {courseLessons?.map((lesson, index) => (
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
            {
              selectedLesson?.media == null ? <div className="modal-content">
                <div className="modal-video-container">
                  {/* {console.log(selectedLesson?.tasks[0]?.time_limit,"ljjhjk")} */}
                  <p className="modal-title"><span>{selectedLesson?.title}</span>
                    <span>
                      {selectedLesson?.tasks?.map((files, index) => (
                        <div key={index}>
                          <Timer initialSeconds={files.time_limit || null} />
                        </div>
                      ))}

                    </span>
                  </p>
                  <div className="modal-question-file">

                    {/* {selectedLesson?.tasks?.map((files, index) => (
                      <div className='render-file' key={index}>
                        {console.log(files, "fil")}
                        {files?.files?.map((file, index) => (
                          <div key={index} className='all-files-map'>

                            Rasmni chiqarish
                            {file.type === "image" && (
                              <img
                                src={file.file}
                                alt={file.name}
                                style={{ width: "50%", objectFit: "cover", borderRadius: "10px" }}
                              />
                            )}

                            Audio chiqishi
                            {file.type === "audio" && <audio controls src={file.file} style={{ width: "50%", margin: "10px" }}></audio>}

                            PDF chiqishi
                            {file.type === "pdf" && (
                              <div style={{ border: "1px solid #ccc", overflow: "hidden", borderRadius: "10px", width: "100%", margin: "10px" }}>
                                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                                  <Viewer fileUrl={file.file} />
                                </Worker>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))} */}

                    {selectedLesson?.tasks?.map((files, index) => (
                      <div className='render-file' key={index}>
                        {files?.files?.map((file, index) => (
                          <FileRenderer key={index} file={file} />
                        ))}
                      </div>
                    ))}


                  </div>
                  <a href={`https://t.me/+${studentData?.assistant?.phone_number}`}>Submit Tasks to Mentor</a>
                </div>
                <span className="close-button" onClick={closeModal}>
                  &times;
                </span>
              </div>
                :
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
                                <li key={index}>
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
                    {/* <a href={`https://t.me/+${studentData?.assistant?.phone_number}`}>Submit Tasks to Mentor</a> */}
                  </div>
                  <span className="close-button" onClick={closeModal}>
                    &times;
                  </span>
                </div>
            }
          </div>
        )}



      </div>

    </>
  );
};



export default Student;

