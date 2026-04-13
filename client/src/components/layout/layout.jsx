import { Outlet } from "react-router-dom";
import Navbar from "./MainNavbar";
import Footer from "./MainFooter";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";

// --- 前台布局：接收认证状态和登出函数 ---
export const MainLayout = ({ isAuthenticated, onLogout }) => (
  <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
    {/* 将 Props 继续向下传递给具体的 Navbar */}
    <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />

    <main className="flex-grow-1">
      <Outlet />
    </main>

    <Footer />
  </div>
);

// --- 后台布局 ---
// 如果你的后台 Header 也需要显示用户信息或登出按钮，同样加上 Props
export const AdminLayout = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="admin-wrapper">
      {/* 后台头部通常也需要处理登出 */}
      <AdminHeader isAuthenticated={isAuthenticated} onLogout={onLogout} />

      <div className="d-flex">
        <Sidebar />

        <main
          className="flex-grow-1 p-4 bg-light"
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          <div className="container-fluid">
            {/* 这里的 Outlet 不需要传 props，除非子页面需要直接用 */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
