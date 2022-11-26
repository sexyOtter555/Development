import React, {Component} from 'react';
import '../css/item.css';

import {Button, Card, CardContent, Typography} from '@material-ui/core';

import {Favorite, FavoriteBorder} from '@material-ui/icons';


const styles = {
  card: {
    display: 'flex',
    backgroundColor: "#f7f3f0"

  },
  cover: {
    width: 500,
    
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}

class Item extends Component {

  constructor() {
    super()
  }

  toggleFavorite = () => {
    this.props.favoriteItem(this.props.imageNum);
  }

  generateDietaryRestrictions = (restriction) => {
    return <span>{restriction} </span>
  }

  render() {

    const restrictionList = this.props.Dietary_Restrictions.map(this.generateDietaryRestrictions);

    return (
      <Card style={styles.card}>
        <div className={styles.details}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.name}
          </Typography>
          <div style={{display:"flex"}}>
          <Typography color="textSecondary" style={{marginRight:10}}>
            ${this.props.price}
          </Typography>
          <Typography color="textSecondary">
            <i>Calories: </i>{this.props.calories}
          </Typography>
          </div>
          <Typography color="textSecondary" >
            <i>Type: </i>{this.props.Types[0]}
          </Typography>
          <Typography color="textSecondary" >
            <i>Dietary Restrictions: </i>{restrictionList}
          </Typography>

          <Typography variant="body2" component="p" >
            {this.props.description}
          </Typography>
          <br/>


          {this.props.Other.length !== 0 ? (
              <Button 
              style={{
                backgroundColor: "#FBC02D",
            }}
                variant="contained" 
                color="secondary" 
                startIcon={<Favorite/>}
                onClick={() => this.toggleFavorite()}>
                Remove from favorites
              </Button>
              ) : (
              <Button
              style={{
                backgroundColor: "#D50000",
            }}
                variant="contained"
                color="primary"
                startIcon={<FavoriteBorder/>}
                onClick={() => this.toggleFavorite()}
                >
                Add to favorites
              </Button>
            )}

          </CardContent>
          </div>
          <img
        
        src={require('../media/' + this.props.imageNum + '.png')}
        className="Img"
        />
        </Card>
    );
  }
}

export default Item;