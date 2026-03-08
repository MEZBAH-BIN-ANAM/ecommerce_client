import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./store/store";
import ScrollToTop from "./Components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AppProvider>
    <ScrollToTop />
    <ToastContainer closeOnClick= {true} autoClose= {1500}   />
    <App />
  </AppProvider>
  </BrowserRouter>
  
);
