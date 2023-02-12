import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { firestore } from "./firebase";



class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading: true
    }
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }

  //get data from firebase
  componentDidMount() {
    
    //fetching all the products from the cloud firestore
    firestore
    //query for fecthing the product which we want as per our query
    .collection("products") //getting all the products
    // .where('price','>=', 999) // after fetching db we should write query

    .onSnapshot(snapshot => {  //here we use onSnapshot as a listner(when data is change on database then the the data on web page is automatically updated)
      const products = snapshot.docs.map(doc => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
    
      this.setState({
         products: products,
         loading: false 
      });
    
    });
}



  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      products
    })
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;

    this.setState({
      products
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
      products: items
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })

    return cartTotal;
  }
  render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {/* create loading function */}
        {loading && <h1><center>loading products...</center></h1>}

        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
