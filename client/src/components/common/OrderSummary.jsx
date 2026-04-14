import React from "react";

function OrderSummary({ items, total, onConfirm, isLoading, error }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="card-title mb-4">Summary</h4>

        {items.map((item) => (
          <div
            key={item.foodItemId}
            className="d-flex justify-content-between mb-2"
          >
            <span>
              {item.foodName} x {item.quantity}
            </span>
            <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr />

        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total:</span>
          <span className="text-danger">${total.toFixed(2)}</span>
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <button
          className="btn btn-success w-100 mt-4 py-2"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
