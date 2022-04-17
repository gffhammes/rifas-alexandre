import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const saveItem = (item) => {

    // const found = cartItems.some((e) => e.id === item.id);

    // if (!found) {
    //   const newItem = { id: item.id, qty: item.qty };
    //   setCartItems([...cartItems, newItem]);
    // } else {
    //   const newCartItems = cartItems.map((cartItem) => {
    //     if (cartItem.id === item.id) {
    //       cartItem.qty = parseInt(cartItem.qty) + 1;
    //     }
    //   });
    //   setCartItems([...cartItems]);
    // }
  };

  const removeItem = (item) => {
    const index = cartItems.indexOf(item);

    const newCartItems = cartItems;

    if (index > -1) {
      newCartItems.splice(index, 1);
    }

    setCartItems([...newCartItems]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const [cartOpen, setCartOpen] = useState(false);

  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        saveItem,
        removeItem,
        clearCart,
        cartOpen,
        handleCartClick,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
