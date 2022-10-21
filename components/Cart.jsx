import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../libs/client';
import getStripe from '../libs/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    toggleCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
    });

    if (response.statusCode === 500) {
      return;
    }
    const data = await response.json();

    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={toggleCart}>
          <AiOutlineLeft />

          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>
            ( {totalQuantities} {totalQuantities > 1 ? 'Items' : 'Item'} )
          </span>
        </button>

        {cartItems < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={100} color='#aaa' />
            <h3>Cart is empty</h3>

            <Link href='/'>
              <button type='button' onClick={toggleCart} className='btn'>
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <div key={`${index}_${item._id}`} className='product'>
                <img
                  src={urlFor(item?.image[0])}
                  alt={`${item.name} cart product`}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>

                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            toggleCartItemQuantity(item._id, 'dec')
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>{item.quantity}</span>
                        <span
                          className='plus'
                          onClick={() =>
                            toggleCartItemQuantity(item._id, 'inc')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>

                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>

            <div className='btn-container'>
              <button
                type='button'
                className='btn'
                disabled={!cartItems.length > 0}
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
