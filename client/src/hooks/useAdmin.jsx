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
        // Validate role (based on your backend's actual return value)
        if (
          userData &&
          (userData.role === "admin" || userData.role === "ADMIN")
        ) {
          setIsAdmin(true);
          setUser(userData);
          setLoading(false);
        } else {
          // If not an admin, redirect back to home or a 403 page
          console.warn("Unauthorized access: Not an admin");
          navigate("/");
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        // If the token is invalid or expired, redirect back to the login page
        navigate("/login");
      }
    };

    verifyAdmin();
  }, [navigate]);

  // Return the state needed by the component
  return { isAdmin, loading, user };
};
