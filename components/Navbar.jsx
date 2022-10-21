import Link from 'next/link';
import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from './';

const Navbar = () => {
  const { totalQuantities, toggleCart, showCart } = useStateContext();

  return (
    <nav className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Next Commerce</Link>
      </p>
      <button type='button' className='cart-icon' onClick={toggleCart}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
