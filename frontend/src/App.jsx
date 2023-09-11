import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login_Student,
  Sign_Up_Student,
  Roadmaps,
  Sign_Up_Instructor,
  Home,
  Dashboard_Student,
  Settings_Student,
  NotFound,
  CourseView,
  Search,
  LevelZero,
  LevelOne,
  LevelN,
} from "./pages";
import { Layout, RoadmapLayout } from "./layout";
import { RequireAuth, PersistLogin, DataRetrieval } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/student" />} />
          <Route path="student/login" element={<Login_Student />} />
          <Route path="student/register" element={<Sign_Up_Student />} />

          {/* student pages path */}
          <Route element={<PersistLogin />}>
            <Route element={<DataRetrieval />}>
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

                <Route path="courseview" element={<CourseView />} />
                <Route path="search">
                  <Route path="by-topic/:id" element={<Search />} />
                  <Route path="by-text/:text" element={<Search />} />
                </Route>

                {/* protected to students only */}
                <Route element={<RequireAuth />}>
                  <Route path="dashboard" element={<Dashboard_Student />} />
                  <Route path="settings" element={<Settings_Student />} />
                  {/* <Route path="/roadmaps/:roadmapid" element={< />} /> */}
                </Route>
              </Route>
              <Route path="instructor">
                <Route path="register" element={<Sign_Up_Instructor />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
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
