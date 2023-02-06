import React from 'react';

class CartItem extends React.Component{

    constructor(){
        super();
        this.state={
            price:999,
            title:'Phone',
            qty: 1,
            img: ''
        }
    }

    increaseQuantity = () => {
        // this.state.qty +=1;
        // console.log('this', this.state);

        // setState form 1
        // this.setState({
        //     qty:this.state.qty +1
        // });

        // setState form 2-----------this is for "when we required previous state"
        this.setState((prevState) =>{
            return{
                qty: prevState.qty + 1
            }
        }, () => {
            console.log('this.state', this.state );
        });
    }


    //for decrease quantity
        decreaseQuantity = () =>{
        const { qty } = this.state;
        if(qty === 0){
            return;
        }

            this.setState((prevState) =>{
                return{
                    qty: prevState.qty - 1
                }
            });
        }


        
    render(){
        // object distructuring
        const{price, title, qty} = this.state;

        return(
            <div className="cart-item">
                <div className="left-block">
                <img style={styles.image}/>
                </div>

                <div className="right-block">
                    <div style={{fontSize:40}}>{title}</div>
                    <div>{price}</div>
                    <div>Qty: {qty}</div>
                    <div className="cart-item-actions">
                        {/* Button */}
                        <img alt='increase' className='action-icons' src='https://cdn-icons-png.flaticon.com/512/992/992651.png' onClick={this.increaseQuantity.bind(this)} />

                         <img alt='decrease' className='action-icons' src='https://cdn-icons-png.flaticon.com/512/992/992683.png' onClick={this.decreaseQuantity.bind(this)} />
                        <img alt='delete' className='action-icons' src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png' />
                    </div>

                </div>
            </div>

        );
    }
}

//add css to image
const styles={
    image: {
        height: 110,
        width: 110,
        borderRadius:4,
        backgroundColor:'#ccc'
    }
}

export default CartItem;