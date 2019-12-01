import React from 'react';
import './index.css';

export default class Card extends React.Component {
    constructor(props) {
      super(props);
      this.name = this.props.name;
    }
  
    render() {
        return (
          
          <button className="square" id="cardTitle" >
            {this.props.name}
          </button>
        );
      }
  }