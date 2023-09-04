import { Routes, Route } from "react-router-dom";
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
} from "./pages";
import { Layout } from "./layout";
import { RequireAuth, PersistLogin } from "./components";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public path */}
        <Route path="/" element={<Home />} />

        {/* student pages path */}
        <Route path="student">
          <Route path="login" element={<Login_Student />} />
          <Route path="register" element={<Sign_Up_Student />} />
          <Route path="roadmaps" element={<Roadmaps />} />
          <Route path="courseview" element={<CourseView />} />
          <Route path="search" element={<Search />} />

          {/* protected to students only */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<Dashboard_Student />} />
              <Route path="settings" element={<Settings_Student />} />
              {/* <Route path="/roadmaps/:roadmapid" element={< />} /> */}
            </Route>
          </Route>
        </Route>

        <Route path="instructor">
          <Route path="register" element={<Sign_Up_Instructor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
