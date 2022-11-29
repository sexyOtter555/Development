import React, { Component } from 'react'
import formatPrice from '../util';
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            ProceedCheckOut: false
        };
    }

    render() {
        const{cartItems} = this.props;
        return (
            <div>
                <div>
                {cartItems.length === 0? (
                <div className="cart_header">Your Cart is Empty</div>
                ): (
                <div className="cart_header">
                    You have {cartItems.length} item(s) in cart {" "}
                </div>
                )}
                <br />
            </div>
            <div>
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items"> 
                            {cartItems.map(item => (
                                <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        <div className="incrementor"> {/* add/increase/remove on aggregator */}
                                            <button className="btn adjust" onClick={()=>this.props.decrementCount(item)}>-</button>
                                            <h5>{item.count}</h5>
                                            <button className="btn adjust" onClick={()=>this.props.addToCart(item)}>+</button>
                                        </div>
                                        {formatPrice(item.price)} x {item.count}{" "}
                                        <button className="btn remove" onClick={()=>this.props.removeFromCart(item)}>
                                            Remove
                                        </button>
                                    </div>
                                    
                                </div>
                            </li>
                            ))}       
                        </ul>
                    </Fade>
                </div> {/* Calculate total price */}
                {cartItems.length !== 0 && (
                    <div>
                    <div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatPrice(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                        </div>
                        <button onClick={()=>this.setState({ ProceedCheckOut: true })} className="btn success">Proceed</button>
                    </div>
                </div>
                </div>
                )}
            </div>
            </div>
        ) 
    }
}