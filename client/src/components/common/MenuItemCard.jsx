// MenuItemCard.jsx
import React from "react";

function MenuItemCard({ menuItem }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="row g-0">
        <div className="col-4">
          <img
            src={
              menuItem.imageUrl ||
              "https://via.placeholder.com/150x150?text=Food"
            }
            alt={menuItem.itemName}
            className="img-fluid rounded-start h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-8">
          <div className="card-body d-flex flex-column h-100">
            <h5 className="card-title">{menuItem.itemName}</h5>
            <p className="card-text text-muted small flex-grow-1">
              {menuItem.description}
            </p>
            <div className="d-flex justify-content-between align-items-center mt-auto">
              <span className="fw-bold text-danger fs-5">
                ${menuItem.price ? menuItem.price.toFixed(2) : "N/A"}
              </span>
              <button className="btn btn-primary btn-sm">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
