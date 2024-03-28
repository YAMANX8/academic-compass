import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FirstStep from "./create course pages/FirstStep";
import SecondStep from "./create course pages/SecondStep";
import ThirdStep from "./create course pages/ThirdStep";
import axios from "../../apis/axios";
import { useAuthContext } from "src/auth/hooks";
import { Helmet } from "react-helmet-async";

function CreateCourse() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [btn, setBtn] = useState({
    type: "button",
    title: "Continue",
  });
  const [backBtn, setBackBtn] = useState("Cancel");
  const [courseData, setCourseData] = useState({
    title: "",
    courseType: "",
    courseLevel: "",
  });
  // the static lists came from the database like levels and courses type
  const [list, setList] = useState({
    levels: [],
    types: [],
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const handleContinueClick = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      setBackBtn("Back");
      setBtn((prev) => ({ ...prev, type: "button", title: "Continue" }));
    } else if (currentStep == 2) {
      setCurrentStep(currentStep + 1);
      setBtn((prev) => ({ ...prev, title: "Create" }));
    } else {
      setBtn((prev) => ({ ...prev, type: "submit" }));
    }
  };
  //  شكل ابو راتب
  // أي على عيني حارتك ☻ أبو حميد
  const handleBackClick = () => {
    if (currentStep > 2) {
      setBtn((prev) => ({ ...prev, type: "button", title: "Continue" }));
      setCurrentStep(currentStep - 1);
      setBackBtn("Back");
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setBackBtn("Cancel");
    } else {
      navigate(-1);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (courseData.title.length == 0)
        throw new Error("Course title is required!");
      if (courseData.title.length > 60)
        throw new Error(
          "Your course title should not exceed 60 characters in length"
        );
      const res = await axios.post(
        `/instructor/createCourse`,
        {
          title: courseData.title,
          levelId: courseData.courseType,
          typeId: courseData.courseLevel,
        },
        {
          headers: {
            token: user?.accessToken,
          },
        }
      );
      toast.success("Course created successfully");
      navigate(`/instructor/dashboard`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/instructor/createCourse`, {
          headers: {
            token: user?.accessToken,
          },
        });
        setList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  console.table(courseData);

  return (
    <>
      <Helmet>
        <title>Create new course</title>
      </Helmet>
      <form
        className="w-[1200px] flex flex-col justify-between min-h-[75vh]"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="flex flex-col gap-12">
            <div>
              <h1 className="py-4 text-[24px]">Step{currentStep}</h1>
              <div className="h-[10px] w-full max-w-screen-xl m-auto bg-gray-300 rounded-[10px] relative">
                <div
                  className="h-full bg-blue-800 rounded-[10px] transition-all duration-500 ease-in-out-back"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            {/* القسم الاول  */}
            {currentStep === 1 && (
              <FirstStep courseData={courseData} handleChange={handleChange} />
            )}
            {/* القسم الثاتي */}
            {currentStep === 2 && (
              <SecondStep
                courseData={courseData}
                handleChange={handleChange}
                list={list.types}
              />
            )}
            {/* القسم الثالث */}
            {currentStep === 3 && (
              <ThirdStep
                courseData={courseData}
                handleChange={handleChange}
                list={list.levels}
              />
            )}
          </div>
        </div>
        <div className="relative flex justify-between py-4">
          <hr className="absolute h-[2px] -left-40 -right-40 bg-dark/50 -top-[1px]" />
          <Link
            onClick={handleBackClick}
            className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-primary bg-light border-primary border-[1px]"
          >
            {backBtn}
          </Link>
          <button
            type={btn.type}
            onClick={handleContinueClick}
            className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
          >
            {btn.title}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateCourse;
