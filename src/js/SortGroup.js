import React, {Component} from 'react';

import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';



class SortGroup extends Component {

  constructor() {
    super()

    this.state = {
      value: 'imageNum'
    }
  }

  handleChange = event => {
    this.setState({value: event.target.value});
    this.props.sortItems(event.target.value);
  }

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Sort By</FormLabel>
        <RadioGroup value={this.state.value} onChange={this.handleChange}>
          <FormControlLabel value="imageNum" control={<Radio />} label="Popular" />
          <FormControlLabel value="price" control={<Radio />} label="Price" />
          <FormControlLabel value="calories" control={<Radio />} label="Calories" />

        </RadioGroup>
      </FormControl>
    );
  }
}

export default SortGroup;