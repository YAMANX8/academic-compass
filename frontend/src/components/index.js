// course view components
import CourseContent from "./course view/CourseContent";
import ReviewCards from "./course view/ReviewCards";
import ReviewForm from "./course view/ReviewForm";
// dashboard components
import ProfileCard from "./dashboard/ProfileCard";
import PerformanceChart from "./dashboard/PerformanceChart";
import CourseCard from "./dashboard/CourseCard";
import PerformanceCard from "./dashboard/PerformanceCard";
// interface components
import Button from "./interface/Button";
import Preloader from "./interface/Preloader";
import Modal from "./interface/Modal";
import Switcher from "./interface/Switcher";
import LoadingScreen from "./interface/loading-screen/LoadingScreen";
import SplashScreen from "./interface/loading-screen/SplashScreen";
import Logo from "./interface/Logo";
import ProfileAvatar from "./interface/profile-avatar";
import Ratings from "./interface/ratings";
import Card from "./interface/card";
import Progress from "./interface/progress";
// logic components
import RequireAuth from "./logic/RequireAuth";
import PersistLogin from "./logic/PersistLogin";
import StudentDataRetrieval from "./logic/StudentDataRetrieval";
import InstructorDataRetrieval from "./logic/InstructorDataRetrieval";
import InstructorPersistLogin from "./logic/InstructorPersistLogin";
// roadmap components
import RoadmapCard from "./roadmap/RoadmapCard";
import RightLine from "./roadmap/RightLine";
import LeftLine from "./roadmap/LeftLine";
import StartLine from "./roadmap/StartLine";
import EndLineRight from "./roadmap/EndLineRight";
import EndLineLeft from "./roadmap/EndLineLeft";
import StartLineLeft from "./roadmap/StartLineLeft";
import Topic from "./roadmap/Topic";
// settings components
import General from "./setting/General";
import Security from "./setting/Security";
import Account from "./setting/Account";
// animation components
import MotionContainer from "./animations/motion-container";
import { varBounce } from "./animations/bounce";
import { varFade } from "./animations/fade";
import { varZoom } from "./animations/zoom";
import { varFlip } from "./animations/flip";
import { varRotate } from "./animations/rotate";
import { varSlide } from "./animations/slide";
import { varScale } from "./animations/scale";
import {
  varTranHover,
  varTranEnter,
  varTranExit,
} from "./animations/transition";

export {
  RoadmapCard,
  ProfileCard,
  PerformanceChart,
  CourseCard,
  PerformanceCard,
  Button,
  General,
  Security,
  Account,
  RequireAuth,
  PersistLogin,
  Preloader,
  CourseContent,
  ReviewCards,
  Modal,
  Switcher,
  LoadingScreen,
  SplashScreen,
  RightLine,
  LeftLine,
  StartLine,
  EndLineRight,
  EndLineLeft,
  StartLineLeft,
  StudentDataRetrieval,
  Topic,
  ReviewForm,
  InstructorDataRetrieval,
  InstructorPersistLogin,
  MotionContainer,
  varBounce,
  varFade,
  varZoom,
  varFlip,
  varRotate,
  varSlide,
  varScale,
  varTranHover,
  varTranEnter,
  varTranExit,
  Logo,
  ProfileAvatar,
  Ratings,
  Card,
  Progress,
};
