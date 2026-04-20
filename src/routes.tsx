import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "@/pages/Authentication";
import Dashboard from "@/pages/Dashboard";
import { useProfile } from "@/hooks/useAuth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isError } = useProfile();

  if (isLoading) return null;
  if (isError) return <Navigate to="/" />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, data } = useProfile();

  if (isLoading) return null;
  if (data) return <Navigate to="/home" />;
  return <>{children}</>;
}

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Authentication />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
