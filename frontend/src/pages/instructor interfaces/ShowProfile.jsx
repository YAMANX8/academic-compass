import React, { useState, useEffect } from "react";
import Imagesww from "../../assets/images/AI.svg";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ShowProfile = () => {
  const { id } = useParams();

  const [data, setData] = useState([
    {
      id: 1,
      first_name: "Ahmed",
      last_name: "omar",
      email: "ahmed.omar@example.com",
      education: "Bachelor's in Computer Science",
      country: "Syria",
      city: "Damascus",
      birth_date: "2000-01-01",
      bio: "Ahmed is a passionate software a passionate software engineer with 5 years of  experience in web developmenthmed is a passionate software engineer with 5 years of experience in.",
      picture: "image path for Ahmed",
    },
    {
      id: 2,
      first_name: "Ammar",
      last_name: "Al-Esrawi",
      email: "ammar.esrawi@example.com",
      education: "Master's in Software Engineering",
      country: "Syria",
      city: "Aleppo",
      birth_date: "2000-10-15",
      bio: "Ammar specializes in backend development and has contributed to multiple open-source projects.",
      picture: "image path for Ammar",
    },
    {
      id: 3,
      first_name: "Yaman",
      last_name: "Al-Jazzer",
      email: "yaman.jazzer@example.com",
      education: "Bachelor's in Information Technology",
      country: "Syria",
      city: "Homs",
      birth_date: "2000-12-10",
      bio: "Yaman is a full-stack developer with a keen interest in cloud computing.",
      picture: "image path for Yaman",
    },
    {
      id: 4,
      first_name: "Ahmad",
      last_name: "Sadek",
      email: "ahmad.sadek@example.com",
      education: "PhD in Artificial Intelligence",
      country: "Syria",
      city: "Latakia",
      birth_date: "2000-03-05",
      bio: "Ahmad is a researcher focused on machine learning and its applications in the real world.",
      picture: "image path for Ahmad",
    },
  ]);
  //   useEffect(() => {
  //     axios.get(`https://your-backend-url.com/student طظ `, {
  //         params: {
  //             first_name: student.first_name,
  //             last_name: student.last_name
  //         }
  //     })
  //     .then(response => {
  //         console.log("Fetched student data:", response.data);
  //         setDisplayedStudent(response.data);
  //     })
  //     .catch(error => console.error("Error fetching student data:", error));
  // }, [student]);

  const [displayedStudent, setDisplayedStudent] = useState(null);

  useEffect(() => {
    console.log("Looking for student with ID:", id);
    const matchingStudent = data.find((suii) => suii.id === parseInt(id));
    console.log("Full data:", data);
    console.log("ID from useParams:", id);
    console.log("Matching student:", matchingStudent);
    setDisplayedStudent(matchingStudent);
  }, [id, data]);

  if (!displayedStudent) return <div>No student found with the given ID.</div>;

  return (
    <>
      <Helmet>
        <title>Student Profile</title>
      </Helmet>
      <div className="flex p-4">
        <div className="flex flex-1 border rounded shadow">
          <div className="p-[32px]">
            <img
              src={Imagesww}
              alt={displayedStudent.first_name}
              className="w-[300px] h-[300px] rounded-full"
            />
            <h2 className="text-[32px] pt-[65px]  font-medium text-accent items-center justify-center flex">
              {displayedStudent.first_name} {displayedStudent.last_name}
            </h2>
          </div>

          <ul className="p-[32px] space-y-4 text-[24px] items-center justify-center flex-1">
            <li>
              <strong>ID:</strong> {displayedStudent.id}
            </li>
            <li>
              <strong>Email:</strong> {displayedStudent.email}
            </li>
            <li>
              <strong>Education:</strong> {displayedStudent.education}
            </li>
            <li>
              <strong>Country:</strong> {displayedStudent.country}
            </li>
            <li>
              <strong>City:</strong> {displayedStudent.city}
            </li>
            <li>
              <strong>Birth Date:</strong> {displayedStudent.birth_date}
            </li>
            <li>
              <strong>bio:</strong>
              <br /> {displayedStudent.bio}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShowProfile;
