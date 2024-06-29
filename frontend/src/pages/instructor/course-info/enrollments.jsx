import { Card } from "../../../components";

const data = [
  {
    id: 9,
    first_name: "Ammar",
    last_name: "AL-Esrawi",
    picture: "http://localhost:5000/image/image-1694866674110-484876443.jpg",
    enroll_date: "2023-09-14T21:00:00.000Z",
    country: "Syria",
    course_title: "[HTML Basics for Beginners]",
  },
  {
    id: 10,
    first_name: "Ahmad",
    last_name: "Omar",
    picture: "http://localhost:5000/image/null",
    enroll_date: "2023-10-10T21:00:00.000Z",
    country: "Syria",
    course_title: "HTML Basics for Beginners",
  },
  {
    id: 11,
    first_name: "Ahmad",
    last_name: "Sadek",
    picture: "http://localhost:5000/image/image-1695566128570-467521694.jpg",
    enroll_date: "2023-09-19T21:00:00.000Z",
    country: "Syria",
    course_title: "HTML Basics for Beginners",
  },
  {
    id: 13,
    first_name: "ahmad",
    last_name: "loky",
    picture: "http://localhost:5000/image/null",
    enroll_date: "2023-10-11T21:00:00.000Z",
    country: "Syria",
    course_title: "HTML Basics for Beginners",
  },
  {
    id: 18,
    first_name: "Ammar",
    last_name: "alesrawi",
    picture: "http://localhost:5000/image/null",
    enroll_date: "2024-03-02T21:00:00.000Z",
    country: "Syria",
    course_title: "HTML Basics for Beginners",
  },
];

const CourseTable = () => {
  const courseTitle = data.length > 0 ? data[0].course_title : "[COURSE_TITLE]";

  return (
    <div className="p-4">

      <div className="mb-6 text-2xl font-bold">{courseTitle}</div>
      <Card>
        <div className=" py-[24px] px-[16px] rounded-[8px]">
          {data.length > 0 ? (
            <table className="min-w-full">
              <thead className="text-dark">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Enroll Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {data.map((student) => (
                  <tr key={student.id} className="border-b border-gray-200">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img
                          className="mr-4 h-10 w-10 rounded-full"
                          src={
                            student.picture !== "http://localhost:5000/image/null"
                              ? student.picture
                              : "default_image_url"
                          }
                          alt={student.first_name}
                        />
                        <div>
                          <p className="font-semibold">{`${student.first_name} ${student.last_name}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(student.enroll_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{student.country || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-red-500 font-semibold">
              No students enrolled in this course.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CourseTable;
