import HomePage from "./pages/HomePage"
  import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Footer from "./components/Footer"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
        <ToastContainer/>
      </BrowserRouter>
    </>
  )
}

export default App
