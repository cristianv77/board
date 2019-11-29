import React from 'react';
import './index.css';

export default class Card extends React.Component {
    constructor(props) {
      super(props);
      this.editText = this.editText.bind(this);
      this.name = this.props.name;
    }
  
    editText(){
      const newName = prompt('New card text')
      this.name = newName;
    }
  
    render() {
      if (this.props.isVisible){
        return (
          <div>
          <button className="square" id="cardTitle" >
            {this.props.name}
          </button>
          </div>
        );
      }
      return (<div></div>);
    }
  }
