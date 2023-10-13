import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FirstStep from "./create course pages/FirstStep";
import SecondStep from "./create course pages/SecondStep";
import ThirdStep from "./create course pages/ThirdStep";

function CreateCourse() {
  const navigate = useNavigate();
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
  const json = {
    levels: [
      {
        id: 1,
        title: "Beginner",
      },
      {
        id: 2,
        title: "Intermediate",
      },
      {
        id: 3,
        title: "Expert",
      },
    ],
    types: [
      {
        id: 1,
        title: "project based",
      },
      {
        id: 2,
        title: "beginner|advanced",
      },
      {
        id: 3,
        title: "observational learn",
      },
    ],
  };
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
    toast.success("course created successfully");
    navigate(`/instructor/dashboard`);
  };
  console.table(courseData);

  return (
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
            <SecondStep courseData={courseData} handleChange={handleChange} />
          )}
          {/* القسم الثالث */}
          {currentStep === 3 && (
            <ThirdStep courseData={courseData} handleChange={handleChange} />
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
  );
}

export default CreateCourse;
