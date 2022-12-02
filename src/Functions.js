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
      ItemsinCart: localStorage.getItem("ItemsinCart")
      ? JSON.parse(localStorage.getItem("ItemsinCart"))
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
      else { 
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
          .filter(
            (product) => product.Dietary_Restrictions.indexOf(event.target.value) >= 0
          )
      })}
      else {
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
      if (this.state.Dietary_Restrictions === "") { 
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
      else {
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
      if (this.state.Dietary_Restrictions === "") { 
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
      else { 
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
  addToCart = (product) => { 
    const ItemsinCart = this.state.ItemsinCart.slice();
    let isInCart = false;
    ItemsinCart.forEach(item =>{
    if (product._id === item._id){ 
      item.count ++;
      isInCart = true;
    }
    });
    if (!isInCart) {
      ItemsinCart.push({...product, count: 1});
    }
    this.setState({ItemsinCart});
    localStorage.setItem("ItemsinCart", JSON.stringify(this.state.ItemsinCart));
  };

  removeFromCart = (product) => {
    const ItemsinCart = this.state.ItemsinCart.slice();
    localStorage.setItem("ItemsinCart", 
    JSON.stringify(ItemsinCart.filter((x) => x._id !== product._id)));

    this.setState({ 
      ItemsinCart: ItemsinCart.filter((x) => x._id !== product._id),
    });
  };


  decrementCount =(product) => {
    const ItemsinCart = this.state.ItemsinCart.slice();
      ItemsinCart.forEach(item =>{
        if (( product._id === item._id) && item.count > 1){
          item.count -- ;
        }
      });
      this.setState({ItemsinCart});
      localStorage.setItem("ItemsinCart", JSON.stringify(this.state.ItemsinCart));
      };

  // set to default
  SetOriginalPage = (p) => { 
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
          <div className="content"> 

            <div className="main">
            {/* filter class */}
              <Filter
              count={this.state.products.length}
              Dietary_Restrictions={this.state.Dietary_Restrictions}
              sort={this.state.sort}
              category={this.state.category}
              SetOriginalPage={this.SetOriginalPage}
              filterByDiet={this.filterByDiet}
              sortOnPrice={this.sortOnPrice}
              filterByCategory={this.filterByCategory}
              ></Filter>

              <Products 
              products={this.state.products} 
              addToCart={this.addToCart}>
              </Products>
            </div>

            <div className="aggregator">
              <Cart 
              ItemsinCart={this.state.ItemsinCart} 
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