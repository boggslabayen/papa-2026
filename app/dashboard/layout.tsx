import { AuthProvider } from "@/components/ui/dashboard/auth/AuthProvider";
import ProtectedRoute from "@/components/ui/dashboard/auth/ProtectedRoute";
import HeaderDashboard from "@/components/ui/dashboard/HeaderDashboard";

import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <AuthProvider>
          <ProtectedRoute>
            <HeaderDashboard />
            {children}
          </ProtectedRoute>
        </AuthProvider>
      </main>
    </div>
  );
}
