import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/products';
import library from "./library.json";


// constructor 
class Functions extends React.Component {
  constructor(){
    super();
    this.state = {
      products: library.products,
      Dietary_Restrictions: "",
      category: "",
      sort: "",
      cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    };
  }

                       /***************************** FILTER AND SORT *******************************=*** */
 // sortOnPrice function would be triggered by onChange in Filter */
  sortOnPrice = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice()
      .sort((a,b) =>
        sort === "lowest"
          ? a.price > b.price 
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id > b._id
            ? 1
            : -1
      ),
    }));
  };

  /* filterByDiet function would could be triggered by onChange in Filter when selecting Dietary_Restrictionss*/
  filterByDiet = event => {
    if (event.target.value === "") { 
      if (this.state.category === "") { 
        this.setState({Dietary_Restrictions: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
      })}
      else { /* when user select "None" for restrictions, but category has exiting selection*/
        this.setState({Dietary_Restrictions: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.category === this.state.category
          )
        })
      } 
    }
    else {
      if (this.state.category === "") { /* when user select a Dietary_Restrictions, category set to "All"*/
        this.setState({Dietary_Restrictions: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.Dietary_Restrictions.indexOf(event.target.value) >= 0
          )
      })}
      else { /* when user select a Dietary_Restrictions, and category has exiting selection*/
        this.setState({Dietary_Restrictions: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.category === this.state.category
          )
          .filter(
            (product) => product.Dietary_Restrictions.indexOf(event.target.value) >= 0
          )
        })
      } 
  }}

  filterByCategory = event => {
    if (event.target.value === "") {
      if (this.state.Dietary_Restrictions === "") { /* when diet and category both none */
        this.setState({category: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
      })}
      else { /* when category is "ALL", Dietary_Restrictions has preexisting selection */
        this.setState({category: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.Dietary_Restrictions.indexOf(this.state.Dietary_Restrictions) >= 0
          )
        })
      } 
    }
    else {
      if (this.state.Dietary_Restrictions === "") { /* when Dietary_Restrictions is "All", user selects a category */
        this.setState({category: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.category === event.target.value
          )
      })}
      else { /* when Dietary_Restrictions has pre-existing value, user selects a category */
        this.setState({category: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.Dietary_Restrictions.indexOf(this.state.Dietary_Restrictions) >= 0
          )
          .filter(
            (product) => product.category === event.target.value
          )
        })
      } }
  }

             /***************************** CART *******************************=*** */
  addToCart = (product) => { /* add to cart when called in products and Cart */
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item =>{
    if (item._id === product._id){ 
      item.count += 1;
      alreadyInCart = true;
    }
    });
    if (!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({ 
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem("cartItems", 
    JSON.stringify(cartItems.filter((x) => x._id !== product._id)));
  };


  decrementCount =(product) => {
    const cartItems = this.state.cartItems.slice();
      cartItems.forEach(item =>{
        if ((item._id === product._id) && item.count > 1){
          item.count -= 1;
        }
      });
      this.setState({cartItems});
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
      };

  

  // set to default
  SetOriginalPage = (e) => { 
      this.setState({
          products: library.products,
          sort: "",
          Dietary_Restrictions: "",
          category: "",
      })
  }



  render() {
    return (
      <div className="navbar">
        <header>
          <a href="/">Corgibucks Coffee</a>
		  <img class="header-image" src={process.env.PUBLIC_URL + "/image/logo.png"}/>
        </header>
        <main>
          <div className="content"> {/* main for the display items, sidebar for Cart*/}
            <div className="main">
            {/* filter class */}
              <Filter count={this.state.products.length}
              Dietary_Restrictions={this.state.Dietary_Restrictions}
              sort={this.state.sort}
              category={this.state.category}
              SetOriginalPage={this.SetOriginalPage}
              filterByDiet={this.filterByDiet}
              sortOnPrice={this.sortOnPrice}
              filterByCategory={this.filterByCategory}
              ></Filter>
              <Products products={this.state.products} 
              addToCart={this.addToCart}></Products>
            </div>
            <div className="aggregator">
              <Cart cartItems={this.state.cartItems} 
              removeFromCart={this.removeFromCart}
              decrementCount={this.decrementCount}
              addToCart={this.addToCart}
              />
            </div>
          </div>
        </main>
        <footer>@Corgibucks</footer>
      </div>
    );
  }
}

export default Functions;