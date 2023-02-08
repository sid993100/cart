import React from 'react';
import CartItem from './CartItem';

const Cart = (props) => {
    const { products } = props;
    return (
      <div className="cart">
        {products.map((product) => {
          return (
            // <CartItem
            //   product={product}
            //   key={product.id}
            //   onIncreaseQuantity={this.onIncreaseQuantity}
            //   onDecreaseQuantity={this.onDecreaseQuantity}
            //   onDeleteProduct ={
            //     this.onDeleteProduct
            //   }
            // />

            <CartItem
            products={products}
            onIncreaseQuantity={this.handleIncreaseQuantity}
            onDecreaseQuantity={this.handleDecreaseQuantity}
            onDeleteProduct ={
              this.handleDeleteProduct}
            />
          )
      })}
    </div>
  );
} 

export default Cart;