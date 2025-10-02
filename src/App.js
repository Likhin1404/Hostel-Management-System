// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Admissions from './pages/admissions/Admissions';
import Rooms from './pages/rooms/Rooms';
import Complaints from './pages/complaints/Complaints';
import Logout from './pages/logout/Logout';

import UserLogin from './pages/user/UserLogin';
import UserDashboard from './pages/user/UserDashboard';
import StudentPage from './pages/user/StudentPage';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import UserHeader from './components/user/UserHeader';
import UserFooter from './components/user/UserFooter';
import UserProfile from './pages/user/UserProfile';
import UserComplaintForm from './pages/user/UserComplaintForm';

function AppWrapper() {
  const location = useLocation();
  const [isUserPage, setIsUserPage] = useState(false);

  useEffect(() => {
    setIsUserPage(location.pathname.startsWith('/user'));
  }, [location]);

  return (
    <>
      {!isUserPage && <Header />}
      {isUserPage && <UserHeader />}

      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/logout" element={<Logout />} />

        {/* User Auth */}
        <Route path="/user-login" element={<UserLogin />} />

        {/* User Pages */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/students" element={<StudentPage />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/complaint" element={<UserComplaintForm />} />
      </Routes>

      {!isUserPage && <Footer />}
      {isUserPage && <UserFooter />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
