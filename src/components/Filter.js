import React, { Component } from 'react';
export default class Filter extends Component {

    render() {
        return (
                <div className="filter"> 
                    <button className="btn success" onClick={this.props.SetOriginalPage}>Clear Filters</button>
                <div className="filter-outcome">{this.props.count} Products</div> 
                <div className="sort-price"> 
                    Order by Price{" "}
                    <select value={this.props.sort} onChange={this.props.sortOnPrice}>
                        <option>Select</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-diet"> 
                    Dietary Restrictions{" "} 
                    <select value={this.props.Dietary_Restrictions} onChange={this.props.filterByDiet}>
                        <option value="">NONE</option>
                        <option value=" Dairy-free"> Dairy-free</option>
                        <option value=" Nut-free">Nut-free</option>
                        <option value=" Vegan"> Vegan</option>
                
                    </select>
                </div>
                <div className="filter-category"> 
                    Category {" "}
                    <select value={this.props.category} onChange={this.props.filterByCategory}>
                        <option value="">ALL</option>
                        <option value="Coffee">Coffee</option>
                        <option value="Tea">Tea</option>
                        <option value="Alcohol">Alcohol</option>
                        <option value="Pastry">Pastry</option>
                    </select>
                </div>
            </div>
          
            
        )
    }
}