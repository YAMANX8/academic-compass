import { ToastContainer } from "react-toastify";
import Router from "./routes/app";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router />
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
