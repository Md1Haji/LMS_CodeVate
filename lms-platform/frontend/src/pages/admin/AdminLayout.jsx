import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/index";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    { label: "Overview", path: "/admin", icon: "📊" },
    { label: "Users", path: "/admin/users", icon: "👥" },
    { label: "Courses", path: "/admin/courses", icon: "📚" },
    { label: "Achievements", path: "/admin/achievements", icon: "🏆" },
    { label: "Reviews", path: "/admin/reviews", icon: "⭐" },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="text-2xl font-bold text-primary-600">LearnSphere</div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center px-6 py-4 text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors border-l-4 border-transparent hover:border-primary-600"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="ml-4">{item.label}</span>}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full"
          >
            {sidebarOpen ? "Logout" : "🚪"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <div className="w-10" />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
