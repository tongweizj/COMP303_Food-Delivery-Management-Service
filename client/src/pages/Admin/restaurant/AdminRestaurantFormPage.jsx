// AdminRestaurantFormPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminRestaurantService from "../../../services/adminRestaurantService";

function AdminRestaurantFormPage() {
  const { id } = useParams(); // Get restaurant ID from URL for edit mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: "",
    coverImageUrl: "",
    cuisineType: "",
    city: "",
    rating: "",
    deliveryTime: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);

  const isEditMode = id && id !== "new";

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      const fetchRestaurant = async () => {
        try {
          const data = await adminRestaurantService.getRestaurantById(id);
          // Ensure data fields are correctly mapped to the form state
          setFormData({
            restaurantName: data.restaurant.restaurantName || "",
            coverImageUrl: data.restaurant.coverImageUrl || "",
            cuisineType: data.restaurant.cuisineType || "",
            city: data.restaurant.city || "",
            rating: data.restaurant.rating || "",
            deliveryTime: data.restaurant.deliveryTime || "",
          });
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "Failed to fetch restaurant data for editing.",
          );
          console.error("Error fetching restaurant for edit:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchRestaurant();
    } else {
      setLoading(false); // Not edit mode, so no initial loading
    }
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitMessage(null);
    setError(null);

    try {
      const payload = {
        ...formData,
        rating: parseFloat(formData.rating) || 0,
        deliveryTime: parseFloat(formData.deliveryTime) || 0,
      };

      if (isEditMode) {
        await adminRestaurantService.updateRestaurant(id, payload);
        setSubmitMessage({
          type: "success",
          text: "Restaurant updated successfully!",
        });
      } else {
        await adminRestaurantService.createRestaurant(payload);
        setSubmitMessage({
          type: "success",
          text: "Restaurant added successfully!",
        });
        // Clear form after successful creation
        setFormData({
          restaurantName: "",
          coverImageUrl: "",
          cuisineType: "",
          city: "",
          rating: "",
          deliveryTime: "",
        });
      }
      setTimeout(() => navigate("/admin/restaurants"), 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Failed to ${isEditMode ? "update" : "add"} restaurant.`;
      setSubmitMessage({ type: "error", text: errorMessage });
      setError(errorMessage);
      console.error(`Error submitting restaurant form:`, err);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading restaurant data...</span>
        </div>
      </div>
    );
  }

  if (error && !submitMessage) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="container mt-4 p-4 bg-light rounded shadow-sm"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="text-center mb-4">
        {isEditMode ? "Edit Restaurant" : "Add New Restaurant"}
      </h2>

      {submitMessage && (
        <div
          className={`alert ${submitMessage.type === "success" ? "alert-success" : "alert-danger"} text-center`}
          role="alert"
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="restaurantName" className="form-label">
            Restaurant Name:
          </label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="restaurantName" className="form-label">
            Restaurant Cover Image :
          </label>
          <input
            type="text"
            id="coverImageUrl"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cuisineType" className="form-label">
            Cuisine Type:
          </label>
          <input
            type="text"
            id="cuisineType"
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="rating" className="form-label">
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="form-control"
              step="0.1"
              min="0"
              max="5"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="deliveryTime" className="form-label">
              Delivery Time (minutes):
            </label>
            <input
              type="number"
              id="deliveryTime"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleInputChange}
              className="form-control"
              step="1"
              min="0"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={submitLoading}
          className="btn btn-primary w-100 mt-3"
        >
          {submitLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              {isEditMode ? " Updating..." : " Adding..."}
            </>
          ) : isEditMode ? (
            "Update Restaurant"
          ) : (
            "Add Restaurant"
          )}
        </button>
      </form>
    </div>
  );
}

export default AdminRestaurantFormPage;
