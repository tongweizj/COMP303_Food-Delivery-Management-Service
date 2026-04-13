/* 
Author: Xuan Tri Nguyen - 301388576
Refactored by Gemini to use services and Bootstrap.
 */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import adminRestaurantService from "../../../services/adminRestaurantService";

export default function AdminRestaurantPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const result = await adminRestaurantService.getRestaurantById(id);
        setData(result);
      } catch (err) {
        setError("Failed to retrieve restaurant details, please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);
  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  if (error) return <div className="alert alert-danger m-4">{error}</div>;
  if (!data)
    return (
      <div className="alert alert-warning m-4">
        No information found for this restaurant
      </div>
    );

  const { restaurant, menuItems } = data;
  return (
    <div className="container-fluid py-4">
      {/* 顶部面包屑/返回按钮 */}
      <nav aria-label="breadcrumb" className="mb-4">
        <Link
          to="/admin/restaurants"
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="bi bi-arrow-left"></i> Return to list
        </Link>
      </nav>

      {/* 上方：餐厅基本信息卡片 */}
      <div className="card mb-4 shadow-sm">
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src={restaurant.coverImageUrl}
              className="img-fluid rounded-start h-100"
              alt={restaurant.restaurantName}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <h2 className="card-title text-primary">
                  {restaurant.restaurantName}
                </h2>
                <span className="badge bg-success">
                  {restaurant.cuisineType}
                </span>
              </div>
              <div className="row mt-3">
                <div className="col-sm-4">
                  <p className="mb-1 text-muted small text-uppercase fw-bold">
                    City
                  </p>
                  <p className="fs-5">{restaurant.city}</p>
                </div>
                <div className="col-sm-4">
                  <p className="mb-1 text-muted small text-uppercase fw-bold">
                    Rate
                  </p>
                  <p className="fs-5 text-warning">⭐ {restaurant.rating}</p>
                </div>
                <div className="col-sm-4">
                  <p className="mb-1 text-muted small text-uppercase fw-bold">
                    Average delivery time
                  </p>
                  <p className="fs-5">{restaurant.deliveryTime} minutes</p>
                </div>
              </div>
              <div className="mt-2 text-end">
                <Link
                  to={`/admin/restaurants/edit/${restaurant.restaurantId}`}
                  className="btn btn-primary btn-sm"
                >
                  EDIT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 下方：菜单管理部分 */}
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0 fw-bold">Menu Management ({menuItems.length})</h5>
          <Link to="/admin/food/new" className="btn btn-success btn-sm">
            Add Menu Item
          </Link>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Food photos</th>
                  <th>Name</th>
                  <th>category</th>
                  <th>Price</th>
                  <th>status</th>
                  <th className="text-end pe-4">Operate</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.menuItemId}>
                    <td className="ps-4">
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="rounded"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td className="fw-bold">{item.itemName}</td>
                    <td>
                      <span className="badge border text-secondary">
                        {item.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="text-primary fw-bold">
                      ${item.price.toFixed(2)}
                    </td>
                    <td>
                      {item.availability ? (
                        <span className="text-success small">
                          <i className="bi bi-check-circle-fill"></i> In stock
                        </span>
                      ) : (
                        <span className="text-danger small">
                          <i className="bi bi-x-circle-fill"></i> out of stock
                        </span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <Link
                        to={`/admin/food/edit/${item.menuItemId}`}
                        className="btn btn-outline-primary btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <button className="btn btn-outline-danger btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
