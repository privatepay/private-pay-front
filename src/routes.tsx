import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Authentication from "@/pages/Authentication";
import Dashboard from "@/pages/Dashboard";
import { useProfile } from "@/hooks/useAuth";
import { SidebarProvider } from "@/hooks/useSidebar";
import Profile from "./pages/Profile";
import { Sidebar } from "@/components/global/Sidebar";
import { Navbar } from "@/components/global/Navbar";
import { SidebarInset } from "@/components/ui/sidebar";

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

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </div>
  );
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
        element={
          <ProtectedRoute>
            <SidebarProvider>
              <AppLayout />
            </SidebarProvider>
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
