import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let found, INDEX;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    found = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prev) => prev - found.price * found.quantity);
    setTotalQuantities((prev) => prev - found.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    found = cartItems.find((item) => item._id === id);
    INDEX = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      setCartItems([
        ...newCartItems,
        { ...found, quantity: found.quantity + 1 },
      ]);
      setTotalPrice((prev) => prev + found.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (value === 'dec') {
      if (found.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...found, quantity: found.quantity - 1 },
        ]);
        setTotalPrice((prev) => prev - found.price);
        setTotalQuantities((prev) => prev - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        toggleCart,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
