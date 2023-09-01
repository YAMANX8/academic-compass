import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/index.js";
import {
  Login_Student,
  Sign_Up_Student,
  Roadmaps,
  Sign_Up_Instructor,
  Home,
  Dashboard_Student,
  Setting_Student,
} from "./pages/index.js";
import { SectionWrapper } from "./layout/index.js";
const App = () => {
  return (
    <main className=" bg-light dark:bg-dark text-dark dark:text-light transition-all duration-1000 ease-in-out-back">
      <Navbar />
      <SectionWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-student" element={<Login_Student />} />
          <Route path="/register-student" element={<Sign_Up_Student />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/register-instructor" element={<Sign_Up_Instructor />} />
          <Route path="/dashboard_student" element={<Dashboard_Student />} />
          <Route path="/setting_Student" element={<Setting_Student />} />
          {/* <Route path="/roadmaps/:roadmapid" element={< />} /> */}
        </Routes>
      </SectionWrapper>
      <Footer />
    </main>
  );
};

export default App;
