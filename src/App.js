import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigaiton.jsx";
import { Route, Routes } from "react-router-dom";
import TrackingPage from "./pages/TrackingPage.jsx";
import DepartmentsPage from "./pages/DepartmentsPage.jsx";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<TrackingPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
      </Routes>
    </>
  );
}

export default App;
