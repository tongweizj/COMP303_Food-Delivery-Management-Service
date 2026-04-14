import React, { createContext, useContext, useReducer, useMemo } from "react";

// 1. 创建 Context (加上 export)
export const CartContext = createContext();

// 2. Reducer (放在组件外)
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.findIndex(
        (item) => item.foodItemId === action.payload.foodItemId,
      );
      if (existingItemIndex > -1) {
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item.foodItemId !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// 3. Provider 组件
export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // 这里的函数引用要保持稳定
  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const value = useMemo(
    () => ({
      cartItems,
      addItem,
      removeItem,
      clearCart,
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: cartItems.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      ),
    }),
    [cartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 4. 导出自定义 Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
