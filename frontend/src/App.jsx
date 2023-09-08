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
import { RequireAuth, PersistLogin } from "./components";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/student" />} />
        <Route element={<PersistLogin />}>

          {/* student pages path */}
          <Route path="student">
            <Route index element={<Home />} />
            <Route path="login" element={<Login_Student />} />
            <Route path="register" element={<Sign_Up_Student />} />

            <Route path="roadmaps">
              <Route index element={<Roadmaps />} />
              <Route path=":roadmaptitle" element={<RoadmapLayout />}>
                <Route>
                  <Route index element={<LevelZero />} />
                  <Route path=":topicl1">
                    <Route index element={<LevelOne />} />
                    <Route path=":topicln" element={<LevelN />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="courseview" element={<CourseView />} />
            <Route path="search" element={<Search />} />

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
