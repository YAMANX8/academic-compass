import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  NotFound,
  NotAuthorized,
  Search,
  Roadmaps,
  LevelZero,
  LevelOne,
  LevelN,
  LoginStudent,
  RegisterStudent,
  StudentSettings,
  StudentDashboard,
  CourseDetails,
  Article,
  Video,
  Quiz,
  LoginInstructor,
  RegisterInstructor,
  InstructorDashboard,
  InstructorHome,
  Settings,
  EditCourse,
  CreateCourse,
  CourseInfo,
  ShowProfile,
} from "./pages";
import { Layout, RoadmapLayout } from "./layout";
import {
  RequireAuth,
  PersistLogin,
  StudentDataRetrieval,
  InstructorDataRetrieval,
  InstructorPersistLogin,
} from "./components";
import { ToastContainer } from "react-toastify";
import Router from "./routes/app";
import "react-toastify/dist/ReactToastify.css";
const Roles = {
  instructor: 1,
  student: 2,
};
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/student" />} />
          <Route path="student/login" element={<LoginStudent />} />
          <Route path="student/register" element={<RegisterStudent />} />
          <Route path="student/test" element={<NotFound  />} />

          {/* student pages path */}
          <Route
            element={
              localStorage.role == Roles.student ? (
                <PersistLogin />
              ) : (
                <InstructorPersistLogin />
              )
            }
          >
            <Route
              element={
                localStorage.role == Roles.student ? (
                  <StudentDataRetrieval />
                ) : (
                  <InstructorDataRetrieval />
                )
              }
            >
              <Route path="student">
                <Route index element={<Home />} />

                <Route path="roadmaps">
                  <Route index element={<Roadmaps />} />
                  <Route path=":roadmapId" element={<RoadmapLayout />}>
                    <Route>
                      <Route index element={<LevelZero />} />
                      <Route path=":topicL1Id">
                        <Route index element={<LevelOne />} />
                        <Route path=":topicLnId" element={<LevelN />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
                <Route path="search">
                  <Route path="by-topic/:id" element={<Search />} />
                  <Route path="by-text/:text" element={<Search />} />
                </Route>
                <Route path="courseview/:id" element={<CourseView />} />
                <Route path="video" element={<Video />} />
                <Route path="Article" element={<Article />} />
    
                {/* protected to students only */}
                <Route element={<RequireAuth allowedUser={Roles.student} />}>
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="settings" element={<StudentSettings />} />

                  <Route
                    path="courseview/:id/video/:itemId"
                    element={<Video />}
                  />
                  <Route
                    path="courseview/:id/article/:itemId"
                    element={<Article />}
                  />
                  <Route
                    path="courseview/:id/quiz/:itemId"
                    element={<Quiz />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* instructor pages path */}
          <Route path="instructor">
            <Route path="login" element={<LoginInstructor />} />
            <Route path="register" element={<RegisterInstructor />} />
            <Route
              element={
                localStorage.role == Roles.instructor ? (
                  <InstructorPersistLogin />
                ) : (
                  <PersistLogin />
                )
              }
            >
              <Route
                element={
                  localStorage.role == Roles.instructor ? (
                    <InstructorDataRetrieval />
                  ) : (
                    <StudentDataRetrieval />
                  )
                }
              >
                <Route index element={<Navigate to="/student" />} />
                <Route path="home" element={<InstructorHome />} />

                {/* protected to instructors only */}
                <Route element={<RequireAuth allowedUser={Roles.instructor} />}>
                  <Route path="dashboard" element={<InstructorDashboard />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="edit-course/:id" element={<EditCourse />} />
                  <Route path="create-course" element={<CreateCourse />} />
                  <Route path="course-info/:id" element={<CourseInfo />} />
                  <Route path="student-profile/:id" element={<ShowProfile />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default App;
