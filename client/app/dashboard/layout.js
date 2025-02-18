import { AuthProvider } from "../context/AuthContext";
import { NotificationProvider } from "../context/NotificationContext";
import Header from "./component/Header";
import Layout from "./component/Layout";

export const metadata = {
  title: "Coderina/Admin/Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="h-full scroll-smooth">
      <AuthProvider>
        <NotificationProvider>
          <Layout>
            <main className="p-6 bg-white">{children}</main>
          </Layout>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}
