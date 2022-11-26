import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

import Item from './Item';
import FilterGroup from './FilterGroup';
import SortGroup from './SortGroup';

import {itemInformation, filterGroupInformation} from './data';

// create a render function which returns a React element
class App extends Component {
  constructor() {
    super()
    this.state = {
      itemInformation,
      filterGroupInformation,
      filters: [],
      favorites: []
    }
  }

  favoriteItem = (imgNum) => {
    let favorites = this.state.favorites;
    favorites[imgNum-1] = !favorites[imgNum-1];
    this.setState({favorites, itemInformation: this.keepFavorites(this.state.itemInformation)});

    this.setState({itemInformation: this.getFilteredItems(this.state.filters)});
  }

  filterItems = (name, type) => {

    let totalFilters = [];

    if (this.state.filters.some((f) => f.name == name)) {
      totalFilters = this.state.filters.filter((element) => { return element.name !== name });
    } else {
      totalFilters = [...this.state.filters, {name, type}];
    }

    this.setState({
      filters: totalFilters,
      itemInformation: this.getFilteredItems(totalFilters)
    });

  }

  keepFavorites = (items) => {
    let favoritedItems = [];

    items.forEach(item => {
      if(this.state.favorites[item.imageNum-1]) {
        item.Other = ['Favorites'];
      } else {
        item.Other = [];
      }
      favoritedItems.push(item);
    });

    return favoritedItems;
  }

  getFilteredItems = filters => {

    if(filters.length == 0) {return itemInformation}

   
    let filteredItems = [];

    this.keepFavorites(itemInformation).forEach(item => {
      let containsAll = true;
      filters.forEach(filter => {
        if(!item[filter.type].includes(filter.name)) {containsAll = false;}
      });
      if(containsAll) {
        filteredItems.push(item);
      }
    });

    return filteredItems;
  }

  sortItems = (sortType) => {
    this.setState({itemInformation: this.state.itemInformation.sort((item1, item2) => { return item1[sortType] - item2[sortType] })});
  }

  generateItem = (item) => {
    return <Item {... item} favoriteItem={this.favoriteItem} key={item.imageNum}/>;
  }

  generateFilterGroup = (info) => {
      return (<div><FilterGroup {... info} filterItems={this.filterItems} key={info.title}/> <br/> </div>);
  }


 render() {


  const filterGroups = this.state.filterGroupInformation.map(this.generateFilterGroup);
  const listItems   = this.state.itemInformation.map(this.generateItem);
  const favoritesPrice = this.state.itemInformation.filter(item => item.Other.includes('Favorites')).reduce((acc, item) => acc + item.price, 0);

  return (
    <div>

      <div className="Image-title">
          <img
          src={require('./assets/logo_new.png')}
          width="700" height="290" padding = "100"
          />
        </div>
      
      <div className="Main-grid">



        <div className="Side-bar">


          <SortGroup sortItems={this.sortItems}/>

          <br/>

          {filterGroups}

          <h1 style={{"marginTop": "-1rem",  "marginBottom": "1rem", "color": "grey", "fontSize": ".8rem"}}>Favorites Price: ${favoritesPrice}</h1>



        </div>

        

        <div className="Item-grid">

          {listItems}

        </div>



      </div>

    </div>
  );
 }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

