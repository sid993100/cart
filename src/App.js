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
  // handleIncreaseQuantity = (product) => {
  //   console.log('Heyy please inc the qty of ', product);
  //   const { products } = this.state;
  //   const index = products.indexOf(product);
  //   products[index].qty += 1;
  //   this.setState({
  //     products
  //   })
  // }

  handleIncreaseQuantity = (product) => {
    // console.log("Please inc the qty" , product);
    const {products} = this.state;
    const index = products.indexOf(product);

    //increasing qty in state
    // products[index].qty +=1;


    // this.setState({
    //     // products: products   // shorthand means = products 
    //     products // using shorthand of above stmt
    // })

    //increase qty in firebase cloud directly 
    //using id below we get the ref of that product which we are increasing
    const docRef = firestore.collection('products').doc(products[index].id)

    docRef
    .update({
      qty : products[index].qty +1,
    })
    .then(() => {
      console.log('document updated successfully');
    })
    .catch((error) =>  {
      console.log('error',error);
    })
}

  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty === 0) {
      return;
    }
    // products[index].qty -= 1;
    // this.setState({
    //   products
    // })

    const docRef = firestore.collection('products').doc(products[index].id)

    docRef
    .update({
      qty : products[index].qty -1,
    })
    .then(() => {
      console.log('document updated successfully');
    })
    .catch((error) =>  {
      console.log('error',error);
    })
  }

  handleDeleteProduct = (id) => {
    const {products} = this.state;
    const index = products.indexOf(id);

    // const items = products.filter((item) => item.id !== id); // [{}]
    // this.setState({
    //   products: products
    // })
    const docRef = firestore.collection('products').doc(products[index].id)

    docRef
    .delete()
    .then(() => {
      console.log('deleted successfully');
    })
    .catch((error) =>  {
      console.log('error',error);
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

  //add product -->button function
  // addProduct = () =>{
  //   firestore
  //   .collection('products')
  //   .add({
  //     img:'',
  //     price:900,
  //     qty: 3,
  //     title: 'Washing machine'
  //   })
  //   .then((docRef) => {
  //     console.log('Product has been added', docRef);
  //   })
  //   .catch((error) => {
  //     console.log('Error:', error);
  //   })
  // }

  render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct}>Add Cart Product</button>
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
