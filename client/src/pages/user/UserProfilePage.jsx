import React, { useState, useEffect } from "react";
import userService from "../../services/userService";

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [submitMessage, setSubmitMessage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile();
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          password: "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch user profile. You may need to log in again.",
        );
        console.error("Fetch user profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You must be logged in to view your profile.");
      setLoading(false);
      return;
    }

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);

    if (isEditing && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    }

    setSubmitMessage(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage(null);

    try {
      const payload = {
        name: formData.name,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      };

      const updatedUser = await userService.updateUserProfile(payload);
      setUser(updatedUser);
      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        password: "",
        phoneNumber: updatedUser.phoneNumber || "",
        address: updatedUser.address || "",
      });
      setIsEditing(false);
      setSubmitMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
      console.log("Profile updated:", updatedUser);
    } catch (err) {
      setSubmitMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile.",
      });
      console.error("Update profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">Error: {error}</div>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          No user data available. Please log in.
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mt-4 p-4 bg-light rounded shadow-sm"
      style={{ maxWidth: "800px" }}
    >
      <h2 className="text-center mb-4">User Profile</h2>

      {submitMessage && (
        <div
          className={`alert ${submitMessage.type === "success" ? "alert-success" : "alert-danger"} text-center`}
          role="alert"
        >
          {submitMessage.text}
        </div>
      )}

      {!isEditing ? (
        <div>
          <div className="mb-3">
            <label className="fw-bold text-muted">Name:</label>
            <p className="fs-5">{user.name || "N/A"}</p>
          </div>

          <div className="mb-3">
            <label className="fw-bold text-muted">Email:</label>
            <p className="fs-5">{user.email || "N/A"}</p>
          </div>

          <div className="mb-3">
            <label className="fw-bold text-muted">Phone Number:</label>
            <p className="fs-5">{user.phoneNumber || "N/A"}</p>
          </div>

          <div className="mb-3">
            <label className="fw-bold text-muted">Address:</label>
            <p className="fs-5">{user.address || "N/A"}</p>
          </div>

          <button onClick={handleEditToggle} className="btn btn-primary">
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className="form-control"
              placeholder="Leave blank if you do not want to change password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary me-2"
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span> Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>

          <button
            type="button"
            onClick={handleEditToggle}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default UserProfilePage;
