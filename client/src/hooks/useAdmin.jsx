import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const userData = await userService.getMe();
        console.log("userData:", userData);
        // 校验角色 (根据你后端的实际返回值判断)
        if (
          userData &&
          (userData.role === "admin" || userData.role === "ADMIN")
        ) {
          setIsAdmin(true);
          setUser(userData);
          setLoading(false);
        } else {
          // 如果不是 admin，跳转回首页或 403 页面
          console.warn("Unauthorized access: Not an admin");
          navigate("/");
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        // 如果 Token 无效或过期，跳回登录页
        navigate("/login");
      }
    };

    verifyAdmin();
  }, [navigate]);

  // 返回组件需要用的状态
  return { isAdmin, loading, user };
};
