import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/jobDetails";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="" element={<Dashboard />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<Jobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job-details/:jobId" element={<JobDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
