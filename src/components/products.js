import React, { Component } from 'react';
import formatPrice from "../util";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }

    openDescriptionCard = (product) => {
        this.setState({ product });
    }

    closeDescriptionCard = () => {
        this.setState({ product: null });
    }

    render() {
        const { product } = this.state;
        return (
            <div className="card-container">
                <div className="container"> {/* renders products as cards in the main page */}
                    {this.props.products.map(product => (
                    <div className=" card border" key={product._id}>
                        <img className="card-img-top" src={process.env.PUBLIC_URL + product.image} alt={product.title}></img>
                        <div className="card-body">
                            <a href={"#" + product._id} onClick={()=> this.openDescriptionCard(product)}>
                                <h2 className="card-header">{product.title}</h2>
                            </a>
                            <br />
                            <h4 className="card-title">
                                {formatPrice(product.price)}
                            </h4>
                        
                            <p className="card-text">Dietary Restrictions: {product.Dietary_Restrictions}</p>
                            <p className="card-text">Category: {product.category}</p>
                            <div> {/* add to cart, calls addToCart function in Functions when onClick */}
                                <button onClick={()=> this.props.addToCart(product)} type="button" className="btn success">Add to Cart</button>
                            </div>
                        </div>
                    </div> 
                    ))}
                </div>
                {
                    product && 
                        <Modal isOpen={true} onRequestClose={this.closeDescriptionCard}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeDescriptionCard}>x</button>
                                <div className="product-details">
                                    <img src={process.env.PUBLIC_URL + product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            {<strong>{product.title}</strong>}
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            This item is: {" "}
                                            {product.Dietary_Restrictions.map(x=>(
                                                <span>{" "} <button className="btn success">{x}</button></span>
                                            ))}
                                        </p>
                                        <div className="product-price">
                                            <div>{formatPrice(product.price)}</div>   
                                            <button className="btn success" onClick={(event)=> {
                                                this.props.addToCart(product);
                                                this.closeDescriptionCard();
                                            }}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    
                }
            </div>
        )
    }
}