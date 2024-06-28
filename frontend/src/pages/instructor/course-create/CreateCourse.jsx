import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FirstStep from "./sections/FirstStep";
import SecondStep from "./sections/SecondStep";
import ThirdStep from "./sections/ThirdStep";
// import axios from "src/apis/axios";
import { useAuthContext } from "src/auth/hooks";
import { Helmet } from "react-helmet-async";
import { Button, Card, Progress } from "../../../components";
import useAxios from "../../../hooks/use-axios";
import { paths } from "../../../routes/paths";
function CreateCourse() {
  const axios = useAxios();
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
  console.log(courseData);
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
          "Your course title should not exceed 60 characters in length",
        );
      if (!courseData.courseType) throw new Error("Course type is required!");
      if (!courseData.courseLevel) throw new Error("Course level is required!");
      const res = await axios.post(`/instructor/createCourse`, {
        title: courseData.title,
        levelId: courseData.courseType,
        typeId: courseData.courseLevel,
      });
      toast.success("Course Created Successfully");
      navigate(paths.instructor.inprogressCourses);
    } catch (error) {
      console.log(error);
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
      <form onSubmit={handleSubmit}>
        <Card className="m-auto flex min-h-[512px] max-w-5xl flex-col justify-between">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h3>Step{currentStep}</h3>
              <Progress
                percentage={(currentStep / 3) * 100}
                className="transition-all duration-500 ease-in-out-back"
              />
            </div>
            {currentStep === 1 && (
              <FirstStep courseData={courseData} handleChange={handleChange} />
            )}
            {currentStep === 2 && (
              <SecondStep
                courseData={courseData}
                handleChange={handleChange}
                list={list.types}
              />
            )}
            {currentStep === 3 && (
              <ThirdStep
                courseData={courseData}
                handleChange={handleChange}
                list={list.levels}
              />
            )}
          </div>

          <div className="flex justify-between p-2">
            <Button
              size="lg"
              variant="outlined"
              type="button"
              onClick={handleBackClick}
            >
              {backBtn}
            </Button>
            <Button size="lg" type={btn.type} onClick={handleContinueClick}>
              {btn.title}
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
}

export default CreateCourse;
