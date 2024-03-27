import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { paths } from "../../../routes/paths";
const Enrollments = ({ data }) => {
  const navigate = useNavigate();

  const handleSelectStudent = (user) => {
    navigate(`${paths.instructor.show.student}/${user.id}`);
  };

  return (
    <>
      <Helmet>
        <title>Course Info: Enrollments</title>
      </Helmet>
      <div>
        <table className="w-full rounded-lg shadow-md">
          <thead className=" dark:text-dark">
            <tr className="border-b bg-secondary">
              <th className="p-4 font-semibold text-[24px] tracking-tight items-start justify-start flex ">
                Full name
              </th>
              <th className="p-4 font-semibold text-[24px] tracking-tight text-left">
                Enroll Date
              </th>
              <th className="py-4 font-semibold text-[24px] tracking-tight flex ">
                Country
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleSelectStudent(user)}
                className="hover:bg-gray-300 dark:hover:text-dark transition duration-200 ease-in-out cursor-pointer"
              >
                <td className="p-4 flex items-center">
                  <img
                    src={user.picture}
                    alt={user.first_name}
                    className="h-16 w-16 rounded-full mr-4"
                  />
                  <span className="text-[24px] tracking-tight">
                    {user.first_name} {user.last_name}
                  </span>
                </td>
                <td className="p-4 text-[24px] text-accent tracking-tight text-left">
                  {user.enroll_date}
                </td>
                <td className="p-4 text-[24px] tracking-tight">
                  {user.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Enrollments;
