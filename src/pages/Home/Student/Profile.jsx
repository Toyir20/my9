// import React, { useEffect, useState } from 'react';
// import Timer from './Timer';
// import "./Profile.css"
// import { getData } from '../../../api/api';
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import FileRenderer from './FileRenderer';
// import {
//   Button,
// } from "@material-tailwind/react";
// const Student = () => {

//   const [activeIndex, setActiveIndex] = useState(null); // Accordion boshqaruvi
//   const [modalContent, setModalContent] = useState(null); // Modal ma'lumotlari
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal holati
//   const [studentData, setStudentData] = useState([])
//   const [studentCourse, setStudentCourse] = useState([])
//   const [lessonFiles, setLessonFiles] = useState([])
//   const [selectedLesson, setSelectedLesson] = useState([])
//   const [courseLessons, setCourseLessons] = useState([])



//   const getSelectedLesson = (id) => {
//     console.log(id)
//     getData(`students/lessons/${id}`).then((res) => {
//       setSelectedLesson(res?.data?.data)
//       console.log(res?.data?.data, "lessondatasi")
//     })
//   }
//   const toggleAccordion = (index, id) => {

//     getData(`students/courses/${id}/lessons`)
//       .then((response) => {
//         setCourseLessons(response.data.data)
//         console.log(courseLessons)
//       })
//       .catch((error) => {
//         // console.log('Xato:', error);
//       });
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const openModal = (content, files) => {
//     console.log(files);
//     getSelectedLesson(files.id)
//     setLessonFiles(files)
//     setModalContent(content);
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalContent(null);
//     setIsModalOpen(false);
//   };



//   const a = () => {

//     getData(`users/me`)
//       .then((response) => {
//         setStudentData(response.data.data)
//         console.log(response, "me")
//       })
//       .catch((error) => {
//         // console.log('Xato:', error);
//       });
//     getData(`students/courses`)
//       .then((response) => {
//         setStudentCourse(response.data.data)
//         console.log(response.data.data)
//       })
//       .catch((error) => {
//         // console.log('Xato:', error);
//       });

//   }

//   useEffect(() => {
//     a()
//   }, [])

//   // dropdown

//   const [isOpen, setIsOpen] = useState(false);

//   const openStudentModal = () => {
//     setIsOpen(true);
//   };
//   const closeStudentModal = () => {
//     setIsOpen(false);
//   };

//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
  
//     window.addEventListener('resize', handleResize);
  
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden"; // Skrollni o'chirish
//     } else {
//       document.body.style.overflow = "auto"; // Skrollni tiklash
//     }

//     return () => {
//       // Komponent unmount bo'lganda, skrollni tiklash
//       document.body.style.overflow = "auto";
//     };
//   }, [isModalOpen]);
  
//   return (
//     <>
//       <div className="course-container">
//         <div className="header">
//           <div >
//             <div className="dropdown-container">
//               <div className="dropdown-header" onClick={openStudentModal}>
//                 <button className="relative inline-flex lg:inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none">
//                   <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#007f7f_0%,#009494_50%,#00b3b3_100%)]"></span>
//                   <span style={{fontSize: "23px"}} className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-transparent px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
//                     {`Welcome, ${studentData?.first_name} ${studentData?.last_name}`}
//                   </span>
//                 </button>

//               </div>
//               {isOpen && (
//                 <div  className="modal-user">
//                   <div className="modal-content">
//                     <h2>Student Information</h2>
//                     <p><strong>Name:</strong> {studentData?.first_name} {studentData?.last_name}</p>
//                     <p><strong>Phone Number:</strong> {studentData?.phone_number}</p>
//                     <p><strong>Date of Birth:</strong> {studentData?.birth_date}</p>
//                     <p><strong>Date of Registration:</strong> {new Date(studentData?.created_at).toISOString().split('T')[0]}</p>
//                     <h3>Courses</h3>
//                     <ul>
//                       {studentCourse.map((option, index) => (
//                         <li key={index}>
//                           <span><strong>Course Name:</strong> {option?.title}</span><br />
//                           <span><strong>Payment Date:</strong> {option?.payment_date}</span><br />
//                           <span><strong>Amount Paid:</strong> {option?.payment_amount}</span>
//                         </li>
//                       ))}
//                     </ul>
//                     <button onClick={closeStudentModal}>Close</button>
//                   </div>
//                 </div>
//               )}
//               <i className="title">Assistant working hours:  Monday - Saturday 9 am - 6 pm</i>
//             </div>
//           </div>
//         </div>


//         <h2>All Courses</h2>
//         {studentCourse?.map((item, index) => (
//           <div className="accordion" key={index}>
//             <div
//               className="accordion-header"
//               onClick={() => toggleAccordion(index, item.id)}
//             >

//               <h3 style={{ marginRight: "10px" }}>{item.title}</h3>
//               <div style={{ display: "flex" }}>
//                 <p style={{ marginRight: "10px" }}>Course end date {item?.expiry_date}</p>
//                 <span>{activeIndex === index ? "-" : "+"}</span>
//               </div>

//             </div>
//             {activeIndex === index && (
//               <div className="accordion-content">
//                 {courseLessons?.map((lesson, index) => (
//                   <p
//                     key={index}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       pointerEvents: lesson?.is_open ? "auto" : "none", // Disabled qilish
//                       opacity: lesson?.is_open ? 1 : 0.5, // Disabled ko'rinishi
//                       cursor: lesson?.is_open ? "pointer" : "not-allowed", // Ko'rsatkich kursori
//                     }}
//                     onClick={() => lesson?.is_open && openModal(lesson?.title, lesson)}
//                   >
//                     {lesson?.title}
//                     {lesson?.is_open ? (
//                       <i className="fa-solid fa-unlock"></i>
//                     ) : (
//                       <i className="fa-solid fa-lock"></i>
//                     )}
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}

//         <div>
//           <p>Telegram profile of your assistant <a style={{ textDecoration: "underline", color: "rgb(0, 148, 148)" }}
//             href={`https://t.me/+${studentData?.assistant?.phone_number}`}>
//             {studentData?.assistant?.first_name == undefined ? " " : `${studentData?.assistant?.first_name}, ${studentData?.assistant?.last_name}`} </a> </p>
//         </div>

//         {/* Modal */}

//         {isModalOpen && (
//           <div key={windowWidth} className="modal">
//             <div className="modal-content">
//               <div className="modal-video-container">
//                 <p className="modal-title">
//                   <span>{selectedLesson?.title}</span>
//                   {selectedLesson?.tasks?.length > 0 && (
//                     <span className="timer-wrapper">
//                       {selectedLesson.tasks.map((task, index) => (
//                         task?.time_limit && (
//                           <div key={task.id}>
//                             <Timer key={task.id} initialSeconds={task.time_limit} />
//                           </div>
//                         )
//                       ))}
//                     </span>
//                   )}
//                 </p>


//                 {selectedLesson?.media ? (
//                   <>
//                     <div className="embed-container">
//                       <iframe
//                         width="100%"
//                         height="355"
//                         src={`https://play.boomstream.com/${selectedLesson?.media}&hash=${selectedLesson?.media_hash}`}
//                         frameBorder="0"
//                         scrolling="no"
//                         allowFullScreen
//                       ></iframe>
//                     </div>
//                     {selectedLesson?.tasks?.length > 0 && (
//                       <div className="modal-question">
//                         <ul>
//                           {selectedLesson.tasks.map((task, taskIndex) => (
//                             <div key={taskIndex}>
//                               {task.files.map((file, fileIndex) => (
//                                 <li key={fileIndex}>
//                                   <FileRenderer file={file} />
//                                 </li>
//                               ))}
//                             </div>
//                           ))}
//                           <a href={`https://t.me/+${studentData?.assistant?.phone_number}`}>
//                             Submit Tasks to Mentor
//                           </a>
//                         </ul>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     <div className="modal-question-file">
//                       {selectedLesson?.tasks?.map((files, index) => (
//                         <div className="render-file" key={index}>
//                           {files?.files?.map((file, index) => (
//                             <FileRenderer key={index} file={file} />
//                           ))}
//                         </div>
//                       ))}
//                     </div>

//                     <a href={`https://t.me/+${studentData?.assistant?.phone_number}`}>
//                       Submit Tasks to Mentor
//                     </a>
//                   </>
//                 )}
//               </div>
//               <span className="close-button" onClick={closeModal}>&times;</span>
//             </div>
//           </div>
//         )}

//       </div>

//     </>
//   );
// };



// export default Student;

import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import "./Profile.css"
import { getData } from '../../../api/api';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import FileRenderer from './FileRenderer';
import {
  Button,
} from "@material-tailwind/react";

const Student = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [studentCourse, setStudentCourse] = useState([]);
  const [lessonFiles, setLessonFiles] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState([]);
  const [courseLessons, setCourseLessons] = useState([]);

  const getSelectedLesson = (id) => {
    console.log(id);
    getData(`students/lessons/${id}`).then((res) => {
      setSelectedLesson(res?.data?.data);
      console.log(res?.data?.data, "lessondatasi");
    });
  };

  const toggleAccordion = (index, id) => {
    getData(`students/courses/${id}/lessons`)
      .then((response) => {
        setCourseLessons(response.data.data);
        console.log(courseLessons);
      })
      .catch((error) => {});
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openModal = (content, files) => {
    console.log(files);
    getSelectedLesson(files.id);
    setLessonFiles(files);
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
        setStudentData(response.data.data);
        console.log(response, "me");
      })
      .catch((error) => {});
    getData(`students/courses`)
      .then((response) => {
        setStudentCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    a();
  }, []);

  // dropdown

  const [isOpen, setIsOpen] = useState(false);

  const openStudentModal = () => {
    setIsOpen(true);
  };

  const closeStudentModal = () => {
    setIsOpen(false);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Skrollni o'chirish
    } else {
      document.body.style.overflow = "auto"; // Skrollni tiklash
    }

    return () => {
      document.body.style.overflow = "auto"; // Komponent unmount bo'lganda
    };
  }, [isModalOpen]);

  // Modal tashqarisiga bosish orqali yopish uchun qo'shimcha kod
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal')) {
      closeModal(); // Modalni yopish
    }
    else if (event.target.classList.contains('modal-user')) {
      closeStudentModal(); // Modalni yopish
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Modal tashqarisiga bosilsa, modal yopilsin
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Komponent unmount bo'lganda eventni olib tashlash
    };
  }, [isModalOpen]);
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Modal tashqarisiga bosilsa, modal yopilsin
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Komponent unmount bo'lganda eventni olib tashlash
    };
  }, [isOpen]);

  return (
    <>
      <div className="course-container">
        <div className="header">
          <div>
            <div className="dropdown-container">
              <div className="dropdown-header" onClick={openStudentModal}>
                <button className="relative inline-flex lg:inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#007f7f_0%,#009494_50%,#00b3b3_100%)]"></span>
                  <span style={{ fontSize: "23px" }} className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-transparent px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
                    {`Welcome, ${studentData?.first_name} ${studentData?.last_name}`}
                  </span>
                </button>
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
              <i className="title">Assistant working hours: Monday - Saturday 9 am - 6 pm</i>
            </div>
          </div>
        </div>

        <h2>All Courses</h2>
        {studentCourse?.map((item, index) => (
          <div className="accordion" key={index}>
            <div className="accordion-header" onClick={() => toggleAccordion(index, item.id)}>
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
                      pointerEvents: lesson?.is_open ? "auto" : "none",
                      opacity: lesson?.is_open ? 1 : 0.5,
                      cursor: lesson?.is_open ? "pointer" : "not-allowed",
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
          <div key={windowWidth} className="modal">
            <div className="modal-content">
              <div className="modal-video-container">
                <p className="modal-title">
                  <span>{selectedLesson?.title}</span>
                  {selectedLesson?.tasks?.length > 0 && (
                    <span className="timer-wrapper">
                      {selectedLesson.tasks.map((task, index) => (
                        task?.time_limit && (
                          <div key={task.id}>
                            <Timer key={task.id} initialSeconds={task.time_limit} />
                          </div>
                        )
                      ))}
                    </span>
                  )}
                </p>

                {selectedLesson?.media ? (
                  <>
                    <div className="embed-container">
                      <iframe
                        width="100%"
                        height="355"
                        src={`https://play.boomstream.com/${selectedLesson?.media}&hash=${selectedLesson?.media_hash}`}
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                      ></iframe>
                    </div>
                    {selectedLesson?.tasks?.length > 0 && (
                      <div className="modal-question">
                        <ul>
                          {selectedLesson.tasks.map((task, taskIndex) => (
                            <div key={taskIndex}>
                              {task.files.map((file, fileIndex) => (
                                <li key={fileIndex}>
                                  <FileRenderer file={file} />
                                </li>
                              ))}
                            </div>
                          ))}
                          <a href={`https://t.me/+${studentData?.assistant?.phone_number}`}>
                            Submit Tasks to Mentor
                          </a>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="modal-question-file">
                      {selectedLesson?.tasks?.map((files, index) => (
                        <div className="render-file" key={index}>
                          {files?.files?.map((file, index) => (
                            <FileRenderer key={index} file={file} />
                          ))}
                        </div>
                      ))}
                    </div>

                    <a href={`https://t.me/+${studentData?.assistant?.phone_number}`}>
                      Submit Tasks to Mentor
                    </a>
                  </>
                )}
              </div>
              <span className="close-button" onClick={closeModal}>&times;</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Student;
