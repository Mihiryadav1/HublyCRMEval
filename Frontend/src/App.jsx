import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoute.jsx";

const Main = React.lazy(() => import('./Pages/Main/Main.jsx'));
const Layout = React.lazy(() => import('./Layout/Layout.jsx'));
const SignIn = React.lazy(() => import('./Pages/SignIn/SignIn.jsx'));
const Signup = React.lazy(() => import('./Pages/Signup/Signup.jsx'));
const Dashboard = React.lazy(() => import('./Pages/Dashboard/Dashboard.jsx'));
const ContactCenter = React.lazy(() => import('./Pages/ContactCenter/ContactCenter.jsx'));
const Analytics = React.lazy(() => import('./Pages/Analytics/Analytics.jsx'));
const Team = React.lazy(() => import('./Pages/Team/Team.jsx'));
const ChatSettings = React.lazy(() => import('./Pages/ChatSettings/ChatSettings.jsx'));
const EditProfile = React.lazy(() => import('./Pages/EditProfile/EditProfile.jsx'));

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protected Routes */}
          <Route path="/app" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          } >
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contactcenter" element={<ContactCenter />} />
            <Route path="team" element={
              <PrivateRoute role="admin">
                <Team />
              </PrivateRoute>
            } />
            <Route path="settings" element={<EditProfile />} />
            <Route path="chatbot" element={<ChatSettings />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App