import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Announcements from "./pages/Announcements";
import Job from "./pages/Job";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import AdminContacts from "./pages/AdminContacts";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />

      </Routes>
    </Router>
  );
}

export default App;
