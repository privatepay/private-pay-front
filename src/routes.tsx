import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "@/pages/Authentication";
import Dashboard from "@/pages/Dashboard";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export default function AllRoutes() {
  console.log(isAuthenticated());
  return (
    <>
      <Routes>
        {/* Login/Home */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/home" /> : <Authentication />
          }
        />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </>
  );
}
