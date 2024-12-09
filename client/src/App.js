import Toggler from "./components/Toggler";
import ContactUpload from './components/ContactUpload';
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PricingPage from "./components/PricingPage";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import EmailTemplate from './components/EmailTemplate';
import Done from './components/Done';
import ContactUs from "./components/ContactUs";
import HowItWorks from "./components/HowItWorks";
import HelpPage from "./components/HelpPage";

function App() {
  

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Toggler toast={toast} />}></Route>
        <Route path="/ForgotPass" element={<ForgotPass toast={toast} />} />
        <Route
          path="/ResetPass/:id/:token"
          element={<ResetPass toast={toast} />}
        />
        <Route path="/Home" element={<Home />} />
        <Route path="/ContactUpload" element={<ContactUpload />} />
        <Route path="/EmailTemplate" element={<EmailTemplate />} />
        <Route path="/done" element={<Done />} />
        <Route path="/pricingpage" element={<PricingPage/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/howitworks" element={<HowItWorks/>}/>
        <Route path="/helppage" element={<HelpPage />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
