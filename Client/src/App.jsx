import { Route, Routes } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Details from "./components/details/Details";
import Success from "./components/success/Success";
import Error from "./components/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/details/:username" element={<Details />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App
