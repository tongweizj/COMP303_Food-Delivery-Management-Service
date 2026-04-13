import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import adminMenuItemService from "../../../services/adminMenuItemService"; // 请根据实际路径修改

const AdminMenuItemDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        // 调用你提供的 service 方法
        const data = await adminMenuItemService.getMenuItemById(id);
        setItem(data);
      } catch (err) {
        setError("Could not load menu item details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (error) return <div className="alert alert-danger m-4">{error}</div>;
  if (!item)
    return <div className="alert alert-warning m-4">Menu item not found.</div>;

  return (
    <div className="container-fluid py-4">
      {/* 顶部导航与操作栏 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/admin/menuItems">Menu Management</Link>
            </li>
            <li
              className="breadcrumb-item active text-truncate"
              style={{ maxWidth: "200px" }}
            >
              {item.itemName}
            </li>
          </ol>
        </nav>
        <div className="btn-group shadow-sm">
          <Link
            to={`/admin/menuitems/edit/${item.menuItemId}`}
            className="btn btn-primary"
          >
            <i className="bi bi-pencil-square me-2"></i>Edit Item
          </Link>
          <button
            className="btn btn-outline-danger"
            onClick={() => window.confirm("Delete this item?")}
          >
            <i className="bi bi-trash3 me-2"></i>Delete
          </button>
        </div>
      </div>

      <div className="row">
        {/* 左侧：菜品图片展示 */}
        <div className="col-lg-5 mb-4">
          <div className="card shadow-sm border-0 overflow-hidden">
            <img
              src={item.imageUrl}
              className="img-fluid"
              alt={item.itemName}
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
            <div className="card-body bg-light text-center small text-muted">
              Internal ID: {item.menuItemId}
            </div>
          </div>
        </div>

        {/* 右侧：详细信息展示 */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <div className="mb-3">
                <span
                  className={`badge ${item.availability ? "bg-success" : "bg-danger"} mb-2`}
                >
                  {item.availability ? "Available" : "Out of Stock"}
                </span>
                <h1 className="display-6 fw-bold text-dark">{item.itemName}</h1>
              </div>

              <div className="row g-4 mt-2">
                {/* 价格卡片 */}
                <div className="col-sm-6">
                  <div className="p-3 border rounded bg-light">
                    <label className="text-muted small text-uppercase fw-bold d-block">
                      Price
                    </label>
                    <span className="h3 fw-bold text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* 类别卡片 */}
                <div className="col-sm-6">
                  <div className="p-3 border rounded bg-light">
                    <label className="text-muted small text-uppercase fw-bold d-block">
                      Category
                    </label>
                    <span className="h4">{item.category || "General"}</span>
                  </div>
                </div>

                {/* 关联餐厅信息 */}
                <div className="col-12">
                  <div className="p-3 border rounded">
                    <label className="text-muted small text-uppercase fw-bold d-block mb-2">
                      Linked Restaurant
                    </label>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-shop h3 me-3 text-secondary"></i>
                      <div>
                        <p className="mb-0 fw-bold">
                          Restaurant ID: {item.restId}
                        </p>
                        <Link
                          to={`/admin/restaurants/${item.restId}`}
                          className="small text-decoration-none"
                        >
                          View Restaurant Profile{" "}
                          <i className="bi bi-box-arrow-up-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 额外说明（占位） */}
              <div className="mt-4 pt-3 border-top">
                <h6 className="fw-bold">Inventory Status</h6>
                <p className="text-muted">
                  {item.availability
                    ? "This item is currently active and visible to customers on the frontend menu."
                    : "This item is hidden from the customer-facing menu and marked as sold out."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuItemDetailsPage;
