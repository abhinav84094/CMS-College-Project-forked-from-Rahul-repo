import SideBar from "./components/SideBar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SignUp.jsx";
import ViewContent from "./components/ViewContent.jsx";
import AddContent from "./components/AddContent.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import "./App.css";
import "./index.css"

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <SideBar />

      <main className="flex flex-col justify-center items-center w-[100vw]">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route path="/view" element={<ViewContent />} />

          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddContent />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
